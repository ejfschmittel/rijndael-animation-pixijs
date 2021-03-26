import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"


import DefaultResponsive from "./Responsives.default"

class ResponsiveMax800 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width < 500) return true;
        return false;
    }

    
    getDefines(defines){


        defines.gridStyles = {
            width: this.getWidth(40),
            height: this.getWidth(30),
        }

        defines.gridTextStyles = {
            scale: .6,
        }

        defines.columnStyles = {
            width: defines.gridStyles.width / 4,
            height: defines.gridStyles.height,
        }

        defines.equationPos = {
            x: this.getWidth(50),
            y: this.getHeight(40),
        }
      

        defines.stateGridPos = {
            x: this.getWidth(25),
            y: this.getHeight(75)
        }

        defines.roundKeyGridPos = {
            x: this.getWidth(75),
            y: this.getHeight(75)
        }


        

        return defines;
    }
}

export default ResponsiveMax800