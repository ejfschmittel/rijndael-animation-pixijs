import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import Arrow, {ARROW_ORIENTATION} from "../../components/Arrow"

import Grid2 from "../../components/Grid2"

import CircledText from "../../components/CircledText";



import {gsap} from "gsap"

import DataController from "../../core/DataController"


import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"
import HexadecimalTextBox from "../../components/HexadecimalTextBox.js"

class Page4 extends AnimationPage{
    constructor(id){
        super(id);


      //  this.registerResponsive("max-400", ResponsiveMax400)
        this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }


    create(defines){
        const background = this.createBackground();


          
        const circledChar = new CircledText("A", {fontSize: 30, fill: 0xffffff})

        // title
        const title = new PIXI.Text("Encryption\nProcess", {fill: 0xFF9906, fontSize: 40, align: "center"})
        title.anchor.set(.5, .5)


        const textString = `(Performing the encryption of the\ngiven plaintext block using 4 different\ntransformations in the initial round,\nthe 9 main rounds and the final round)`

        const text = new PIXI.Text(textString, {fontSize: 18, fill: 0xffffff})
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


export default Page4;