import React from 'react';
import Flow from './Flow';
import {Button, ButtonGroup, Grid, Table, TableRow, TableBody, TableHead, TableCell, Typography} from '@material-ui/core';

interface FluidProps {
    flow :Flow |null,
    title?: string|null
}


const FluidTable:React.FC<FluidProps> = ({flow, title = null}) => {
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
                        <TableCell> Mach : {flow.Mach} </TableCell>
                        <TableCell> Pressure_Ratio : {flow.PressureRatio.toFixed(3)} </TableCell>
                        <TableCell> TemperatureRatio : {flow.TemperatureRatio.toFixed(3)} </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> Temperature : {flow.Temp.toFixed(3)} K </TableCell>
                        <TableCell> Sound Speed : {flow.SoundSpeed.toFixed(3)} m/s </TableCell>
                        <TableCell> Velocity : {flow.Velocity.toFixed(3)} m/s </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> Area Ratio : {flow.AreaRatio2.toFixed(3)}</TableCell>
                        <TableCell> Mach Angle : {flow.MachAngle.toFixed(3)} </TableCell>
                        <TableCell> Temperature : {flow.Temp.toFixed(3)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> Total Temperature : {flow.TotalTemp}</TableCell>
                        <TableCell> Total Pressure (kPa) : {flow.TotalPressure/1000}</TableCell>
                        <TableCell> Density Ratio : {flow.DensityRatio.toFixed(3)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> Specific Enthalpy (kJ/kg) : {flow.Enthalpy.toFixed(3)} </TableCell>
                        <TableCell> Static Pressure (kPa) : {flow.Pressure.toFixed(3)}</TableCell>
                        <TableCell> density (kg/m^3): {flow.Density.toFixed(3)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default FluidTable;