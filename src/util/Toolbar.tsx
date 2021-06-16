import React, {useState, useReducer, useEffect, useContext} from 'react';
import {Toolbar, makeStyles, AppBar, Button, MenuItem, Typography, FormControl, Modal,IconButton, TextField, Menu, Select, Badge, Container, Switch, Dialog} from '@material-ui/core';
import {useHistory, useLocation} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import {FluidSettingsReducer,FluidSettingsDefaultValue, FluidSettingsContext} from '../FluidSettings'
import FlowModal from './FlowSettings';


interface Template {
    children: JSX.Element
}

// @ts-ignore
const useStyles = makeStyles(theme => ({
    appBar: {},
    grow: {
        flexGrow:1,
    },
    toolbar : theme.mixins.toolbar,
    title : {
        flexGrow:1,
    }
}))

const Template:React.FC<Template> = ({children}) => {
    const history = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<HTMLElement|null>(null);
    const [editFlow, setEdit] = useState<boolean>(false);

    //const [state,dispatch] = useReducer(FluidSettingsReducer, FluidSettingsDefaultValue);
    const {state,dispatch} = useContext(FluidSettingsContext);

    useEffect(() => {
    },[])

    return(
        <div className={classes.grow}>
            <AppBar className={classes.grow}>
                <Toolbar className={classes.grow}>
                    <Typography className={classes.title} variant="h5"> Welcome to Compressible Flows Calculator By Pranosaurus </Typography>
                    <Button size="large" onClick={(e) => history.push('/quasi2dflow')} color="secondary"> Diffusers and Nozzles </Button>
                    <Button size="large" onClick={(e) => {history.push('/isentropicflow')}} color="secondary"> Isentropic Flow </Button>
                    <Button size="large" onClick={(e)=>history.push('/shockwave')} color="secondary"> Shock Waves </Button>
                    <Button size="large" onClick={(e) => history.push('/turbomachinery')} color="secondary"> Turbomachinery </Button> 
                    <Button size="large" onClick={(e) => history.push('/system')} color="secondary"> System </Button>
                    <IconButton onClick ={(e) => history.push('/')}>
                        <HomeIcon color="secondary"/>
                    </IconButton>
                    <Button size="small" onClick={(e) => setEdit(!editFlow)} style={{color:'pink'}}> Edit Flow</Button>                  
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar}></div>
            <Button onClick={(e) => dispatch({type:'gammacp', payload: {gamma:1.2, Cp:900}})}> Click Me: </Button>
            <div>
            {<FlowModal open={editFlow} close={() => setEdit(false)} />}
            </div>
            {children}
        </div>
    );
}

export default Template;