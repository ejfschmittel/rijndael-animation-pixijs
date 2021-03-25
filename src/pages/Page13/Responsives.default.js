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
            fill: 0x000000,
            borderWidth: 0,
        }

        defines.titleStyles = {
            x: this.getWidth(50),
            yDistance: this.getHeight(6)
        }

        defines.circledCharStyles = {
            x: this.getWidth(50),
            y: this.getHeight(30),
        }

        defines.textStyles = {
            x: this.getWidth(50),
            yDistance: this.getHeight(4),
            fontSize: 18,
        }

        return defines;
    }




  
}

export default Page7DefaultResponsives