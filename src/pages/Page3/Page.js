import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import Arrow, {ARROW_ORIENTATION} from "../../components/Arrow"

import Grid2 from "../../components/Grid2"

import CircledText from "../../components/CircledText";



import {gsap} from "gsap"

import DataController from "../../core/DataController"


import PageTimeline from "./PageTimeline"
import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"
import HexadecimalTextBox from "../../components/HexadecimalTextBox.js"

class Page3 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimeline(this)
      //  this.registerResponsive("max-400", ResponsiveMax400)
        this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }


    create(defines){
        const background = this.createBackground();

        const textStyle = {fill: 0xffffff}

        // title
        const title = new PIXI.Text("title", {...textStyle, fontSize: 60})
        this.bindPageLocale("title",title)
        title.anchor.set(.5, .5)

        /* left side */
        const subtitleLeft = new PIXI.Text("subtitleLeft", {...textStyle, fontSize: 36})
        this.bindPageLocale("subtitleLeft",subtitleLeft)
        subtitleLeft.anchor.set(.5, .5)

        const gridLeft = new Grid2(4,4, {}, {})
        this.subscribeTo("initial-state", gridLeft.cells)
     

        const arrowLeft = new Arrow({orientation: ARROW_ORIENTATION.DOWN})  

        const textLeft = new PIXI.Text("textLeft", {fill: 0xD47F00, align: "center", fontWeight: "500"})
        this.bindPageLocale("textLeft",textLeft)
        textLeft.anchor.set(.5, 0)

        const circleLeft = new CircledText("A", {fontSize: 30, fill: 0xffffff})


        /* right side */
        const subtitleRight = new PIXI.Text("subtitleRight", {...textStyle, fontSize: 36})
        this.bindPageLocale("subtitleRight",subtitleRight)
        subtitleRight.anchor.set(.5)

        const gridRight = new Grid2(4,4, {}, {})
        this.subscribeTo("key-0", gridRight.cells)

        const arrowRight = new Arrow({orientation: ARROW_ORIENTATION.DOWN})  

        const textRight = new PIXI.Text("textRight", {fill: 0x5787E1, align: "center", fontWeight: "500"})
        this.bindPageLocale("textRight",textRight)
        textRight.anchor.set(.5, 0)

        const circleRight = new CircledText("B", {fontSize: 30, fill: 0xffffff})
        
        this.addPermanent({background, title, subtitleLeft, gridLeft, subtitleRight, gridRight, arrowLeft, arrowRight, textRight, textLeft, circleLeft, circleRight})

       
    }

    drawPage(defines){
    

        // redraw title & background
        const { titleStyles, backgroundStyles, animationDimensions} = defines
        const { background, title, } = this.globalComponents
        background.redraw(backgroundStyles)

        title.scale.set(titleStyles.scale)
        title.position.set(animationDimensions.width / 2, 50)

        const {subtitleStyles, arrowStyles, gridStyles} = defines;
        // redraw left side
        const {textLeftPos, leftGridPos, arrowLeftPos, subtitleLeftStyles} = defines
        const {subtitleLeft, gridLeft, textLeft, arrowLeft, circleLeft} = this.globalComponents;
        subtitleLeft.scale.set(subtitleStyles.scale)
        subtitleLeft.position.set(subtitleLeftStyles.x, subtitleLeftStyles.y)

        gridLeft.redraw({...gridStyles, fill: 0xFFF995})
        gridLeft.position.set(leftGridPos.x, subtitleLeft.y + subtitleLeft.height + leftGridPos.yDistance)
        gridLeft.pivot.set(gridLeft.width / 2 , 0)

        arrowLeft.redraw(arrowStyles)
        arrowLeft.pivot.set(arrowLeft.width/2, 0)    
        arrowLeft.position.set(arrowLeftPos.x, gridLeft.y + gridLeft.height + arrowLeftPos.yDistance)

        textLeft.position.set(textLeftPos.x, arrowLeft.y + arrowLeft.height + textLeftPos.yDistance)

        circleLeft.redraw({borderColor: 0xffffff, borderWidth: 3.2 }, {})
        circleLeft.position.set(arrowLeftPos.x, textLeft.y + textLeft.height + circleLeft.height /2 + 10)



        // redraw right side
        const {textRightPos, rightGridPos, arrowRightPos, subtitleRightStyles} = defines
        const {subtitleRight, gridRight, textRight, arrowRight, circleRight} = this.globalComponents;
        subtitleRight.scale.set(subtitleStyles.scale)
        subtitleRight.position.set(subtitleRightStyles.x, subtitleRightStyles.y)

        gridRight.redraw({...gridStyles, fill: 0x008FFF})
        gridRight.position.set(rightGridPos.x, subtitleRight.y + subtitleRight.height + rightGridPos.yDistance)
        gridRight.pivot.set(gridRight.width / 2 , 0)

        
        arrowRight.redraw(arrowStyles)
        arrowRight.pivot.set(arrowRight.width/2, 0)    
        arrowRight.position.set(arrowRightPos.x, gridRight.y + gridRight.height +arrowRightPos.yDistance)

        textRight.position.set(textRightPos.x, arrowRight.y + arrowRight.height + textRightPos.yDistance)

        circleRight.redraw({borderColor: 0xffffff, borderWidth: 3.2 }, {})
        circleRight.position.set(arrowRight.x, textRight.y + textRight.height + circleRight.height /2 + 10)


       
        
    }
}


export default Page3;