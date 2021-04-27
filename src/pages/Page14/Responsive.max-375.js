import AnimationPageResponsives from "../../core/AnimationPageResponsives"


class ResponsiveMax375 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width < 375) return true;
        return false;
    }

    getDefines(defines){
        defines.primaryGridPos = {
            ...defines.primaryGridPos,
            x: this.getWidth(2),
            y: 10,
        }

        defines.secondaryGridPos = {
            ...defines.secondaryGridPos,
            x: this.getWidth(2),
            y: 70,
        }

        defines.sboxStyles = {
            ...defines.sboxStyles,
            x: this.getWidth(50)+220, // width + x of grid rows
            y: this.getHeight(74),
            width: 280,
            height: 180,
            legendWidth: 20,
        }

        defines.sBoxTextStyles = {
            fontSize: 8,
        }

        defines.rconStyles = {
            ...defines.rconStyles,
            width: 125,
            height: 50,
            x: this.getWidth(50),
            y: this.getHeight(98),
        }

        defines.rconMovablesTextStyles = {
            ...defines.rconMovablesTextStyles,
            fontSize: 9
        }


        return defines;
    }
}

export default ResponsiveMax375