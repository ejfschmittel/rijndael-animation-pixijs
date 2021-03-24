import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"
import HexadecimalGrid from "../../components/HexadecimalGrid"
import Component from "../../components/Component"
import AnimatableText from "../../components/AnimatableText"
import Arrow, {ARROW_ORIENTATION} from "../../components/Arrow"
import CircledText from "../../components/CircledText"
import Grid2 from "../../components/Grid2"
import {gsap} from "gsap"

import DataController from "../../core/DataController"


import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"
import HexadecimalTextBox from "../../components/HexadecimalTextBox.js"

class Page1 extends AnimationPage{
    constructor(id){
        super(id);


      //  this.registerResponsive("max-400", ResponsiveMax400)
       // this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }


    create(defines){
        const background = this.createBackground();

        const textStyle = {fill: 0xffffff}

        // title
        const title = new PIXI.Text("Input", {...textStyle, fontSize: 60})
        title.anchor.set(.5, .5)

        /* left side */
        const subtitleLeft = new PIXI.Text("State", {...textStyle,})
        subtitleLeft.anchor.set(.5, .5)

        const gridLeft = new Grid2(4,4, {}, {})
        DataController.subscribe("dummyGrid", gridLeft.cells)

        const textLeft = new PIXI.Text("to\nEncryption\nProcess", {fill: 0xffff00, align: "center"})
        textLeft.anchor.set(.5, 0)


        /* right side */
        const subtitleRight = new PIXI.Text("Cipher", {...textStyle,})
        subtitleRight.anchor.set(.5)

        const gridRight = new Grid2(4,4, {}, {})
        DataController.subscribe("dummyGrid", gridRight.cells)

        const textRight = new PIXI.Text("to\nKey\nSchedule", {fill: 0xffff00, align: "center"})
        textRight.anchor.set(.5, 0)

        
        this.addPermanent({background, title, subtitleLeft, gridLeft, subtitleRight, gridRight, textRight, textLeft})

       
    }

    drawPage(defines){
        const {background, title, subtitleLeft, gridLeft,gridRight, subtitleRight, textLeft, textRight} = this.globalComponents
        const {
            
            animationDimensions, backgroundStyles, subtitleRightStyles, gridStyles, rightGridPos, leftGridPos, subtitleLeftStyles,

            arrowRightPos, arrowLeftPos, arrowStyles,
            textLeftPos, textRightPos
        } = defines

        background.redraw(backgroundStyles)

        title.scale.set(1)
        title.position.set(animationDimensions.width / 2, 50)


        // left side
        subtitleLeft.scale.set(1.2)
        subtitleLeft.position.set(subtitleLeftStyles.x, subtitleLeftStyles.y)

        gridLeft.redraw({gridStyles, fill: 0xFFF995})
        gridLeft.position.set(leftGridPos.x, subtitleLeft.y + subtitleLeft.height + leftGridPos.yDistance)
        gridLeft.pivot.set(gridLeft.width / 2 , 0)

        const leftArrow = new Arrow({orientation: ARROW_ORIENTATION.DOWN, ...arrowStyles})  
        leftArrow.pivot.set(leftArrow.width/2, 0)    
        leftArrow.position.set(arrowLeftPos.x, gridLeft.y + gridLeft.height + arrowLeftPos.yDistance)

        textLeft.position.set(textLeftPos.x, leftArrow.y + leftArrow.height + textLeftPos.yDistance)


        // right side
        subtitleRight.scale.set(1.2)
        subtitleRight.position.set(subtitleRightStyles.x, subtitleRightStyles.y)

        gridRight.redraw({gridStyles, fill: 0x008FFF})
        gridRight.position.set(rightGridPos.x, subtitleRight.y + subtitleRight.height + rightGridPos.yDistance)
        gridRight.pivot.set(gridRight.width / 2 , 0)


        const rightArrow = new Arrow({orientation: ARROW_ORIENTATION.DOWN, ...arrowStyles})  
        rightArrow.pivot.set(rightArrow.width/2, 0)    
        rightArrow.position.set(arrowRightPos.x, gridRight.y + gridRight.height +arrowRightPos.yDistance)

        textRight.position.set(textRightPos.x, rightArrow.y + rightArrow.height + textRightPos.yDistance)


        this.addTemporary({leftArrow, rightArrow})
        
    }
}


export default Page1;