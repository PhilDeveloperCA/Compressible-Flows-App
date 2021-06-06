import Flow from "./Flow";

export class Compressor {
    polyeff : number|null;
    iseneff : number|null;
    pressure_ratio : number|null;
    work : number|null;

    constructor(iseneff:number|null, polyeff : number|null, pressure_ratio:number|null, work:number|null){
        this.polyeff = polyeff;
        this.iseneff = iseneff;
        this.pressure_ratio = pressure_ratio;
        this.work = work;
    }

    compressFlow = (flow:Flow) => {
        console.log('Flow Tracker');
        console.log(flow);
        const new_flow = Flow.CopyFlow(flow);
        console.log(new_flow);
        if(this.polyeff && this.pressure_ratio){}
        if(this.iseneff !== null && this.pressure_ratio !== null){
            console.log('Transform Now');
            const TFactor = ((Math.pow(this.pressure_ratio, (flow.gamma-1)/flow.gamma))-1)/this.iseneff;
            new_flow.TotalPressure = flow.TotalPressure*this.pressure_ratio;
            new_flow.TotalTemp = flow.TotalTemp*TFactor;
            //Flow.MachFromVelocity
        }
        if(this.polyeff && this.work){}
        if(this.iseneff && this.work){}
        
        flow.Mach = 1;

        console.log(new_flow);
        return new_flow;
    }    
}

export class Turbine {
    polyeff : number|null = null;
    iseneff : number|null = null;
    pressure_ratio : number|null = null;
    work : number|null = null;

    constructor(iseneff:number|null, polyeff : number|null,pressure_ratio:number|null, work:number|null){
        this.polyeff = polyeff;
        this.iseneff = iseneff;
        this.pressure_ratio = pressure_ratio;
        this.work = work;
    }

    expandFlow = (flow:Flow) => {
        if(this.polyeff && this.pressure_ratio){
            
        }
        if(this.iseneff && this.pressure_ratio){

        }
        if(this.polyeff && this.work){

        }
        if(this.iseneff && this.work){
            
        }
        return Flow.NewFlow()
    }    
}

/*module.exports = {
    Compressor,
    Turbine
}*/