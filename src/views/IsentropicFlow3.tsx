import React, {useState, useRef} from 'react';
//import {Table, TableBody, TableHead, TableRow, TableCell} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Flow from '../util/Flow';
import {Dropdown, Table} from 'semantic-ui-react';
import {Button, ButtonGroup, Grid} from '@material-ui/core';
import FlowForm from '../util/FlowForm';
import FluidTable from '../util/IsentropicFlowTable';

interface EntryProps {
    flow : Flow,
    index : number
}


const IsentropicFlow:React.FC = () => {
    const [flows, setFlows] = useState<Flow[]>([Flow.NewFlow()]);
    const currentFlow = useRef<Flow>(Flow.NewFlow());

    const copyConstructor = (flow:Flow) => {
        setFlows([...flows, flow]);
    }

    const deleteConstructor = (index:number) => {
        if(flows.length === 0) return;
        setFlows([...flows.slice(0,index),...flows.slice(index+1)]);
    }
    
    const flowEntries = flows.map((flow,index) => {
        return (
            <FlowForm initialFlow={flow} initialMach={flow.Mach} initialPressure={flow.TotalPressure} initialTemp={flow.TotalTemp} notifyParent={(flow:Flow)=>{currentFlow.current = flow;}}>
                <ButtonGroup>
                    <Button onClick={(e)=>{copyConstructor(currentFlow.current)}}> Copy: </Button>
                    <Button onClick={(e) => {deleteConstructor(index)}}> Delete : </Button>
                </ButtonGroup>
            </FlowForm>
        );
    })

    return(
        <React.Fragment>
            {flowEntries}
        </React.Fragment>
    );
}

export default IsentropicFlow;
