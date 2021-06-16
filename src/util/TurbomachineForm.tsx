import React, {useState, useRef} from 'react';
import {TextField, Grid, Typography, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Select, MenuItem, Button} from '@material-ui/core';
import Flow from './Flow';
import {Turbine, Compressor} from './Turbomachines';
import FlowForm from './FlowForm';
import FluidTable from './IsentropicFlowTable';

interface TurbomachineForm {
    entranceFlow:Flow,
    notifyParent?:Function,
}

const TurbomachineForm:React.FC<TurbomachineForm> = ({entranceFlow, notifyParent =() => {}}) => {
    const [flowCharts, showFlowCharts] = useState<boolean>(false);

    return(
        <div>

        </div>
    );
}

export default TurbomachineForm;