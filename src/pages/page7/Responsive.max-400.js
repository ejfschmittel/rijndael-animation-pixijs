import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"


import DefaultResponsive from "./Responsives.default"

class ResponsiveMax800 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width < 550) return true;
        return false;
    }

    
    getDefines(defines){

        
        defines.gridStyles = {
            width: this.getWidth(50),
            height: this.getWidth(34),
            x: this.getWidth(50),
            y: this.getHeight(30),
        }

        defines.sBoxStyles = {
            width: this.getWidth(100),
            height: this.getHeight(50),
            legendWidth: 30,
        }

        defines.sBoxPos = {
            x: this.getWidth(100),
            y: this.getHeight(100)
        }


        
        defines.sboxLegendStyles = {
            scale: .4
        }
        
        defines.sBoxTextStyles = {
            scale: .4,
        }

        
        defines.textBoxStyle = {
            width: this.getWidth(16),
            height: this.getWidth(12),
        }
       
      


        

        return defines;
    }




}

export default ResponsiveMax800