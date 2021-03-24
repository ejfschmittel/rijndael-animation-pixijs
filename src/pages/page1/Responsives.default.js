import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"

class Page1DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){
        const defines = {}

        defines.baseTextStyles = {
            fontSize: 60,
            fill: 0xffffff,
        }

        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: 0x000000,
        }

       defines.containerPos = {
           x: this.getWidth(50),
           y: this.getHeight(50),
           anchorX: .5,
           anchorY: .5,
       }

        return defines;
    }



    createPreFadeIn(){
        const {
            textRijndael,
            textCipher
        } = this.getGlobalComponents()

        const obj = {val: 0}
        const tl = gsap.timeline()
        tl.to(obj, {val: 1, duration: .0001})
        tl.set([...textRijndael.chars, ...textCipher.chars], {pixi: {alpha: 0}})

        return tl;
    }

    createAnimationMain(){

        const {
            textRijndael,
            textCipher
        } = this.getGlobalComponents()

        const tl = gsap.timeline();
        tl.to([...textRijndael.chars, ...textCipher.chars], {pixi: {
            scale: 3,
         
        }, duration: .001,})
        tl.to(textRijndael.chars, { stagger: .2, pixi: { alpha: 1, scaleX: 1, scaleY: 1}});
        tl.to(textCipher.chars, { stagger: .2, pixi: { alpha: 1, scaleX: 1, scaleY: 1}})
        return tl;
    }
}

export default Page1DefaultResponsives