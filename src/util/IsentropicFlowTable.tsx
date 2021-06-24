import React from 'react';
import Flow from './Flow';
import {Button, ButtonGroup, Grid, Table, TableRow, TableBody, TableHead, TableCell, Typography} from '@material-ui/core';
import {useContext} from 'react';
import {FluidSettingsContext} from '../FluidSettings';

interface FluidProps {
    flow :Flow |null,
    title?: string|null,
    recentlyChanged?:number|null,
    currentMach?:number|null,
    currentPressure?:number|null,
    currentTemperature?:number|null,
}


const FluidTable:React.FC<FluidProps> = ({flow, title = null, recentlyChanged=null, currentPressure = null,currentTemperature = null }) => {

    if(flow === null){
        return null;
    }
    return (
        <div style={{padding:'50px', alignItems:'center', alignContent:'center', justifyContent:'center'}}>
            {title?<Typography variant="h6" align='center'> {title} </Typography>:null}
            <Table>
                <TableHead>

                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell style={{color:recentlyChanged === 1?'red':'black'}}> Mach : {flow.Mach} </TableCell>
                        <TableCell style={{color:recentlyChanged === 1&&currentTemperature!==1 || recentlyChanged ===3?'red':'black'}}> Sound Speed : {flow.SoundSpeed.toFixed(3)} m/s </TableCell>
                        <TableCell style={{color:recentlyChanged === 1 || recentlyChanged ===3?'red':'black'}}> Velocity : {flow.Velocity.toFixed(3)} m/s </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{color:recentlyChanged === 1?'red':'black'}}> TemperatureRatio : {flow.TemperatureRatio.toFixed(3)} </TableCell>
                        <TableCell style={{color:recentlyChanged === 1&&currentTemperature!==1 || recentlyChanged ===3?'red':'black'}}> Temperature : {flow.Temp.toFixed(3)} K </TableCell>
                        <TableCell style={{color:recentlyChanged === 3||recentlyChanged === 1 && currentTemperature !==0?'red':'black'}}> Total Temperature : {flow.TotalTemp} K </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{color:recentlyChanged === 1?'red':'black'}}> Pressure_Ratio : {flow.PressureRatio.toFixed(3)} </TableCell>
                        <TableCell style={{color:recentlyChanged === 2||recentlyChanged ===1 && currentPressure == 0?'red':'black'}}> Static Pressure : {flow.Pressure.toFixed(3)} (kPa) </TableCell>
                        <TableCell style={{color:recentlyChanged === 2||recentlyChanged === 1 && currentPressure !==0?'red':'black'}}> Total Pressure : {flow.TotalPressure/1000} (kPa) </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{color:recentlyChanged === 1?'red':'black'}}> Density Ratio : {flow.DensityRatio.toFixed(3)}</TableCell>
                        <TableCell style={{color:recentlyChanged?'red':'black'}}> Density : {flow.Density.toFixed(3)} (kg/m^3): </TableCell>
                        <TableCell> Momentum: {(flow.Density*flow.Velocity).toFixed(3)} (N*m) </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{color:recentlyChanged === 1?'red':'black'}}> Area Ratio : {flow.Mach !== 0?flow.AreaRatio2.toFixed(3):"inf"}</TableCell>
                        <TableCell style={{color:recentlyChanged === 1 &&flow.Mach >= 1.00?'red':'black'}}> Mach Angle : {!isNaN(flow.MachAngle)?`${flow.MachAngle.toFixed(3)} degrees`:""} </TableCell>
                        <TableCell style={{color:recentlyChanged === 1 &&currentTemperature !== 0 || recentlyChanged === 3?'red':'black'}}> Specific Enthalpy : {flow.Enthalpy.toFixed(3)} (kJ/kg)</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> Heat Capacity Cp : {flow.Cp.toFixed(3)} (kJ/kg*K) </TableCell>
                        <TableCell> Heat Capacity Ratio : {flow.gamma.toFixed(2)} (Cp/Cv) </TableCell>
                        <TableCell> Gas Constant : {flow.R.toFixed(3)} (J/kg*K)</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default FluidTable;