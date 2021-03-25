import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"


import DefaultResponsive from "./Responsives.default"

class ResponsiveMax800 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width < 800 || animationDimensions.height < 600) return true;
        return false;
    }

    
    getDefines(defaultDefines){



        defaultDefines.sBoxCellFontStyles = {
            fontSize: this.getWidth(1)
        }

        defaultDefines.sBoxLegendFontStyles = {
            fontSize: this.getWidth(.8)
        }

        defaultDefines.sBoxStyles = {
            width: this.getWidth(80),
            height: this.getHeight(50),
            legendWidth: this.getWidth(4),
            x: this.getWidth(50),
            anchorX: .5,
            y: this.getHeight(100),
            anchorY: 1,
        }
      


        

        return defaultDefines;
    }




    getBounds(elem){
        const bounds  = elem.getBounds();
        return {x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height}
    }

    createAnimationMain(){ }
}

export default ResponsiveMax800