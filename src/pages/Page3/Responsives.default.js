import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"
class Page7DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}

        defines.titleStyles = {
            scale: 1,
        }

        defines.subtitleStyles = {
            scale: 1,
        }
      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: 0x555555,
            borderWidth: 0,
        }


        defines.gridStyles = {
            width: this.getWidth(30),
            height: this.getWidth(20),
        }

        defines.leftGridPos = {
            x: this.getWidth(25),
            yDistance: this.getHeight(2)
        }

        defines.rightGridPos = {
            x: this.getWidth(75),
            yDistance: this.getHeight(2)
        }

        defines.subtitleLeftStyles = {
            x: this.getWidth(25),
            y: this.getHeight(14)
        }

        defines.subtitleRightStyles = {
            x: this.getWidth(75),
            y: this.getHeight(14)
        }


        defines.arrowStyles = {
            height: this.getHeight(16),
            width: this.getWidth(6),
        }

        defines.arrowLeftPos = {
            x: this.getWidth(25),
            yDistance: this.getHeight(2)
        }

        defines.arrowRightPos = {
            x: this.getWidth(75),
            yDistance: this.getHeight(2)
        }

        defines.textRightPos = {
            x: this.getWidth(75),
            yDistance: this.getHeight(2)
        }
        defines.textLeftPos = {
            x: this.getWidth(25),
            yDistance: this.getHeight(2)
        }
        

       
     


        return defines;
    }




  
}

export default Page7DefaultResponsives