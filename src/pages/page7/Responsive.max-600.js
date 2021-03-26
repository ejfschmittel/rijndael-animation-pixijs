import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"


import DefaultResponsive from "./Responsives.default"

class ResponsiveMax800 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width < 800) return true;
        return false;
    }

    
    getDefines(defines){

        defines.gridStyles = {
            width: this.getWidth(24),
            height: this.getWidth(16),
            x: this.getWidth(15),
            y: this.getHeight(60)
        }

        defines.sBoxStyles = {
            width: this.getWidth(60),
            height: this.getHeight(50)
        }

        defines.sboxLegendStyles = {
            scale: .4
        }
        
        defines.sBoxTextStyles = {
            scale: .4,
        }

        return defines;
    }



    createAnimationMain(){ }
}

export default ResponsiveMax800