import React from 'react';
import Flow from './Flow';
import {Compressor, Turbine} from './Turbomachines';
import {Button, ButtonGroup, Grid, Table, TableRow, TableBody, TableHead, TableCell, Typography} from '@material-ui/core';

interface compressorFC {
    flow1: Flow,
    flow2: Flow,
    compressor: Compressor,
}

export const CompressorTable:React.FC<compressorFC> = ({flow1,flow2, compressor}) => {
    //adiabatic effeciency
    //isentropic effeciency
    //enthalpy Consumption
    //pressure ratio

    return(
        <div> 
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> Compression Ratio (P02/P01) </TableCell>
                        <TableCell> Work Done (kJ/kg)</TableCell>
                        <TableCell> Adiabatic Effeciency </TableCell>
                        <TableCell> Polytropic Effeciency </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell> {flow2.TotalPressure/flow1.TotalPressure} </TableCell>
                        <TableCell> {flow2.Enthalpy-flow1.Enthalpy} </TableCell>
                        <TableCell> {compressor.iseneff} </TableCell>
                        <TableCell> {compressor.polyeff} </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <h1> pressure ratio : {flow2.TotalPressure/flow1.TotalPressure}</h1>
            <h1> enthalpy consumption: {flow1.Cp*(flow1.TotalTemp-flow2.TotalTemp)} </h1>

        </div>
    );
}
export {}