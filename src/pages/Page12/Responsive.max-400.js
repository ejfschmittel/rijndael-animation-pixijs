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

        
        defines.rowStyles = {
            width: this.getWidth(100),
            height: this.getHeight(15),
            margin: this.getHeight(1),
            x: this.getWidth(2),
            y: this.getHeight(10),
            gap: 3,
            titleSpace: 16,
        }

        defines.rowTitleStyles = {
            scale: .5,
            rotation: -1.5708,
        }


        defines.titleStyles = {
            y: this.getHeight(5),
            scale: .35,
        }

        

        return defines;
    }



    createAnimationMain(){ }
}

export default ResponsiveMax800