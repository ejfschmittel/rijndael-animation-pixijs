import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import Component from "../../components/Component"
import AnimatableText from "../../components/AnimatableText"

import {gsap} from "gsap"


import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"

class Page1 extends AnimationPage{
    constructor(id){
        super(id);


      //  this.registerResponsive("max-400", ResponsiveMax400)
       // this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }


    create(defines){

        const {baseTextStyles} = defines

        const background = this.createBackground();

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


    draw(defines){
        const { 
            containerPos, 
            defaultTitleStyles,
            rijndaelTextStyles,
            cipherTextStyles
        } = defines


        const background = this.drawBackground(0x000000)

  


        
        const container = new Component();

       

   
       // const textStyle = new PIXI.TextStyle(defaultTitleStyles)
        const textRijndael = new AnimatableText({...rijndaelTextStyles, ...defaultTitleStyles})
        const textCipher = new AnimatableText({...cipherTextStyles, ...defaultTitleStyles})

        container.addChild(textRijndael, textCipher)
        this.positionComponent(container, containerPos)

        // position text center
        textCipher.position.set(container.width / 2, textRijndael.height)
        textCipher.pivot.set(textCipher.width /2, 0)

    
    

        this.addToRenderedComponents({
            container,
            textRijndael,
            textCipher,
        })

        this.addChild(
        background,
          container
        )

        gsap.set([...textCipher.chars, ...textRijndael.chars], {pixi: {alpha: 0}})
    }
}


export default Page1;