import React from 'react';
import { FC } from 'react';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const Options = [
    {
        title : "Isentropic Flow Properties",
        description : "Calculate and Compare properties of varying flows across different Mach, Total Temperature, and Total Pressure",
        path : 'isentropicflow'
    },
    {
        title : "Shock Waves",
        description : "Examine the Flow Properties across an Oblique or Normal Shock Wave for a flow",
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
        description : "Build a Custom System Using Diffusers, Nozels, Turbomachinery, Cumbostors and Fans",
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

const Home: FC = () => {
    const [ActiveIndex, setActiveIndex] = useState<undefined|number>();
    const history = useHistory();

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

    return(
        <React.Fragment>
            <h2> Welcome to Compressible Flows Calculator : </h2>
            <div className = "ui styled accordion">
                {Dropdown}
            </div>
        </React.Fragment>
    );
}

export default Home; 
