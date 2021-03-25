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

        defines.gridStyles = {
            width: this.getWidth(46),
            height: this.getHeight(20)
        }
        defines.titleStyles = {
            scale: .7,
        }

        defines.subtitleStyles = {
            scale: .8
        }

        defines.subtitleLeftStyles = {
            x: this.getWidth(25),
            y: this.getHeight(18)
        }

        defines.subtitleRightStyles = {
            x: this.getWidth(75),
            y: this.getHeight(18)
        }
        

        return defines;
    }



    createAnimationMain(){ }
}

export default ResponsiveMax800