import React from 'react';
import { FC, Fragment, useRef, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles, Accordion, AccordionDetails, Typography, AccordionSummary, Button} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const Options = [
    {
        title : "Isentropic Flow Properties",
        description2 : "Calculate and Compare properties of varying flows across different Mach, Total Temperature, and Total Pressure",
        description: "Calculate Properties of Flow Regimes by constraining Mach Number, Total Pressure, and Total Pressure to define a flow",
        path : 'isentropicflow'
    },
    {
        title : "Shock Waves",
        description : "Examine Flow Changes Accross a Normal or flow changes across a Oblique Shock Wave by defining either a wave or deflection angle by specifying a flow field",
        path : 'shockwave'
    },
    {
        title : "Quasi-2-Dimension Flow",
        description : "Expand or Compress a Flow Across a Diffuser or a Nozzle to See how Its flow properties change",
        path : "quasi2dflow"
    },
    {
        title : "Turbomachinery",
        description : "Use a Compressor to perform work on a flow or a Turbine to draw Work from a flow and examine the thrust and property changes of the flow",
        path : "turbomachinery",
    },
    {
        title : "Build a Custom System",
        description : "Build a Custom Turbojet or Turbofan System ",
        path : 'system'
    }
];

interface Option{
    title: string,
    description : string,
    path : string,
}

interface OptionProps {
    option : Option,
    onClick : Function,
    onClickRoute : Function,
    active : string,
    index : number, 
}

const DropDownOption: FC<OptionProps> = ({option, onClick, onClickRoute, active, index}) => {
    const DropdownString = `content ${active}`;
    return (
        <React.Fragment>
            <div className = "title" onClick = {() => {onClick(index)}}>
                <i className = "dropdown icon">
                    {option.title}
                </i>
            </div>
            <div className = {DropdownString} >
                <p className = "transition visible">
                    {option.description},
                </p>
                <button onClick = {() => onClickRoute(index)}> Play !  </button>
                    <br></br><br></br>
            </div>
        </React.Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width : '100%',
        margin: '5px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading : {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    description: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    titleSpacing : {
        height: '40px',
    }
}))

/*const DropDownOptions: FC<OptionProps> = ({option, onClick, onClickRoute, active, index}) => {
    return(
        <Fragment>
            <
        </Fragment>
    );
}*/

const Home: FC = () => {
    const [ActiveIndex, setActiveIndex] = useState<null|number>(null);
    const history = useHistory();
    const classes = useStyles();
    const accordionRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event:any) => {
        if(accordionRef.current === null){
            return ;
        }
        // @ ts-ignore
        if(accordionRef.current && !accordionRef.current.contains(event.target)){
            setActiveIndex(null);
        }
    }

    useEffect(() => {
        document.addEventListener('click',handleClickOutside, false);
        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        }
    },[])

    const onClick : Function= (index:number) => {
        setActiveIndex(index);
    }

    const onClickRoute : Function = (index:number) => {
        history.push(`/${Options[index].path}`);
    }

    const Dropdown = Options.map((option, index) => {
        const active = ActiveIndex === index ? 'active' : '';
        return(
            <DropDownOption onClick ={onClick} onClickRoute = {onClickRoute} 
                index={index} option={option} active = {active} > </DropDownOption>
        );
    })

    const DropdownOptions = Options.map((option,index) => {
        const active = ActiveIndex === index;
        return (
            <div className={classes.root}>
                <Accordion expanded={active} onChange={(event, panel) => setActiveIndex(panel?index:null)} elevation={3}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{flexGrow : 5}}>
                        <Typography variant="h6" className={classes.heading} style={{flexGrow : 5}} > {option.title}</Typography>
                        <Button onClick={(e) => onClickRoute(index)} > Play : </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="h6" className={classes.description}> {option.description}</Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    })

    const poop:JSX.Element = (
        <div>
                        <Typography variant="h4" color="primary"> Welcome to Compressible Flows Calculator By Pranosaurus : </Typography>
            <div className={classes.titleSpacing}></div>
            <div className = "ui styled accordion">
                {false?{Dropdown}:null}
            </div>
        </div>     
    )

    return(
        <React.Fragment>
            <div style={{paddingRight : '20%', paddingLeft: '10%', paddingTop:'40px'}}>
                <div ref={accordionRef}> 
                        {DropdownOptions}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home; 
