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


        defines.gridStyles = {
            ...defines.gridStyles,
            width: this.getWidth(60),
            height: this.getHeight(30),
            x: this.getWidth(50),
            y: this.getHeight(30)
        }

        defines.movablesStyles = {
            fill: this.COLORS.CELL_BG_YELLOW
        }


        const cellHeight = defines.gridStyles.height / 4;

        const textsY = defines.gridStyles.y + defines.gridStyles.height + this.getHeight(8)

        defines.text1Pos = {
            x: this.getWidth(25),
            y: textsY
        }

        defines.text2Pos = {
            x: this.getWidth(25),
            y: textsY
        }

        defines.text3Pos = {
            x: this.getWidth(25),
            y: textsY
        }


        return defines;
    }



    createAnimationMain(){ }
}

export default ResponsiveMax800