import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"


import DefaultResponsive from "./Responsives.default"

class ResponsiveMax800 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width < 700) return true;
        return false;
    }

    
    getDefines(defines){

        defines.gridStyles = {
            width: this.getWidth(30),
            height: this.getWidth(24),
        }

        defines.gridTextStyles = {
            scale: .8,
        }

        defines.columnStyles = {
            width: defines.gridStyles.width / 4,
            height: defines.gridStyles.height,
        }

        defines.equationPos = {
            x: this.getWidth(50),
            y: this.getHeight(40),
        }



        return defines;
    }



    createAnimationMain(){ }
}

export default ResponsiveMax800