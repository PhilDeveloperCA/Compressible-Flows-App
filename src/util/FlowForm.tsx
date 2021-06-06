import React, {Fragment, useState, useRef} from 'react';
import Flow from './Flow';
import {Grid, Button, FormControl, FormLabel, Select, MenuItem, Typography, TextField} from '@material-ui/core';
import FluidTable from './IsentropicFlowTable';

interface FlowInterface{
    initialFlow? : Flow,
    initialMach? : number,
    initialTemp? :number,
    initialPressure?:number,
    //copy: Function,
    //deleteEntry: Function,
    //index:number,
    children:any,
    show?:boolean,
    notifyParent?:Function,
}

const FlowForm:React.FC<FlowInterface> = ({initialFlow, initialMach, initialPressure, initialTemp, children, show=true, notifyParent = (flow:Flow) => {}}) => {
    const [mach, setmach] = useState<number>(initialMach||0);
    const [pressure, setpressure] = useState<number>(initialPressure||0);
    const [temperature,settemperature] = useState<number>(initialTemp||0);
    const [flow, setFlow] = useState<Flow>(initialFlow||Flow.NewFlow());

    const entryMach = useRef<number>(0);
    const entryPressure = useRef<number>(0);
    const entryTemperature = useRef<number>(0);

    const MachOptions = [{
        key : 'Mach Number',
        text : 'Mach_Number',
        value : 0,
    },
    {
        key : 'Pressure Ratio',
        text : 'Pressure Ratio (static pressure / total pressure)',
        value : 1,
    },
    {
        key : 'Temperature Ratio',
        text : 'Temperature Ratio (static temperature/ total temperature)',
        value : 2,
    },
    {
        key : 'Subsonic Area Ratio',
        text : 'Subsonic Area Ratio (current area / sonic area)',
        value : 3
    },
    {
        key: 'Supseronic Area Ratio',
        text : 'Supersonic Area Ratio (current area / sonic area)',
        value : 4
    },]

const PressureOptions = [{
        key : 'Total Pressure',
        text: 'Total Pressure (KiloPascal KPa)',
        value : 0
    },
    {
        key : 'Static Pressure',
        text : 'Static Pressure (KiloPascals KPa)',
        value : 1
    },
    ]

const TemperatureOptions = [{
        key: 'Total Temperature',
        text: 'Total Temperature (Kelvin)',
        value : 0
    },
    {
        key : 'Static Temperature',
        text : 'Static Temperature (Kelvin) ',
        value : 1
    },
    {
        key : 'Sound Speed',
        text : 'Sound Speed (m/s)',
        value: 2
    }
    ]


const handleMachChange = (event:any) => {
    entryMach.current = event.target.value;
}

const handlePressureChange = (event:any) => {
    entryPressure.current = event.target.value;
}

const handleTemperatureChange = (event:any) => {
    entryTemperature.current = event.target.value;
}


const MachChange = (event:any) => {
    //if(event.target.value === undefined || event.target.value === NaN) return;
    if(entryMach.current === 0) setFlow(Flow.MachFromMach(flow,event.target.value*1))
    if(entryMach.current === 1) setFlow(Flow.MachFromPR(flow,event.target.value*1))
    if(entryMach.current === 2) setFlow(Flow.MachFromTR(flow,event.target.value*1))
    if(entryMach.current === 3) setFlow(Flow.MachFromARSubsonic(flow, event.target.value*1));
    if(entryMach.current === 4) setFlow(Flow.MachFromARSupersonic(flow,event.target.value*1));
    notifyParent(flow);
}

const PressureChange = (event:any) => {
    if(entryPressure.current === 0) setFlow(Flow.TPFromTP(flow,event.target.value*1000))
    if(entryPressure.current === 1) setFlow(Flow.TPFromPressure(flow,event.target.value*1000));
    notifyParent(flow);
}

const TemperatureChange = (event:any) => {
    if(entryTemperature.current === 0) setFlow(Flow.TTFromTT(flow,event.target.value*1))
    if(entryTemperature.current === 1) setFlow(Flow.TTFromTemperature(flow,event.target.value*1))
    if(entryTemperature.current === 2) setFlow(Flow.TTFromSoundSpeed(flow,event.target.value*1));
    console.log(flow);
    notifyParent(flow);
}
    
    return(
        <Fragment>
            <Grid item xs={12} xl={12}>
                <Typography variant="h5"> Mach Driver: </Typography>
                <FormControl>
                    <Select onChange={handleMachChange}>
                        {MachOptions.map((property) => {
                            return <MenuItem value={property.value}> {property.text} </MenuItem>
                        })}
                    </Select>
                    <TextField onBlur={MachChange} label=""/>
                </FormControl>
                <Typography variant="h5"> Pressure Driver: </Typography>
                <FormControl>
                    <Select onChange={handlePressureChange} >
                        {PressureOptions.map((property) => {
                            return <MenuItem value={property.value}> {property.text}</MenuItem>
                        })}
                    </Select>
                    <TextField onBlur={PressureChange} label=""/>
                </FormControl>
                <Typography variant="h5"> Temperature Driver: </Typography>
                <FormControl>
                    <Select onChange={handleTemperatureChange}>
                        {TemperatureOptions.map((property) => {
                            return <MenuItem value={property.value}> {property.text}</MenuItem>
                        })}
                    </Select>
                    <TextField onBlur={TemperatureChange} label=""/>
                </FormControl>
            </Grid>
            {children}
            {show?<FluidTable flow={flow}/>:null}
        </Fragment>
    );
}
export default FlowForm;