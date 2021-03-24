import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import Component from "../../components/Component"
import AnimatableText from "../../components/AnimatableText"

import DefaultResponsives from "./Responsives.default"

class Page1 extends AnimationPage{
    constructor(id){
        super(id);

        this.registerResponsive("default", DefaultResponsives) 
    }


    create(defines){

        const {baseTextStyles} = defines

        const background = this.createBackground();


        // create headline text
        const container = new Component();

        const textRijndael = new AnimatableText({text: "Rijndael", ...baseTextStyles})
        const textCipher = new AnimatableText({text: "Cipher", ...baseTextStyles})

        container.addChild(textRijndael, textCipher)


        this.addPermanent({background, container})
        this.addToGlobalComponents({textRijndael, textCipher})
    }

    drawPage(defines){
        const {background, container, textCipher, textRijndael} = this.globalComponents;

        const {backgroundStyles, containerPos} = defines


        background.redraw(backgroundStyles)

        textRijndael.redraw();
        textCipher.redraw()
        
       textCipher.position.set(container.width / 2, textRijndael.height)
       textCipher.pivot.set(textCipher.width / 2, 0)

       container.position.set(containerPos.x, containerPos.y)
       container.pivot.set(container.width / 2, container.height / 2)
    }
}


export default Page1;