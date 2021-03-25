import AnimationPageResponsives from "../../core/AnimationPageResponsives"
import {generatRandomBinaryStrings} from "../../utils/binary"
import {gsap} from "gsap"
class Page2DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);


        this.FADE_OUT_DELAY = 0;
    }


    

    getDefines(){

        const defines = {}


        // base styles
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: 0x000000,
        }
     
        defines.textStyles = {
            scale: 1,
        }
       
        // center box styles
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

        defines.textBoxTextStyles = {
            scale: .8,
        }


        // arrow styles
        defines.textBoxTextStyles = {
            text: "Rijndael\nEncryptor", 
            fill: 0xffffff, 
            align: "center"
        }


        defines.arrowStyles = {
            fill: 0x000000,
            borderWidth: 3,
            borderColor: 0xfffffff,
            width: this.getWidth(10),
            height: this.getHeight(20),
        }

        defines.arrowFontStyles = {
            fill: 0xffffff,
            fontSize: 18,
            text: "1001010"
        }

        defines.arrowLeftStyles = {
            ...defines.arrowStyles,
            width: this.getWidth(16),
            height: this.getHeight(10),
        }



        return defines;
    }


    createAnimationMain(){
        
        const {arrowTop, arrowBot, arrowLeft} = this.getGlobalComponents();
        const binaryStrings = generatRandomBinaryStrings(20, 8)
        
        const tl = gsap.timeline();


        const obj = {val: 0};

        tl.to(obj, {val: binaryStrings.length-1, ease: "none", duration: 3, repeat: 2, onUpdate: () => {
            const idx = Math.floor(obj.val)
            arrowTop.text.text = binaryStrings[idx];
            arrowLeft.text.text = binaryStrings[(idx+1)%binaryStrings.length];
            arrowBot.text.text = binaryStrings[(idx+2)%binaryStrings.length];
        }})


      
        return tl;
    }


    createAnimationOut(){

        const {centerBox, arrowTopContainer, arrowBotContainer, arrowLeftContainer} = this.getGlobalComponents();
        const tl = gsap.timeline();

     
        tl.to([arrowBotContainer, arrowLeftContainer, arrowTopContainer], {pixi: {alpha: 0}, duration: .3})
     
        tl.to(centerBox, {pixi: {scale: 5}, duration: 1.5}, "fade-out-center-box")
        tl.to(centerBox.text, {pixi: {alpha: 0}, duration: .3}, "fade-out-center-box+=0")
        //tl.to(centerBox.text, {pixi: {alpha: 0}, duration: .2}, "fade-out-center-box+=2")
        
        return tl;
    }






  
}

export default Page2DefaultResponsives