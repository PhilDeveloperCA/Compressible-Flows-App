import Flow from './Flow';

/*export class NormalShock {
    input_mach : number
    input_pressure: number
    
    constructor(input_mach:number, input_pressure:number){
        this.input_mach = input_mach;
        this.input_pressure = input_pressure;
    }

    shockFlow = (flow:Flow):Flow => {
        return flow;
    }
    
}*/
export function NormalShock(flow:Flow):Flow{
    var next_flow = Flow.CopyFlow(flow);
    //transform Total Pressure
    const term1 = Math.pow((flow.gamma+1)*flow.Mach*flow.Mach/((flow.gamma-1)*flow.Mach*flow.Mach +2), flow.gamma/(flow.gamma-1));
    const term2 = Math.pow((flow.gamma+1)/(2*flow.gamma*flow.Mach*flow.Mach-(flow.gamma-1)), 1/(flow.gamma-1))
    next_flow.TotalPressure = next_flow.TotalPressure*term1*term2;
    next_flow.Mach = Math.sqrt(((flow.gamma-1)*(flow.Mach*flow.Mach)+2)/(2*flow.gamma*flow.Mach*flow.Mach-(flow.gamma-1)));
    //transform Mach Number
    return next_flow;
}

/*export class ObliqueShock {
    //shock angle vs deflection angle
}*/

export type ShockInformation = {
    wave_angle: number,
    deflection_angle:number,
    mach1_normal:number,
    mach2_normal:number,
}

export function ObliqueShockFromWave(flow:Flow, angle:number):{flow:Flow, shock:ShockInformation}{
    var returnvariable = {flow:Flow.NewFlow(), shock:{wave_angle:5, deflection_angle:5, mach1_normal:3, mach2_normal:1}}
    return returnvariable;
}

export function ObliqueShockFromDeflection(flow:Flow, angle:number):{flow:Flow, shock:ShockInformation}{
    var returnvariable = {flow:Flow.NewFlow(), shock:{wave_angle:5, deflection_angle:5, mach1_normal:3, mach2_normal:1}}
    return returnvariable;
}



/*export function ObliqueShock(flow:Flow, deflection:boolean, angle:number):{flow:Flow|undefined, shock:ShockInformation|undefined}{
    //if not shock angle, convert to shock angle
    return {flow:Flow.NewFlow(), shock:{shock_angle:5}};
    //Total Pressure

    //Mach Based On Shock of Mach Normal + Continuation of Momentum Elsewhere + Pythagoreans Theroem? 
}*/