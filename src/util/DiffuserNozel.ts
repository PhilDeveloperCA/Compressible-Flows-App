import Flow from './Flow';

export class Diffuser {
    area_ratio:number|null
    adiabatic_effeciency : number|null
    outlet_mach : number|null

    constructor(area_ratio:number|null, adiabatic_effeciency:number|null, outlet_mach:number|null){
        this.area_ratio=area_ratio;
        this.adiabatic_effeciency = adiabatic_effeciency;
        this.outlet_mach = outlet_mach;
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