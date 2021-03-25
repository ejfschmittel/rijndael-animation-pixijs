import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"


import DefaultResponsive from "./Responsives.default"

class ResponsiveMax800 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width < 600) return true;
        return false;
    }

    
    getDefines(defines){

        defines.textStyles = {
            x: this.getWidth(50),
            yDistance: this.getHeight(4),
            fontSize: 14,
        }

        return defines;
    }



    createAnimationMain(){ }
}

export default ResponsiveMax800