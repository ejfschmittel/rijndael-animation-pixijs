import AnimationPageResponsives from "../../core/AnimationPageResponsives"


class ResponsiveMax768 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width <= 768) return true;
        return false;
    }

    getDefines(defines){
       
        defines.counterStyles = {
            ... defines.counterStyles,
            width: 59,
            height: 40,
            position: {
                x:  this.getWidth(80),
                y: this.getHeight(90)
            },
        }


        return defines;
    }
}

export default ResponsiveMax768