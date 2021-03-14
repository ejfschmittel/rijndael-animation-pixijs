import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"


import DefaultResponsive from "./Responsives.default"

class ResponsiveMax800 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
       
        console.log(animationDimensions.width)
        if(animationDimensions.width < 400) return true;
        return false;
    }

    
    getDefines(defaultDefines){


        defaultDefines.animatableBackgroundText = {
            ...defaultDefines.animatableBackgroundText,
            fontSize: this.getWidth(8),
            x: this.getWidth(96),
            y: this.getWidth(1),
        }

        
        defaultDefines.animatableBackgroundBar = {
            ...defaultDefines.animatableBackgroundBar,
            height: this.getWidth(10),
            y: defaultDefines.animatableBackgroundText.fontSize + 2 * this.getWidth(2),
        }



        defaultDefines.defaultCellSize = {
            width: this.getWidth(12),
            height: this.getWidth(10),
        }

        defaultDefines.defaultCellStyles = {
            borderWidth: 1,
            borderFill: 0x000000,
            fill: 0xFFF995,
        }

        defaultDefines.stateGrid = {
            x: this.getWidth(2),
            y: this.getHeight(75),
            anchorX: 0,
            anchorY: .5,
        }

        defaultDefines.roundKeyCell = {
            fill: 0xC1C0C1,
            x: this.getWidth(98),
            y: this.getHeight(75),
            anchorX: 1,
            anchorY: .5,
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