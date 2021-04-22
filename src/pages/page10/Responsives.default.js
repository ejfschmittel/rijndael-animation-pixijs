import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"
import { TilingSprite } from "pixi.js";
class Page6DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}


        defines.animatableBackgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-theta"),
        }

        defines.animatableBackgroundTitleStyles = {
            x: this.getWidth(90),
            y: this.getHeight(4),
        }

        defines.animatableBackgroundBarStyles = {
            width: this.getWidth(100),
            height: this.getHeight(8),
            fill: this.c("--bar-background-alpha"),
        }
      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-eta"),
            borderWidth: 0,
        }


        defines.gridStyles = {
            width: this.getWidth(20),
            height: this.getWidth(16),
        }

        defines.gridTextStyles = {
            scale: 1,
        }

        defines.columnStyles = {
            width: defines.gridStyles.width / 4,
            height: defines.gridStyles.height,
        }


        defines.stateGridPos = {
            x: this.getWidth(20),
            y: this.getHeight(75)
        }

        defines.roundKeyGridPos = {
            x: this.getWidth(80),
            y: this.getHeight(75)
        }


        defines.equationPos = {
            x: this.getWidth(50),
            y: this.getHeight(50),
        }


        defines.resultGridStyles = {
            fill: this.c("--grid-background-gamma")
        }

        defines.stateGridStyles = {
            fill: this.c("--grid-background-alpha")
        }

        defines.roundKeyGridStyles = {
            fill: this.c("--grid-background-eta")
        }


    

        return defines;
    }





   



  
}

export default Page6DefaultResponsives