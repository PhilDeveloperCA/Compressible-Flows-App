import React, {useState, useEffect, Fragment, useRef} from 'react';
import {TextField, Grid, Typography, FormControl, FormLabel, FormControlLabel, RadioGroup, Select, MenuItem, Button} from '@material-ui/core';
import Flow from '../util/Flow';
import {Compressor, Turbine} from '../util/Turbomachines';
import FluidTable from '../util/IsentropicFlowTable';
import FlowForm from '../util/FlowForm';
import {NormalShock, ObliqueShockFromDeflection, ObliqueShockFromWave, getMaxDeflection} from '../util/ShockWaves';
import {useContext} from 'react';
import {FluidSettingsContext} from '../FluidSettings';

const ShockWave:React.FC = () => {
    const {state,dispatch} = useContext(FluidSettingsContext);
    const {R, gamma, defaulted} = state
    const [normal, setNormal] = useState<boolean>(true);
    const [entryFlow, setEntryFlow] = useState<Flow>(new Flow(0,0,0,gamma,R));
    const [exitFlow, setExitFlow] = useState<Flow>(new Flow(0,0,0,gamma,R));
    const [wave, setWave] = useState<boolean>(true);
    const [degrees, setDegrees] = useState<number>(0);
    const [angleError, setAngleError] = useState<string|null>(null);
    //const currentFlow = useRef<Flow|null>(null);

    useEffect(() => {
        setFlowNormalShock(entryFlow);
    },[degrees, wave, normal])

    const setFlowNormalShock = (flow:Flow) => {
        setAngleError(null);
        setEntryFlow(flow);
        if(normal){
            return setExitFlow(NormalShock(flow));
        }
        if(wave){
            const {flow: new_flow, shock} = ObliqueShockFromWave(flow,degrees);
            if(degrees<flow.MachAngle){
                return setAngleError(`wave angle must be greater than ${flow.MachAngle.toFixed(3)}`);
            }
            setAngleError(null);
            return setExitFlow(new_flow);
        }
        const {flow:new_flow, shock} = ObliqueShockFromDeflection(flow,degrees);
        if(degrees < 0){
            return setAngleError(`deflection angle must be greater than 0`);
        }
        /*if(degrees > 4/(3*Math.sqrt(3)*(flow.gamma+1))*Math.pow(flow.Mach*flow.Mach-1,3)/Math.pow(flow.Mach*(flow.Mach*flow.Mach-1),2)*180/Math.PI){
            return setAngleError(`deflection angle must be less than ${(180/Math.PI*4/3/Math.sqrt(3)/(flow.gamma+1)*Math.pow(flow.Mach*flow.Mach-1,1.5)/Math.pow(flow.Mach,2)).toFixed(3)}`)
        } */
        const max_deflection:number =  getMaxDeflection(flow);
        console.log(max_deflection);
        //if(shock.wave_angle>90){
        if(max_deflection<degrees){
            return setAngleError(`Detached Wave - deflection angle must be less than ${max_deflection}`)
        }
        //console.log(getMaxDeflection(flow));
        setAngleError(null);
        setExitFlow(new_flow);
    }

    return(
        <Fragment>
            <div style={{padding:'30px'}}> </div>
            <div>
            <Grid item xs={12} xl={12}>
                <FormControl style={{paddingLeft:'40%'}}>
                    <FormLabel> Oblique or Normal Shock : </FormLabel>
                    <Select defaultValue={"0"} onChange={(e) => setNormal(e.target.value==='0'?true:false)}>
                        <MenuItem value={'0'}> Normal </MenuItem>
                        <MenuItem value={'1'}> Oblique: </MenuItem> 
                    </Select>
                </FormControl>
            </Grid>
            {!normal?
            <div>
            <Grid item xs={12} xl={12} container style={{ padding:'30px', justifyContent:'center',  alignItems:'end'}}>
                <FormControl>
                <FormLabel> Deflection or Wave Angle: </FormLabel>
                <Select defaultValue={"0"} onChange={(e) => setWave(e.target.value ==='0'?true:false)}>
                    <MenuItem value={'0'}> Wave </MenuItem>
                    <MenuItem value={'1'}> Deflection : </MenuItem>
                </Select> 
                </FormControl>
                <div style={{paddingLeft:'30px'}}>
                    <TextField label="degrees" FormHelperTextProps={{style:{justifyContent:'end', alignItems:'end'}}} error={!(!angleError)} helperText={angleError !== null?angleError:""} onBlur={(e)=>setDegrees(parseFloat(e.target.value))} />
                </div>
            </Grid>
            </div> : null}
            </div>
            <FlowForm notifyParent={(flow:Flow)=> setFlowNormalShock(flow)} show={false}>
            </FlowForm>        
            <Grid container> 
                <Grid item xs={6} xl={6}>
                    <FluidTable flow={entryFlow} title={"Before Normal Shock"}/>
                </Grid>
                <Grid item xs={6} xl={6}>
                    <FluidTable flow={exitFlow} title={"After Normal Shock"}/>
                </Grid>
            </Grid>
           </Fragment>
    );
}

export default ShockWave;