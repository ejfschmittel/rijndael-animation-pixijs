import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import Component from "../../components/Component"
import Grid from "../../components/Grid"
import CircledText from "../../components/CircledText"

import AnimatableBackground from "../../components/AnimatableBackground"
import SBox from "../../components/SBox"
import {gsap} from "gsap"

import DataController from "../../core/DataController"

import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"

class Page7 extends AnimationPage{
    constructor(id){
        super(id);


        this.registerResponsive("max-400", ResponsiveMax400)
        this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }



    draw(defines){
        

        const {
            sBoxCellFontStyles,
            sBoxLegendFontStyles,
            sBoxStyles
        } = defines


        const background = this.drawBackground(0xaaaaaa)


        //const animatableBackgroundComponent = new AnimatableBackground(animatableBackground, animatableBackgroundBar, animatableBackgroundText)


  
        console.time("createSBox")
        const sbox = new SBox(sBoxStyles, sBoxLegendFontStyles, sBoxCellFontStyles)
        console.timeEnd("createSBox")
        this.positionComponent(sbox, sBoxStyles)
        //DataController.subscribe("sbox", sbox.grid.cells)

    
    

        this.addToRenderedComponents({
            sbox
        })

        this.addChild(
            background, 
            sbox,
        )

        
        this.sortableChildren = true



  
    }
}


export default Page7;