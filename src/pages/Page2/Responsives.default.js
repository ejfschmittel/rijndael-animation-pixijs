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
        }
       

        defines.textBoxStyles = {
            width: this.getWidth(50),
            height: this.getHeight(40),
            borderWidth: 3,
            borderColor: 0xffffff,
            fill: 0x555555,
            x: this.getWidth(50),
            y: this.getHeight(50),
            anchorX: .5,
            anchorY: .5,
        }

        defines.textBoxTextScale = .8

        defines.textBoxTextStyles = {
            text: "Rijndael\nEncryptor", 
            fill: 0xffffff, 
            align: "center"
        }


        defines.arrowStyles = {
            fill: 0x000000,
            borderWidth: 3,
            borderColor: 0xfffffff,
        }


        
      
     


        return defines;
    }






  
}

export default Page7DefaultResponsives