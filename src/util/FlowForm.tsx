import React, {Fragment, useState, useRef, useEffect} from 'react';
import Flow from './Flow';
import {Grid, Button, FormControl, FormLabel, Select, MenuItem, Typography, TextField} from '@material-ui/core';
import FluidTable from './IsentropicFlowTable';
import {useContext} from 'react';
import {FluidSettingsContext} from '../FluidSettings';

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
    
    const {state,dispatch} = useContext(FluidSettingsContext);
    const {R, gamma, defaulted} = state

    const [mach, setmach] = useState<number>(initialMach||0);
    const [pressure, setpressure] = useState<number>(initialPressure||0);
    const [temperature,settemperature] = useState<number>(initialTemp||0);
    const [flow1, setFlow1] = useState<Flow>(initialFlow||Flow.NewFlow());
    const [flow, setFlow] = useState<Flow>(initialFlow||new Flow(0,0,0,gamma,R));
    const [machError, setMachError] = useState<string|null>(null);

    const [recentlyChanged, setRecentlyChanged] = useState<number|null>(null);

    useEffect(() => {
        flow.R = R;
        flow.gamma = gamma;
        setFlow(flow);
    }, [R,gamma, defaulted])

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

useEffect(() => {
    notifyParent(flow);
}, [flow])

const MachChange = (event:any) => {
    setMachError(null);
    const pressure = flow.Pressure;
    const temperature = flow.Temp;
    const soundSpeed = flow.SoundSpeed;
    var new_flow = Flow.NewFlow();

    if(entryMach.current === 0) {
        new_flow = Flow.MachFromMach(flow,event.target.value*1)
    }
    if(entryMach.current === 1) {
        if(event.target.value*1 > 1){
            return setMachError('A flow can not have a higher static pressure than total pressure')
        }
        new_flow = Flow.MachFromPR(flow,event.target.value*1)
    }
    if(entryMach.current === 2) {
        if(event.target.value*1 > 1){
            return setMachError('A flow can not have a higher static temperature than total temperature');
        }
        new_flow = Flow.MachFromTR(flow,event.target.value*1);
    }
    if((entryMach.current === 4 || entryMach.current === 3) && (event.target.value*1) < 1){
        return setMachError('Area Must Be higher than sonic Throat Area')
    }
    if(entryMach.current === 3) new_flow = Flow.MachFromARSubsonic(flow, event.target.value*1);
    if(entryMach.current === 4) new_flow = Flow.MachFromARSupersonic(flow,event.target.value*1);
    if(entryPressure.current === 1){
        new_flow = Flow.TPFromPressure(new_flow, pressure*1000);
    }
    if(entryTemperature.current ===2){
        new_flow = Flow.TTFromSoundSpeed(new_flow, soundSpeed);
    }
    if(entryTemperature.current === 1){
        new_flow = Flow.TTFromTemperature(new_flow, temperature);
    }

    console.log(new_flow);
    setFlow(new_flow);
    setRecentlyChanged(1);
}

const PressureChange = (event:any) => {
    if(entryPressure.current === 0) setFlow(Flow.TPFromTP(flow,event.target.value*1000))
    if(entryPressure.current === 1) setFlow(Flow.TPFromPressure(flow,event.target.value*1000));
    setRecentlyChanged(2);
}

const TemperatureChange = async (event:any) => {
    if(entryTemperature.current === 0) await setFlow(Flow.TTFromTT(flow,event.target.value*1))
    if(entryTemperature.current === 1) await setFlow(Flow.TTFromTemperature(flow,event.target.value*1))
    if(entryTemperature.current === 2) await setFlow(Flow.TTFromSoundSpeed(flow,event.target.value*1));
    setRecentlyChanged(3);
}

//<h6>{!defaulted?`Worked, R: ${R}, gamma : ${gamma}`:'Didnt Work'}</h6>
    
    return(
        <Grid container style={{alignContent:'center', alignItems:'center', justifyContent:'center', margin:'20px', paddingRight:'10%', paddingLeft:'10%'}}>
            <Grid container item xs={12} xl={12} style={{alignContent:'center', alignItems:'center', justifyContent:'center'}} >
                <Grid item xs={4} lg={4}>
                    <div style={{margin:'10px'}}>
                        <Typography variant="h5" style={{alignContent:'center', textAlign:'center', display:'flex', flexGrow:1}}> Mach Constraint </Typography>
                        <FormControl>
                            <Select onChange={handleMachChange}>
                                {MachOptions.map((property) => {
                                    return <MenuItem value={property.value}> {property.text} </MenuItem>
                                })}
                            </Select>
                                <TextField helperText={machError?machError:''} error={machError?true:false} onBlur={MachChange} label={false?MachOptions[entryMach.current].key:''}/>
                            </FormControl>
                    </div>
                </Grid>
                <Grid item xs={4} lg={4}>
                    <div>
                    <Typography variant="h5"> Pressure Constraint: </Typography>
                    <FormControl>
                        <Select onChange={handlePressureChange} >
                            {PressureOptions.map((property) => {
                                return <MenuItem value={property.value}> {property.text}</MenuItem>
                            })}
                        </Select>
                        <TextField onBlur={PressureChange} label=""/>
                    </FormControl>  
                    </div>
                </Grid>
                <Grid item xs={4} lg={4}>
                    <div>
                        <Typography variant="h5"> Temperature Constraint: </Typography>
                        <FormControl>
                            <Select onChange={handleTemperatureChange}>
                                {TemperatureOptions.map((property) => {
                                    return <MenuItem value={property.value}> {property.text}</MenuItem>
                                })}
                            </Select>
                            <TextField onBlur={TemperatureChange} label=""/>
                        </FormControl>
                    </div>
                </Grid>
            </Grid>
            {show?<FluidTable flow={flow} recentlyChanged={recentlyChanged} currentPressure={entryPressure.current} currentTemperature={entryTemperature.current} />:null}
            <Grid item container xs={12} xl={12} style={{alignItems:'center', alignContent:'center'}}>
                {children}
            </Grid>
        </Grid>
    );
}
export default FlowForm;