import React from 'react';
import { FC } from 'react';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Flow from '../util/Flow';
import {Dropdown} from 'semantic-ui-react';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

interface EntryProps {
    flow : Flow,
    index : number
}

const PropertyTable:FC<EntryProps> = ({flow, index}) => {
    return (
        <div>
            <table className="ui celled table">
                <tbody>
                    <tr>
                        <td> Mach : {flow.Mach} </td>
                        <td> Pressure_Ratio : {flow.PressureRatio.toFixed(3)} </td>
                        <td> TemperatureRatio : {flow.TemperatureRatio.toFixed(3)} </td>
                    </tr>
                    <tr>
                        <td> Temperature : {flow.Temp.toFixed(3)} K </td>
                        <td> Sound Speed : {flow.SoundSpeed.toFixed(3)} m/s </td>
                        <td> Velocity : {flow.Velocity.toFixed(3)} m/s </td>
                    </tr>
                    <tr>
                        <td> Area Ratio : {flow.AreaRatio2.toFixed(3)}</td>
                        <td> Mach Angle : {flow.MachAngle.toFixed(3)} </td>
                        <td> Temperature : {flow.Temp.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <td> Total Temperature : {flow.TotalTemp}</td>
                        <td> Total Pressure (kPa) : {flow.TotalPressure/1000}</td>
                        <td> Density Ratio : {flow.DensityRatio.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <td> Specific Enthalpy (kJ/kg) : {flow.Enthalpy.toFixed(3)} </td>
                        <td> Static Pressure (kPa) : {flow.Pressure.toFixed(3)}</td>
                        <td> density (kg/m^3): {flow.Density.toFixed(3)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

interface FlowInterface{
    flow : Flow,
    setFlow : Function,
    newFlow : Function,
    index:number,
}

const IsentropicFlow : FC<FlowInterface> = ({flow, setFlow, newFlow, index:number}) => {

    const [mach, setmach] = useState<undefined|number>(0);
    const [pressure, setpressure] = useState<undefined|number>(0);
    const [temperature,settemperature] = useState<undefined|number>(0);
    //const [flow, setFlow] = useState<Flow>(Flow.NewFlow());

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
        },
    ]

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

    const handleMachChange = (event:any, data:any) => {
        setmach(data.value);
    }

    const handlePressureChange = (event:any, data:any) => {
        setpressure(data.value);
    }

    const handleTemperatureChange = (event:any, data:any) => {
        settemperature(data.value);
    }


    const MachChange = (event:any) => {
        //if(event.target.value === undefined || event.target.value === NaN) return;
        if(mach === 0) setFlow(Flow.MachFromMach(flow,event.target.value),0)
        if(mach === 1) setFlow(Flow.MachFromPR(flow,event.target.value))
        if(mach === 2) setFlow(Flow.MachFromTR(flow,event.target.value))
        if(mach === 3) setFlow(Flow.MachFromARSubsonic(flow, event.target.value));
        if(mach === 4) setFlow(Flow.MachFromARSupersonic(flow,event.target.value));
    }

    const PressureChange = (event:any) => {
        if(pressure === 0) setFlow(Flow.TPFromTP(flow,event.target.value*1000),0)
        if(pressure === 1) setFlow(Flow.TPFromPressure(flow,event.target.value*1000));
    }

    const TemperatureChange = (event:any) => {
        if(temperature === 0) setFlow(Flow.TTFromTT(flow,event.target.value),0)
        if(temperature === 1) setFlow(Flow.TTFromTemperature(flow,event.target.value))
        if(temperature === 2) setFlow(Flow.TTFromSoundSpeed(flow,event.target.value));
    }

    return (
        <React.Fragment> 
            <h1> Isentropic Flows : </h1>
            <h4> Select Mach Driver : </h4>
            <Dropdown onChange = {(event,data) => handleMachChange(event,data)}
                placeholder = "Select Mach Driving Input"
                fluid
                selection
                options = {MachOptions}
            />
            <input onChange={MachChange}/>
            <h4> Select Pressure Driver : </h4>
            <Dropdown onChange = {(event,data) => handlePressureChange(event,data)}
                placeholder = "Select Mach Driving Input"
                fluid
                selection
                options = {PressureOptions}
            />
            <input onChange={PressureChange}/>
            <h4> Select Temperature Driver : </h4>
            <Dropdown onChange = {(event,data) => handleTemperatureChange(event,data)}
                placeholder = "Select Mach Driving Input"
                fluid
                selection
                options = {TemperatureOptions}
            />
            <input onChange={TemperatureChange}/>

            <PropertyTable flow={flow} index = {1}></PropertyTable>
            
        </React.Fragment>
    );
}

const IsentropicFlows : FC = () => {
    const [flows, setFlows] = useState<any>([Flow.NewFlow()]);

    const setFlow = (flow : Flow, index:number) => {
        setFlows([...flows.slice(index+1),flow, ...flows.slice(index)])
    }

    const newFlow = () => {
        setFlows([...flows, Flow.NewFlow()]);
    }
    //kind of understand redux now???
    return flows.map((flow : Flow,index:number) => <IsentropicFlow key={index} flow={flow} index={index} setFlow={setFlow} newFlow = {newFlow}/>)
}

export default IsentropicFlows;