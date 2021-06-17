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
                        <TableCell style={{color:recentlyChanged === 3||recentlyChanged === 1 && currentTemperature !==0?'red':'black'}}> Total Temperature : {flow.TotalTemp}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{color:recentlyChanged === 1?'red':'black'}}> Pressure_Ratio : {flow.PressureRatio.toFixed(3)} </TableCell>
                        <TableCell style={{color:recentlyChanged === 2||recentlyChanged ===1 && currentPressure == 0?'red':'black'}}> Static Pressure (kPa) : {flow.Pressure.toFixed(3)}</TableCell>
                        <TableCell style={{color:recentlyChanged === 2||recentlyChanged === 1 && currentPressure !==0?'red':'black'}}> Total Pressure (kPa) : {flow.TotalPressure/1000}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{color:recentlyChanged === 1?'red':'black'}}> Density Ratio : {flow.DensityRatio.toFixed(3)}</TableCell>
                        <TableCell style={{color:recentlyChanged?'red':'black'}}> density (kg/m^3): {flow.Density.toFixed(3)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{color:recentlyChanged === 1?'red':'black'}}> Area Ratio : {flow.AreaRatio2.toFixed(3)}</TableCell>
                        <TableCell style={{color:recentlyChanged === 1 &&flow.Mach >= 1.00?'red':'black'}}> Mach Angle : {flow.MachAngle.toFixed(3)} </TableCell>
                        <TableCell style={{color:recentlyChanged === 1 &&currentTemperature !== 0 || recentlyChanged === 3?'red':'black'}}> Specific Enthalpy (kJ/kg) : {flow.Enthalpy.toFixed(3)} </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> Heat Capacity Cp (kJ/kg*K) : {flow.Cp.toFixed(3)} </TableCell>
                        <TableCell> Heat Capacity Ratio (Cp/Cv) : {flow.gamma.toFixed(2)} </TableCell>
                        <TableCell> Gas Constant (J/kg*K) : {flow.R.toFixed(3)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default FluidTable;