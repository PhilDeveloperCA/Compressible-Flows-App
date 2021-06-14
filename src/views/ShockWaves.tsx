import React, {useState, useEffect, Fragment} from 'react';
import {TextField, Grid, Typography, FormControl, FormLabel, FormControlLabel, RadioGroup, Select, MenuItem, Button} from '@material-ui/core';
import Flow from '../util/Flow';
import {Compressor, Turbine} from '../util/Turbomachines';
import FluidTable from '../util/IsentropicFlowTable';
import FlowForm from '../util/FlowForm';
import {NormalShock} from '../util/ShockWaves';

const ShockWave:React.FC = () => {
    const [entryFlow, setEntryFlow] = useState<Flow>(Flow.NewFlow());
    const [exitFlow, setExitFlow] = useState<Flow>(Flow.NewFlow());

    const setFlowNormalShock = (flow:Flow) => {
        setEntryFlow(flow);
        setExitFlow(NormalShock(flow));
    }

    return(
        <Fragment>
            <FlowForm notifyParent={(flow:Flow)=> setFlowNormalShock(flow)}>
            </FlowForm>        
            <Typography> After Normal Shock : </Typography>
            <FluidTable flow={exitFlow}/>
        </Fragment>
    );
}

export default ShockWave;