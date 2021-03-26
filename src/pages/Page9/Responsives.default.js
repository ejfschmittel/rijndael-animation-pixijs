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
            fill: this.COLORS.BG_YELLOW,
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
            fill: this.COLORS.BG_RED,
            borderWidth: 0,
        }


        defines.gridStyles = {
            width: this.getWidth(26),
            height: this.getWidth(20),
        }

        defines.gridTextStyles = {
            scale:1,
        }

        defines.gridLandingPos = {
            x: this.getWidth(20),
            y: this.getHeight(70)
        }



        defines.equationPos = {
            x: this.getWidth(40),
            y: this.getHeight(30)
        }

        defines.columnStyles = {
            width: defines.gridStyles.width / 4,
            height: defines.gridStyles.height
        }

        defines.stateGridStyle = {
            fill: this.COLORS.CELL_BG_YELLOW,
        }

        defines.resultGridStyle = {
            fill: this.COLORS.CELL_BG_PINK,
        }

        defines.columnLandingPos = {}
        defines.resultLandingPos = {}

    

        return defines;
    }





    createAnimationIn(){
        const tl = this.getAnimatableBackgroundTL();

        return tl;
    }




  
}

export default Page6DefaultResponsives