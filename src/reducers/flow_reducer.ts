import {createAction , createReducer} from '@reduxjs/toolkit';
import Flow from '../util/Flow';

interface FlowsState {
    value : Flow[]
}

const newflow = createAction<Flow>('flow/increment');
const remove = createAction<number>('flow/remove');
const change = createAction<{index:number, flow:Flow}>('flow/edit');


const initialState = {value:[]} as FlowsState;

const FlowsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(newflow, (state,action) => {
            state.value = [...state.value, action.payload]
        })
        .addCase(remove, (state,action)=>{
            state.value = [...state.value.slice(action.payload-1,action.payload), ...state.value.slice(action.payload+1)]
        })
        .addCase(change, (state,action) => {
            state.value = [...state.value.slice(action.payload.index-1,action.payload.index), action.payload.flow, ...state.value.slice(action.payload.index+1)]
        })
})

export default FlowsReducer;