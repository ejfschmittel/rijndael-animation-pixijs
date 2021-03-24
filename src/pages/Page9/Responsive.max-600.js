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

    
    getDefines(defaultDefines){



        defaultDefines.animatableBackgroundText = {
            ...defaultDefines.animatableBackgroundText,
            fontSize: this.getWidth(6),
            x: this.getWidth(96),
            y: this.getWidth(1),
        }

        
        defaultDefines.animatableBackgroundBar = {
            ...defaultDefines.animatableBackgroundBar,
            height: this.getWidth(7),
            y: defaultDefines.animatableBackgroundText.fontSize + 2 * this.getWidth(2),
        }






        defaultDefines.defaultCellSize = {
            width: this.getWidth(10),
            height: this.getWidth(8),
        }

        defaultDefines.stateGrid = {
            x: this.getWidth(6),
            y: this.getHeight(75),
            anchorX: 0,
            anchorY: .5,
        }

        defaultDefines.text1 = {
            x: this.getWidth(50),
            y: this.getHeight(75) - defaultDefines.defaultCellSize.height * .5,
        }
        defaultDefines.text2 = {
            x: this.getWidth(50),
            y: this.getHeight(75) + defaultDefines.defaultCellSize.height * .5,
        }
        defaultDefines.text3 = {
            x: this.getWidth(50),
            y: this.getHeight(75) + defaultDefines.defaultCellSize.height * 1.5,
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