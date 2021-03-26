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
            fill: this.COLORS.BG_BLUE,
        }

        defines.animatableBackgroundTitleStyles = {
            x: this.getWidth(90),
            y: this.getHeight(4),
        }

        defines.animatableBackgroundBarStyles = {
            width: this.getWidth(100),
            height: this.getHeight(5),
            fill: this.COLORS.BG_WHITE,
        }
      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.COLORS.BG_WHITE,
            borderWidth: 0,
        }


        defines.sBoxStyles = {
            width: this.getWidth(50),
            height: this.getHeight(50)
        }

        defines.sboxLegendStyles = {
            scale: .5
        }
        
        defines.sBoxTextStyles = {
            scale: .5,
        }

        defines.sBoxPos = {
            x: this.getWidth(96),
            y: this.getHeight(96)
        }

        defines.gridStyles = {
            width: this.getWidth(24),
            height: this.getWidth(16),
            x: this.getWidth(25),
            y: this.getHeight(50)
        }

        defines.stateMovableStyles = {
            fill: this.COLORS.CELL_BG_YELLOW
        }

        defines.resultMovablesStyles = {
            fill: this.COLORS.CELL_BG_DARK_YELLOW
        }

        defines.textBoxStyle = {
            width: this.getWidth(6),
            height: this.getWidth(4),
        }
    

        return defines;
    }





    createAnimationIn(){
        const tl = this.getAnimatableBackgroundTL();

        return tl;
    }




  
}

export default Page6DefaultResponsives