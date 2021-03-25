import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"
class Page7DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}


        /* animatable background defines */

        defines.sBoxCellFontStyles = {
            fontSize: this.getWidth(1.5)
        }

        defines.sBoxLegendFontStyles = {
            fontSize: this.getWidth(1.5)
        }

        defines.sBoxStyles = {
            width: this.getWidth(60),
            height: this.getHeight(50),
            legendWidth: this.getWidth(4),
            x: this.getWidth(98),
            anchorX: 1,
            y: this.getHeight(98),
            anchorY: 1,
        }
      


        return defines;
    }






}

export default Page7DefaultResponsives