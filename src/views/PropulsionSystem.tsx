import React, {useState, useEffect, Fragment} from 'react';
import {TextField, Grid, Typography, FormControl, FormLabel, FormControlLabel, RadioGroup, Select, MenuItem, Button} from '@material-ui/core';
import Flow from '../util/Flow';
import {Compressor, Turbine} from '../util/Turbomachines';
import FluidTable from '../util/IsentropicFlowTable';
import FlowForm from '../util/FlowForm';

//Inlet (Diffuser) -> intake
//Compressor (pre-defined Turbomachine Form )
//Combustion Chamber 
//Turbine (pre-defined Turbomachine Form)
//Nozzle
//Outlet (Nozzle)
//Inlet + Fan+Diffuser

//Glue Together 
// -> Bypass Ratio + Work Connection Between Turbine and Compressor Constraint + T04 || Energy Per Unit 
type inletFlow = {
    flow:Flow,
    flowRate : number,
}

const PropulsionSystem:React.FC = () => {
    const [inletFlow, setInletFlow] = useState<inletFlow>({flow:Flow.NewFlow(), flowRate:0});
    const [combustorConstraint, setCombustorConstraint] = useState<boolean>(true);
    const [intakeConstraint, setIntakeConstraint] = useState<boolean>(true);

    return (
        <Fragment>
            <Typography> Enter Entrance Flow Conditions : </Typography>
            <FlowForm notifyParent ={(flow:Flow) => setInletFlow({...inletFlow, flow:flow})} show={false}> {null} </FlowForm>
            <Typography> Enter Flow Rate Into System (kg/s): </Typography>
            <TextField onBlur = {(e) => {setInletFlow({...inletFlow, flowRate:parseInt(e.target.value)})}}/>
            <Typography> Define Bypass Ratio : </Typography>
            <Typography> Define Combustor : </Typography>
            <Typography> Define Turbine : </Typography>
        </Fragment>
    );
}


export default PropulsionSystem;