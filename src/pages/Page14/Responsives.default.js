import AnimationPageResponsives from "../../core/AnimationPageResponsives"




import {gsap} from "gsap"
class Page7DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}

      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-gamma"),
            borderWidth: 0,
        }

        defines.barStyles = {
            width: this.getWidth(100),
            height: this.getHeight(5),
            fill: this.c("--bar-background-alpha"),
            borderWidth: 0,
        }

        defines.baseGridStyles = {
            width: 120,
            height: 100,
            fill: this.c("--grid-background-eta"),
        }

        defines.baseGridTextStyles = {
            fontSize: 14,
        }

        defines.finalGridPos = {
            x: this.getWidth(96),
        }

        defines.titleStyles = {
            y: 10, 
            x: this.getWidth(90),
            scale: 1,
        }

        defines.sboxStyles = {
            x: this.getWidth(80),
            y: this.getHeight(60),
        }


        //
        defines.rconStyles = {
            fill: this.c("--grid-background-alpha"),
            width: this.getWidth(30),
            height: this.getHeight(16),
            x: this.getWidth(50),
            y: this.getHeight(96),
        }

        defines.rconMovablesTextStyles = {
            fontSize: 12
        }

        defines.rconMovablesStyles = {
            fill: this.c("--grid-background-alpha"),
        }


        defines.firstGridStyle = {
            fill: this.c("--grid-background-beta"),
        }

        defines.gridMovableStyles = {
            fill: 0xC2C0C2,
        }

        defines.gridTextStyle = {
            scale: .8,
        }

        
        defines.subbytesMovablesStyles = {
            fill: this.c("--grid-background-gamma")
        }


        defines.xorTextPos = {
            x: this.getWidth(96),
            y: this.getHeight(50)
        }

        defines.initialTextPos = {
            x: this.getWidth(96),
            y: this.getHeight(50)
        }

        defines.sTextStylesPos = {
            x: this.getWidth(96),
            y: this.getHeight(50)
        }
    
        return defines;
    }






  
}

export default Page7DefaultResponsives