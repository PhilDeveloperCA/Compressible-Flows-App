import React, {useState, useRef, useEffect} from 'react';
//import {Table, TableBody, TableHead, TableRow, TableCell} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Flow from '../util/Flow';
import {Dropdown, Table} from 'semantic-ui-react';
import {Button, ButtonGroup, Grid} from '@material-ui/core';
import FlowForm from '../util/FlowForm';
import FluidTable from '../util/IsentropicFlowTable';
import {useContext} from 'react';
import {FluidSettingsContext} from '../FluidSettings';

interface EntryProps {
    flow : Flow,
    index : number
}


const IsentropicFlow:React.FC = () => {
    const {state,dispatch} = useContext(FluidSettingsContext);
    const {R, gamma, defaulted} = state

    const [flows, setFlows] = useState<Flow[]>([new Flow(0,0,0,gamma,R)]);
    const currentFlow = useRef<Flow>(new Flow(0,0,0,gamma,R));

    useEffect(() => {
        setFlows([new Flow(0,0,0,gamma,R)]);
    }, [R,gamma, defaulted])

    const copyConstructor = (flow:Flow) => {
        setFlows([...flows, flow]);
    }

    const deleteConstructor = (index:number) => {
        if(flows.length === 1) return;
        setFlows([...flows.slice(0,index),...flows.slice(index+1)]);
    }
    
    const flowEntries = flows.map((flow,index) => {
        return (
            <FlowForm initialFlow={flow} initialMach={flow.Mach} initialPressure={flow.TotalPressure} initialTemp={flow.TotalTemp} notifyParent={(flow:Flow)=>{currentFlow.current = flow;}}>
                <div style={{alignContent:'center', alignItems:'center', justifyContent:'center', display:'flex'}}>                                      
                    <ButtonGroup style={{alignContent:'center', alignItems:'center', justifyContent:'center', display:'flex'}}>
                        <Button onClick={(e)=>{copyConstructor(currentFlow.current)}}> Copy: </Button>
                        <Button onClick={(e) => {deleteConstructor(index)}}> Delete : </Button>
                    </ButtonGroup>
                </div>
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
