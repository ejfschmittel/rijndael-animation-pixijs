import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import CircledText from "../../components/CircledText";

import {gsap} from "gsap"

import DefaultResponsives from "./Responsives.default"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"


class Page13 extends AnimationPage{
    constructor(id, locale){
        super(id, locale);

        this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)
        
    }


    create(defines){
        const background = this.createBackground();

        // create circled char
        const circledChar = new CircledText("B", {fontSize: 30, fill: 0xffffff})

        // create title
        const title = new PIXI.Text(this.text("title"), {fill: 0x2184EE, fontSize: 40, align: "center"})
        title.anchor.set(.5, .5)

        // create text
      
        const text = new PIXI.Text(this.text("text"), {fontSize: 18, fill: 0xffffff})
        text.anchor.set(.5, .5)
   
        this.addPermanent({background, circledChar, title, text})
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, title, circledChar, text,
        } = this.globalComponents

        // destructure defines
        const {
            backgroundStyles,
            circledCharStyles, 
            titleStyles,
            textStyles,
        } = defines

        background.redraw(backgroundStyles)

        circledChar.redraw({radius: 30, borderColor: 0xffffff}, 1)
        circledChar.position.set(circledCharStyles.x, circledCharStyles.y)

        title.position.set(titleStyles.x, circledChar.y + circledChar.height + titleStyles.yDistance)

        text.style.fontSize = textStyles.fontSize
        text.position.set(textStyles.x, title.position.y + title.height + textStyles.yDistance)
         
    }
}


export default Page13;