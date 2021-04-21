import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import Component from "../../components/Component"
import AnimatableText from "../../components/AnimatableText"


import PageTimeline from "./PageTimeline"
import DefaultResponsives from "./Responsives.default"



class Page1 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimeline(this);
        this.registerResponsive("default", DefaultResponsives) 
    }


    create(defines){

        const {baseTextStyles} = defines

        const background = this.createBackground();

    
    
 
        const subtitle = new PIXI.Text("test", {fill: 0xffffff, wordWrap: true, wordWrapWidth: 320, fontSize: 22})
        this.bindPageLocale("text", subtitle)


        
        



        // create headline text
        const container = new Component();

        const textRijndael = new AnimatableText("Rijndael" ,baseTextStyles)
        this.bindPageLocale("titlePartOne", textRijndael)

        const textCipher = new AnimatableText("Cipher", baseTextStyles)
        this.bindPageLocale("titlePartOne", textRijndael)

        container.addChild(textRijndael, textCipher)


        //this.addPermanent({background, container})
        this.addToGlobalComponents({textRijndael,textCipher})
        this.addPermanent({background, subtitle, container})
    }


    drawPage(defines){

        const {background, container, textCipher, textRijndael, subtitle} = this.globalComponents;

        const {backgroundStyles, containerPos} = defines

        // background
        background.redraw({...backgroundStyles, fill: this.getColor("--page-background-alpha")})

        // headline
        textRijndael.redraw();
        textCipher.redraw()
        
        textCipher.position.set(container.width / 2, textRijndael.height)
        textCipher.pivot.set(textCipher.width / 2, 0)

        container.position.set(containerPos.x, containerPos.y)
        container.pivot.set(container.width / 2, container.height)

        // subtitle
        const {subtitleStyles} = defines
        this.updateFontStyle(subtitle, subtitleStyles)
        subtitle.position.set(subtitleStyles.position.x, container.y + container.height)

    }
}


export default Page1;