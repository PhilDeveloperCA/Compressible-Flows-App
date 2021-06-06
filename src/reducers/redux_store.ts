import {configureStore} from '@reduxjs/toolkit';

import FlowsReducer from './flow_reducer';

const reducer = {
    flows : FlowsReducer,
}

const store = configureStore({
    reducer,
})

export {}