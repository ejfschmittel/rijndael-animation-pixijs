import AnimationPageResponsives from "../../core/AnimationPageResponsives"


class ResponsiveMax700 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width <= 700) return true;
        return false;
    }

    getDefines(defines){
       
    

        defines.sboxStyles = {
            ...defines.sboxStyles,
            x: 70 + 340, // width + x of grid rows
            y: this.getHeight(66),
            width: 340,
            height: 260,
            legendWidth: 24,
        }

        defines.rconStyles = {
            ...defines.rconStyles,
            width: 240,
            height: 96,
        }


        return defines;
    }
}

export default ResponsiveMax700