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

export type ObliqueShockInformation = {
    wave_angle: number,
    deflection_angle:number,
    mach1_normal:number,
    mach2_normal:number,
}

function deflectionFromWave(angle:number, flow:Flow):number{
    const term1 = (flow.gamma+1)*Math.pow(flow.Mach,2)/(2*(Math.pow(flow.Mach,2)*Math.pow(Math.sin(angle*Math.PI/180),2)-1))-1;
    var deflection_angle = Math.atan(1/Math.tan(angle*Math.PI/180)/term1);
    return deflection_angle;
}

function calculateWaveAngleFromDeflection(deflection_angle:number,flow:Flow):number{
    var i = 0;
    var guess_wave = deflection_angle*1.5;
    var difference = deflectionFromWave(guess_wave,flow)*180/Math.PI - deflection_angle;
    while(Math.abs(difference) > .00005){
        i++;
        if(i>100){
            console.log('Took TOO Long');
            console.log(guess_wave);
            return guess_wave;
        }
        /*if(difference<0){
            guess_wave = guess_wave - .02*difference; 
        }
        else guess_wave = guess_wave + .02*difference;*/
        console.log(difference);
        console.log(guess_wave);
        guess_wave = guess_wave - .2*difference;
        difference = deflectionFromWave(guess_wave,flow)*180/Math.PI - deflection_angle;
    }
    return guess_wave;
}

function flowFromDeflectionWave(deflection_angle:number, shock_angle:number, flow:Flow):number{
    console.log('angles')
    console.log(deflection_angle);
    console.log(shock_angle);
    const term1 = (flow.gamma-1)*Math.pow(flow.Mach*Math.sin(shock_angle*Math.PI/180),2)+2;
    const term2 = 2*flow.gamma*Math.pow(flow.Mach*Math.sin(shock_angle*Math.PI/180),2)-(flow.gamma-1);
    const term3 = Math.pow(Math.sin((shock_angle-deflection_angle)*Math.PI/180),2);
    return Math.sqrt(term1/term2/term3);
}

export function ObliqueShockFromDeflection(flow:Flow, angle:number):{flow:Flow, shock:ObliqueShockInformation}{
    const wave_angle = calculateWaveAngleFromDeflection(angle,flow);
    var resulting_flow = Flow.CopyFlow(flow);
    var deflection_angle = angle;
    resulting_flow.Mach = flow.Mach*Math.sin(wave_angle*Math.PI/180);
    resulting_flow.TotalPressure = NormalShock(resulting_flow).TotalPressure;
    //resulting_flow.Mach = resulting_flow.Mach*Math.cos(angle*Math.PI/180)/Math.cos((angle-deflection_angle)*Math.PI/180); //this is wrong though 
    resulting_flow.Mach = flowFromDeflectionWave(deflection_angle, wave_angle, flow);
    var returnvariable = {flow:resulting_flow, shock:{wave_angle:wave_angle, deflection_angle, mach1_normal:3, mach2_normal:1}}
    //var returnvariable = {flow:Flow.NewFlow(), shock:{wave_angle:5, deflection_angle:5, mach1_normal:3, mach2_normal:1}}
    return returnvariable;
}

export function ObliqueShockFromWave(flow:Flow, angle:number):{flow:Flow, shock:ObliqueShockInformation}{
    var resulting_flow = Flow.CopyFlow(flow);
    const term1 = (flow.gamma+1)*Math.pow(flow.Mach,2)/(2*(Math.pow(flow.Mach,2)*Math.pow(Math.sin(angle*Math.PI/180),2)-1))-1;
    //var deflection_angle = Math.atan(1/Math.tan(angle*Math.PI/180)/term1);
    var deflection_angle = deflectionFromWave(angle,flow);
    resulting_flow.Mach = flow.Mach*Math.sin(angle*Math.PI/180);
    resulting_flow.TotalPressure = NormalShock(resulting_flow).TotalPressure;
    //resulting_flow.Mach = resulting_flow.Mach*Math.cos(angle*Math.PI/180)/Math.cos((angle-deflection_angle)*Math.PI/180);
    resulting_flow.Mach = flowFromDeflectionWave(deflection_angle*180/Math.PI, angle, flow);
    var returnvariable = {flow:resulting_flow, shock:{wave_angle:angle, deflection_angle, mach1_normal:3, mach2_normal:1}}
    return returnvariable;
}
