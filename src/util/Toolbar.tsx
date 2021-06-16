import React, {useState} from 'react';
import {Toolbar, Menu, makeStyles, AppBar, Button, MenuItem, Typography, IconButton, Badge, Container, Switch} from '@material-ui/core';
import {useHistory, useLocation} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

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

    return(
        <div className={classes.grow}>
            <AppBar className={classes.grow}>
                <Toolbar className={classes.grow}>
                    <Typography className={classes.title}> Welcome to Compressible Flows Calculator By Pranosaurus: </Typography>
                    <Button onClick={(e) => history.push('/quasi2dflow')} color="secondary"> Diffusers and Nozzles : </Button>
                    <Button onClick={(e) => {history.push('/isentropicflow')}} color="secondary"> Isentropic Flow: </Button>
                    <Button onClick={(e)=>history.push('/shockwave')} color="secondary"> Shock Waves : </Button>
                    <Button onClick={(e) => history.push('/system')} color="secondary"> Turbomachinery : </Button> 
                    <IconButton onClick ={(e) => history.push('/')}>
                        <HomeIcon color="secondary"/>
                    </IconButton>                  
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar}></div>
            {children}
        </div>
    );
}

export default Template;