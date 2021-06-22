import React, {useState, useEffect, Fragment, useRef} from 'react';
import {TextField, Grid, Typography, FormControl, FormLabel, FormControlLabel, RadioGroup, Select, MenuItem, Button} from '@material-ui/core';
import Flow from '../util/Flow';
import {Compressor, Turbine} from '../util/Turbomachines';
import FluidTable from '../util/IsentropicFlowTable';
import FlowForm from '../util/FlowForm';
import {NormalShock, ObliqueShockFromDeflection, ObliqueShockFromWave} from '../util/ShockWaves';
import {useContext} from 'react';
import {FluidSettingsContext} from '../FluidSettings';

const ShockWave:React.FC = () => {
    const {state,dispatch} = useContext(FluidSettingsContext);
    const {R, gamma, defaulted} = state
    const [normal, setNormal] = useState<boolean>(true);
    const [entryFlow, setEntryFlow] = useState<Flow>(new Flow(0,0,0,gamma,R));
    const [exitFlow, setExitFlow] = useState<Flow>(new Flow(0,0,0,gamma,R));
    const [wave, setWave] = useState<boolean>(false);
    const [degrees, setDegrees] = useState<number>(0);

    const setFlowNormalShock = (flow:Flow) => {
        setEntryFlow(flow);
        if(normal){
            return setExitFlow(NormalShock(flow));
        }
        if(wave){
            return setExitFlow(ObliqueShockFromWave(flow,degrees).flow);
        }
        setExitFlow(ObliqueShockFromDeflection(flow,degrees).flow);
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
                    <TextField label="degrees" onChange={(e)=>setDegrees(parseInt(e.target.value))} />
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