import React, {useState, useReducer, useEffect, useContext, useRef} from 'react';
import {Toolbar, makeStyles, AppBar,  FormLabel, FormControlLabel, DialogTitle, RadioGroup, Radio, Button, MenuItem, Card, Typography, FormControl, Modal,IconButton, TextField, Menu, Select, Badge, Container, Switch, Dialog} from '@material-ui/core';
import {useHistory, useLocation} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import {FluidSettingsReducer,FluidSettingsDefaultValue, FluidSettingsContext} from '../FluidSettings'


interface Modal {
    open:boolean,
    close:Function
}

const FlowModal:React.FC<Modal> = ({open, close}) => {
    const [mode, setMode] = useState<number>(1);
    const {state,dispatch} = useContext(FluidSettingsContext);
    const [defaulted, setDefaulted] = useState<null|string>(null);
    const [defaultedMenu, setDefaultedMenu] = useState<boolean>(false);

    const value1 = useRef<number>(0);
    const value2 = useRef<number>(0);

    const defaultSubmit = (e:any) => {
        if(defaulted === 'air'){
            dispatch({type:'default'});
        }
        if(defaulted === 'watervapor'){
            dispatch({type:'rcp', payload: {r:461.5,Cp:1.996}})
        }
        close();
    }

    const Submit = (e:any) => {
        if(mode === 0){

        }
        if(mode === 3){
            dispatch({type:'gammacp', payload:{gamma:value1.current, Cp:value2.current}})
        }
        if(mode === 2){
            dispatch({type:'rcp', payload:{r:value1.current, Cp:value2.current}})
        }
        if(mode === 1){
            dispatch({type:'rgamma', payload:{r:value1.current, gamma:value2.current}});
        }
        close();
    }

    return(
        <Modal open={open} onClose={(e:any) => close()} style={{justifyContent:'center', alignItems:'center', display:'flex', margin:'auto', marginTop:'auto', color:'white'}}>
            <Dialog open={open} style={{paddingRight:'50px'}} onClose={(e:any) => close()}>
            <DialogTitle style={{paddingTop:'30px'}}>
                <Button onClick={(e) => setDefaultedMenu(true)} disabled={defaultedMenu}> Pick a Default : </Button>
                <Button onClick={(e) => setDefaultedMenu(false)} disabled={!defaultedMenu}> Define Your Own Fluid: </Button>
            </DialogTitle>
            <div style={{justifyContent:'center', alignItems:'center', display:'flex', margin:'auto', marginTop:'auto', color:'black', padding:'50px'}}>
            {!defaultedMenu?
            <FormControl >
                <RadioGroup>
                        <FormControlLabel control={<Radio />} label="R and Gamma" onChange={(e) => setMode(1)} checked={mode===1}/>
                        <FormControlLabel control={<Radio />} label="R and Cp" onChange={(e) => setMode(2)} checked={mode===2}/>
                        <FormControlLabel control={<Radio />} label="Gamma and Cp" onChange={(e) => setMode(3)} checked={mode===3}/>
                </RadioGroup>
                <TextField label={mode===1?'R (J/kg*K)':mode===2?'R (J/kg*K)':'gamma (Cp/Cv)'} onChange={(e) => value1.current = parseFloat(e.target.value)}/>
                <TextField label={mode===1?'gamma (Cp/Cv)':'Cp (kJ/kg*K) '} onChange={(e) => value2.current = parseFloat(e.target.value)}/>
                <Button onClick={Submit} style={{paddingTop:'20px'}}> Submit: </Button>
            </FormControl>
            :
            <FormControl >
                <RadioGroup>
                    <FormControlLabel control={<Radio />} label="air" onChange={(e) => setDefaulted('air')} checked={defaulted==='air'}/>
                    <FormControlLabel control={<Radio />} label="water" onChange={(e) => setDefaulted('water')} checked={defaulted==='water'}/>
                    <FormControlLabel control={<Radio />} label="watervapor" onChange={(e) => setDefaulted('watervapor')} checked={defaulted==='watervapor'}/>
                    <FormControlLabel control={<Radio />} label="methane" onChange={(e) => setDefaulted('methane')} checked={defaulted==='methane'}/>
                </RadioGroup>
                <Button onClick={defaultSubmit} style={{paddingTop:'20px'}}> Submit: </Button>
            </FormControl>
            }   
            </div>
            </Dialog>
        </Modal>
    );
}

export default FlowModal;