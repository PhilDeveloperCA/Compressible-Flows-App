import React, {Fragment, useState} from 'react';
import {Diffuser,Nozzle} from '../util/DiffuserNozzle';
import Flow from '../util/Flow';
import {Button, Typography, FormControl, FormLabel, Select, MenuItem} from '@material-ui/core';

const DiffuserNozzle:React.FC = () => {
    const [flows, setFlows] = useState<Flow[]>([Flow.NewFlow()]);
    const [config, setConfig] = useState<number>(0);

    function setArrangement(e:any){
        setConfig(e.target.value);
    }

    return (
        <Fragment>
            <FormControl>
                <Select onChange={setArrangement}>
                    <MenuItem value={0}> Diffuser: </MenuItem>
                    <MenuItem value={1}> Nozzle: </MenuItem>
                    <MenuItem value={2}> Diffuser and Nozzle: </MenuItem>
                </Select>
            </FormControl>
        </Fragment>
    );
}

export default DiffuserNozzle;