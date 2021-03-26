import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"


import DefaultResponsive from "./Responsives.default"

class ResponsiveMax800 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width < 400) return true;
        return false;
    }

    
    getDefines(defines){

        defines.gridStyles = {
            width: this.getWidth(50),
            height: this.getWidth(30),
        }

        defines.gridLandingPos = {
            x: this.getWidth(50),
            y: this.getHeight(40)
        }



        defines.equationPos = {
            x: this.getWidth(4),
            y: this.getHeight(60)
        }

        defines.columnStyles = {
            width: defines.gridStyles.width / 4,
            height: defines.gridStyles.height
        }

        defines.gridTextStyles = {
            scale: .6
        }




        

        return defines;
    }

}

export default ResponsiveMax800