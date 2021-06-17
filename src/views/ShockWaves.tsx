import React, {useState, useEffect, Fragment} from 'react';
import {TextField, Grid, Typography, FormControl, FormLabel, FormControlLabel, RadioGroup, Select, MenuItem, Button} from '@material-ui/core';
import Flow from '../util/Flow';
import {Compressor, Turbine} from '../util/Turbomachines';
import FluidTable from '../util/IsentropicFlowTable';
import FlowForm from '../util/FlowForm';
import {NormalShock} from '../util/ShockWaves';
import {useContext} from 'react';
import {FluidSettingsContext} from '../FluidSettings';

const ShockWave:React.FC = () => {
    const {state,dispatch} = useContext(FluidSettingsContext);
    const {R, gamma, defaulted} = state
    const [normal, setNormal] = useState<boolean>(true);
    const [entryFlow, setEntryFlow] = useState<Flow>(new Flow(0,0,0,gamma,R));
    const [exitFlow, setExitFlow] = useState<Flow>(new Flow(0,0,0,gamma,R));
    const [wave, setWave] = useState<boolean>(false);

    const setFlowNormalShock = (flow:Flow) => {
        setEntryFlow(flow);
        setExitFlow(NormalShock(flow));
    }

    const setObliqueShockFlow = (flow:Flow) => {
        setEntryFlow(flow);//what ?? 
    }

    return(
        <Fragment>
            <div style={{padding:'30px'}}> </div>
            <FormControl style={{paddingLeft:'40%'}}>
                <FormLabel> Oblique or Normal Shock : </FormLabel>
                <Select onChange={(e) => setNormal(e.target.value==='normal'?true:false)}>
                    <MenuItem value={'normal'}> Normal </MenuItem>
                    <MenuItem value={'oblique'}> Oblique: </MenuItem> 
                </Select>
                {!normal?
                <div>
                    <FormLabel> Deflection or Wave Angle: </FormLabel>
                    <Select onChange={(e) => setWave(e.target.value ==='wave'?true:false)}>
                        <MenuItem value={'wave'}> Wave </MenuItem>
                        <MenuItem value={'not'}> Deflection : </MenuItem>
                    </Select> 
                    <TextField label="degrees" style={{paddingLeft:'30px'}}/>
                </div> : null}
            </FormControl>
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