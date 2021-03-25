import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"




class ResponsiveMax800 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width < 600) return true;
        return false;
    }

    
    getDefines(defines){
        defines.textBoxStyles = {
            ...defines.textBoxStyles,
            x: this.getWidth(70),
        }

        defines.textBoxTextStyles = {
            scale: .5,
        }

        
        defines.arrowStyles = {
            ...defines.arrowStyles,
            width: this.getWidth(18),
            height: this.getHeight(20),
        }

        defines.arrowLeftStyles = {
            ...defines.arrowLeftStyles,
            width: this.getWidth(30),
            height: this.getHeight(10),
        }

        defines.arrowFontStyles = {
            ...defines.arrowFontStyles,
            fontSize: 14,
        }

        defines.textStyles = {
            scale: .7
        }

   

        return defines;
    }




    getBounds(elem){
        const bounds  = elem.getBounds();
        return {x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height}
    }

    createAnimationMain(){ }
}

export default ResponsiveMax800