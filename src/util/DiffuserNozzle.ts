import Flow from './Flow';
import {NormalShock} from './ShockWaves';

//Think Of the Cases
//Define Outlet Pressure + Inlet Pressure + Exit Area/Entrance Area
//Can There be a shock in just a Diffuser??? Supersonic Entrance -> Too High Pressure ...
//If Subsonic in Entrance -> Just Going To Slow Down To The End 
//Very Supersonic -> Normal Shock at Entrance?? 
//No Shock Solution 

export class Diffuser {
    area_ratio:number|null = null;
    adiabatic_effeciency : number|null = null;
    outlet_mach : number|null = null;

    constructor(area_ratio:number|null, adiabatic_effeciency:number|null, outlet_mach:number|null){
        this.area_ratio=area_ratio;
        this.adiabatic_effeciency = adiabatic_effeciency;
        this.outlet_mach = outlet_mach;
    }

    //pressure drive will determine the velocity??
    expandToPressure = () => {
        const normalEntranceMach = 0;
    }

}

export class Nozzle {
    
}

export class DiffuserNozzle {
    outlet_pressure: number|null


    constructor(outlet_pressure:number|null){
        this.outlet_pressure = outlet_pressure;
    }
}


export {}