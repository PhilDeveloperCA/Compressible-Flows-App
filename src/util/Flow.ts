class Flow {
    Mach : number;
    TotalTemp : number;
    TotalPressure : number;
    gamma :number; 
    R : number;

    //getter block
    get expr() : number {return (1+Math.pow(this.Mach,2)*(this.gamma-1)/2)};
    get Temp() : number {return (this.TotalTemp/this.expr)}
    get SoundSpeed() : number{return (Math.sqrt(this.gamma*this.R*this.Temp))}
    get Velocity() : number{return (this.SoundSpeed*this.Mach)}
    get Pressure() : number{return (this.TotalPressure*this.PressureRatio)/1000};
    get PressureRatio() : number{return (Math.pow(this.expr, -this.gamma/(this.gamma-1)))}
    get TemperatureRatio() : number{return (Math.pow(this.expr, -1))}
    get DensityRatio() : number{return (Math.pow(this.expr, -1/(this.gamma-1)))}
    get MachAngle() : number{return Math.asin(1/this.Mach)*180/Math.PI}
    get Cp() : number {return this.R*(this.gamma/(this.gamma-1))}
    //get AreaRatio() : number{return Math.pow((this.gamma+1)/2, -(this.gamma+1)/(2*(this.gamma-1)))*Math.pow((1+(this.gamma-1)/2*this.Mach*this.Mach), (this.gamma+1)/(2*(this.gamma-1))/this.Mach)};
    //get Enthalpy() : number{return Math.pow(this.Velocity,2)/2/1000+this.Pressure}
    get Enthalpy() : number{return 1/1000*this.TotalTemp*this.Cp};
    get Density() : number{return this.Pressure*1000/this.R/this.Temp}
    get PrantlMeyer() : number{return (Math.sqrt((this.gamma-1)/(this.gamma+1))*Math.atan(Math.sqrt((this.gamma-1)/(this.gamma+1)*Math.pow(this.Mach,2)))-Math.atan(Math.pow(this.Mach,2)-1))*180/Math.PI}
    get AreaRatio2() : number{
        const A1 = (this.gamma+1)/2;
        const A2 = -(this.gamma+1)/2/(this.gamma-1);
        const A3 = Math.pow(A1,A2);
        const A4= (1+(this.gamma-1)/2*Math.pow(this.Mach,2));
        const A5 = (this.gamma+1)/2/(this.gamma-1);
        const A6 = Math.pow(A4,A5);
        return A6*A3/this.Mach;
    }

    //default 
    static NewFlow = () => new Flow(0,0,0,1.4,287);
    static CopyFlow = (flow:Flow) => new Flow(flow.Mach, flow.TotalTemp, flow.TotalPressure, flow.gamma, flow.R)
    //default : change
    constructor(Mach:number, TotalTemp:number, TotalPressure:number, gamma:number, R : number){
        console.log(gamma);
        console.log(R);
        
        this.Mach = Mach;
        this.TotalTemp = TotalTemp;
        this.TotalPressure = TotalPressure;
        this.gamma = gamma;
        this.R = R;
    }
    //Mach Changers
    //From Mach
    static MachFromMach = (flow : Flow, Mach : number) => new Flow(Mach, flow.TotalTemp, flow.TotalPressure, flow.gamma, flow.R);
    //From Pressure Ratio
    static MachFromPR = (flow : Flow, PR:number) => {
        //console.log(Math.asin(1));
        const Mach1 = Math.pow(PR, -(flow.gamma-1)/flow.gamma);
        const Mach2 = (Mach1 - 1)*2/(flow.gamma-1);
        const Mach3 = Math.sqrt(Mach2);
        const Mach = Math.sqrt((Math.pow(PR, (-flow.gamma-1)/flow.gamma)-1)*(2/(flow.gamma-1)));
        return new Flow(Mach3, flow.TotalTemp, flow.TotalPressure, flow.gamma, flow.R);
    }
    //From Temperature Ratio
    static MachFromTR = (flow : Flow, TR:number) => {
        const Mach = Math.sqrt((Math.pow(TR,-1)-1)*(2/(flow.gamma-1)));
        return new Flow(Mach, flow.TotalTemp, flow.TotalPressure, flow.gamma, flow.R);
    }
    //From Density Ratio 
    static MachFromDR = (flow : Flow, DR:number) => {
        const Mach = Math.sqrt(Math.pow(DR, (-flow.gamma-1)*flow.gamma)*(2/(flow.gamma-1)));
    }

    //From Mach Angle 
    static MachFromMA = (flow: Flow, MA:number) => {
        const Mach = Math.asin(MA*Math.PI/180)
        return new Flow(Mach, flow.TotalTemp, flow.TotalPressure, flow.gamma, flow.R);
    }
    //From Prandtl-Meyer Angle


    //From Area Ratio 
    static MachToAR = (Mach: number, gamma: number) => {
        const A1 = (gamma+1)/2;
        const A2 = -(gamma+1)/2/(gamma-1);
        const A3 = Math.pow(A1,A2);
        const A4= (1+(gamma-1)/2*Math.pow(Mach,2));
        const A5 = (gamma+1)/2/(gamma-1);
        const A6 = Math.pow(A4,A5);
        return A6*A3/Mach;
    }

    static MachFromARSubsonic = (flow:Flow, AR:number) => {
        var Mach = .5;
        while(Math.abs(AR-Flow.MachToAR(Mach, flow.gamma))>.00005){
            Mach = Mach-.001*(AR-Flow.MachToAR(Mach, flow.gamma))
        }
        return new Flow(Mach, flow.TotalTemp, flow.TotalPressure, flow.gamma, flow.R);
    }

    static MachFromARSupersonic = (flow:Flow, AR:number) => {
        var Mach = 2;
        while(Math.abs(AR-Flow.MachToAR(Mach, flow.gamma))>.00005){
            Mach = Mach+.001*(AR-Flow.MachToAR(Mach, flow.gamma))
        }
        return new Flow(Mach, flow.TotalTemp, flow.TotalPressure, flow.gamma, flow.R);
    }
    //Set Total Pressure (From Density, etc...)
    static TPFromTP = (flow : Flow, TP:number) => new Flow(flow.Mach, flow.TotalTemp, TP, flow.gamma, flow.R);
    
    static TPFromPressure = ( flow : Flow, Pressure:number) => {
        const TP = Pressure*Math.pow((1+(flow.gamma-1)/2*Math.pow(flow.Mach,2)),(flow.gamma/(flow.gamma-1)))
        return new Flow(flow.Mach, flow.TotalTemp, TP, flow.gamma, flow.R);
    }

    //Set Total Temperature Ratio
    static TTFromTT = (flow:Flow, TT:number) => new Flow(flow.Mach, TT, flow.TotalPressure, flow.gamma, flow.R);

    static TTFromTemperature = (flow:Flow, Temperature:number) => {
        const TT = Temperature*flow.expr;
        return new Flow(flow.Mach, TT, flow.TotalPressure, flow.gamma, flow.R)
    }

    static TTFromSoundSpeed = (flow:Flow,SoundSpeed:number) => {
        const StaticTemperature = Math.pow(SoundSpeed,2)/(flow.R*flow.gamma);
        return Flow.TTFromTemperature(flow, StaticTemperature);
    }

}

export default Flow;