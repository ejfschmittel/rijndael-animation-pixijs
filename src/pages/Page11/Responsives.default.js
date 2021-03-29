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
            fill: this.COLORS.BG_GREY,
            borderWidth: 0,
        }


        defines.rowStyles = {
            width: this.getWidth(96),
            height: this.getHeight(15),
            margin: this.getHeight(1),
            x: this.getWidth(2),
            gap: 20,
        }

        defines.rowTitleStyles = {
            x: 20,
            scale: 1,
        }


        defines.titleStyles = {
            y: this.getHeight(5),
            scale: .8,
        }


        return defines;
    }




  
}

export default Page7DefaultResponsives