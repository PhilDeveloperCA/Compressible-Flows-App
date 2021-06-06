import React from 'react';
import {useState, useRef} from 'react';
import {FC} from 'react';
import {Radio, Form, } from 'semantic-ui-react';
import {TextField, Grid, Typography, FormControl, FormLabel, FormControlLabel, RadioGroup, Select, MenuItem, Button} from '@material-ui/core';
import Flow from '../util/Flow';
import {Compressor, Turbine} from '../util/Turbomachines';
import FluidTable from '../util/IsentropicFlowTable';
import FlowForm from '../util/FlowForm';

const Turbomachinery : FC = () => {
    const [machine, setMachine] = useState<number>(0);
    const [eMode, setEMode] = useState<number>(0);
    const [efficiency, setEfficiency] = useState<number|null>(100);
    const [drivingMode, setDrivingMode] = useState<number>(0);
    const [load, setLoad] = useState<number|null>(0);

    const [flow, setFlow] = useState<Flow>(Flow.NewFlow());
    const [outFlow, setOutFlow] = useState<Flow|null>(null);

    const inputFlow = useRef<Flow>(Flow.NewFlow());

 
const Calculate = (event:any) => {
    event.preventDefault();
    setFlow(inputFlow.current);
    if(machine === 0){
        var currentCompressor; 
        if(eMode === 0){
            if(drivingMode===0){
                currentCompressor = new Compressor(efficiency,null, load, null);
            }
            else{
                currentCompressor = new Compressor(efficiency, null, null, load);
            }
        }
        else{   
            if(drivingMode ===0 ){
                currentCompressor = new Compressor(null,efficiency,load, null);
            }
            else{
                currentCompressor = new Compressor(null,efficiency,null,load);
            }
        } 
        console.log(currentCompressor);
        setOutFlow(currentCompressor.compressFlow(flow));  
        return console.log(outFlow);
    }
    else{
        var currentTurbine;
        if(eMode === 0){
            if(drivingMode ===0){

            }
            else{

            }
        }
        else{
            if(drivingMode === 0){

            }
            else{

            }
        }
    }
}
    if(true){
        return(
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12} xl={12} >
                    <Typography variant="h3"> Turbomachinery (Subsonic Only) </Typography>
                    </Grid>
                    <Grid item xs={12} xl={12}>
                        <FlowForm notifyParent ={(flow:Flow) => inputFlow.current = flow} show={false}> {null} </FlowForm>
                    </Grid>
                    <Grid item xs={12} xl={12} style={{alignContent:'center', alignItems:'center', padding:100}}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend"> Adiabatic or Polytropic Efficiency : </FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={<Radio />} label="Adiabatic" onChange={(e) => setEMode(0)} checked={eMode===0}/>
                            <FormControlLabel control={<Radio />} label="Polytropic" onChange={(e) => setEMode(1)} checked={eMode===1}/>
                        </RadioGroup>
                        <TextField onChange={(e) => setEfficiency(parseInt(e.target.value))}/>
                    </FormControl>
                    <Grid item  xs={12} xl={12} style={{alignContent:'center', alignItems:'center', padding:100}}>
                     <FormControl component="fieldset">
                    <FormLabel component="legend"> Compressor Or Turbine: </FormLabel>
                    <RadioGroup>
                        <FormControlLabel control={<Radio />} label="Compressor" onChange={(e) => {setMachine(0)}} checked={machine===0}/>
                        <FormControlLabel control={<Radio />} label="Turbine" onChange={(e) => {setMachine(1)}} checked={machine===1}/>
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Compression/Expansion Ratio or Enthalpy Change :</FormLabel>
                    <RadioGroup>
                        <FormControlLabel control={<Radio />} label="Compressor Ratio" onChange={(e) => {setDrivingMode(0)}} checked={drivingMode === 0} />
                        <FormControlLabel control={<Radio />} label="Enthalpy Change" onChange={(e) => {setDrivingMode(1)}} checked={drivingMode === 1}/>
                    </RadioGroup>
                    {<TextField onChange={(e) => setLoad(parseInt(e.target.value))} label={drivingMode===0?'P02/P01':'kJ'}/>}
                </FormControl>
            </Grid>
                </Grid>
                <Grid item>
                    <Button onClick={Calculate}> Calculate: </Button>
                </Grid>
                <Grid item>
                    <Typography> Incoming Fluid : </Typography>
                    <FluidTable flow={flow}/>
                </Grid>
                <Grid item>
                    <Typography> Outward Fluid: </Typography>
                    <FluidTable flow={outFlow} />
                </Grid>
                </Grid>
            </React.Fragment>
        );
    }

}

export default Turbomachinery;
