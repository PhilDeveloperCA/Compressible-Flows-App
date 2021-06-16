import { CardActionArea } from '@material-ui/core';
import {createContext, useReducer} from 'react';

interface FluidSettings {
    defaulted:boolean,
    R : number,
    gamma:number,
}

const defaultFluidSettings = {
    defaulted:true,
    R:287,
    gamma:1.4,
}

export const restore = 'restore';
export type restoreAction = {type: typeof restore}
export const defaulting = 'default';
export type defaultAction = {type: typeof defaulting}
export const rAndGamma = 'rgamma';
export type RGammaAction = {type: typeof rAndGamma, payload:{r:number, gamma:number}}
export const rAndCp = 'rcp';
export type RCpAction = {type: typeof rAndCp, payload: {r:number, Cp:number}}
export const gammaAndCp = 'gammacp';
export type GammaCpAction = {type:typeof gammaAndCp, payload: {gamma:number, Cp:number}};

type SettingsActions = restoreAction | defaultAction | RGammaAction | RCpAction|GammaCpAction;


//type SettingsAction = {type:'restore'}|{type:'default'}|{type: 'rgamma', payload: {r:number, gamma:number}} | {type:'rcp', payload: {r:number, Cp:number}} | {type: 'gammacp', payload: {gamma:number, Cp:number}};

export const FluidSettingsReducer = (state:FluidSettings = defaultFluidSettings, action:SettingsActions) : FluidSettings => {
    switch(action.type){
        case restore:
            return {defaulted:true, R:287, gamma:1.4}
        case defaulting:
            return {...state, defaulted:true}
        case rAndGamma:
            return {defaulted:false, R:action.payload.r, gamma:action.payload.gamma}     
        case rAndCp:
            const gamma = (action.payload.Cp*1000/(action.payload.Cp-action.payload.r));
            return {defaulted:false, R:action.payload.r, gamma}  
        case gammaAndCp:
            const R = action.payload.Cp*(action.payload.gamma-1)/action.payload.gamma;
            const store = {defaulted:false, R, gamma:action.payload.gamma}
            return store;
    }
    return state;
}

export const FluidSettingsDefaultValue: FluidSettings = {
    defaulted:true,
    R : 287,
    gamma:1.4,
}

//export const FluidSettingsContext = createContext<FluidSettings>(defaultFluidSettings);
export const FluidSettingsContext = createContext<{state:FluidSettings, dispatch:React.Dispatch<SettingsActions>}>({state:FluidSettingsDefaultValue, dispatch: () => null})

