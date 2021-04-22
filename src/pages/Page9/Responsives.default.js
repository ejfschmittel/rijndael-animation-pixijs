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
            fill: this.c("--page-background-eta"),
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
            fill: this.c("--bar-background-zeta"),
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
            fill: this.c("--grid-background-alpha"),
        }

        defines.resultGridStyle = {
            fill: this.c("--grid-background-delta"),
        }

        defines.columnLandingPos = {}
        defines.resultLandingPos = {}

    

        return defines;
    }





  
  
}

export default Page6DefaultResponsives