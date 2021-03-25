import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"
class Page6DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}


        defines.animatableBackgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.COLORS.BG_GREEN,
        }

        defines.animatableBackgroundTitleStyles = {
            x: this.getWidth(90),
            y: this.getHeight(4),
        }

        defines.animatableBackgroundBarStyles = {
            width: this.getWidth(100),
            height: this.getHeight(8),
            fill: this.COLORS.BG_WHITE,
        }
      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.COLORS.BG_YELLOW,
            borderWidth: 0,
        }

    

        return defines;
    }





    createAnimationIn(){
        const tl = this.getAnimatableBackgroundTL();

        return tl;
    }




  
}

export default Page6DefaultResponsives