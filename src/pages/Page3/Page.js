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

class Page1 extends AnimationPage{
    constructor(id, locale){
        super(id, locale);


      //  this.registerResponsive("max-400", ResponsiveMax400)
        this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }


    create(defines){
        const background = this.createBackground();

        const textStyle = {fill: 0xffffff}

        // title
        const title = new PIXI.Text(this.text("title"), {...textStyle, fontSize: 60})
        title.anchor.set(.5, .5)

        /* left side */
        const subtitleLeft = new PIXI.Text(this.text("subtitleLeft"), {...textStyle, fontSize: 36})
        subtitleLeft.anchor.set(.5, .5)

        const gridLeft = new Grid2(4,4, {}, {})
        DataController.subscribe("dummyGrid", gridLeft.cells)

        const textLeft = new PIXI.Text(this.text("textLeft"), {fill: 0xD47F00, align: "center", fontWeight: "500"})
        textLeft.anchor.set(.5, 0)

        const leftCircle = new CircledText("A", {fontSize: 30, fill: 0xffffff})


        /* right side */
        const subtitleRight = new PIXI.Text(this.text("subtitleRight"), {...textStyle, fontSize: 36})
        subtitleRight.anchor.set(.5)

        const gridRight = new Grid2(4,4, {}, {})
        DataController.subscribe("dummyGrid", gridRight.cells)

        const textRight = new PIXI.Text(this.text("textRight"), {fill: 0x5787E1, align: "center", fontWeight: "500"})
        textRight.anchor.set(.5, 0)

        const rightCircle = new CircledText("B", {fontSize: 30, fill: 0xffffff})
        
        this.addPermanent({background, title, subtitleLeft, gridLeft, subtitleRight, gridRight, textRight, textLeft, leftCircle, rightCircle})

       
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, title, 
            subtitleLeft, gridLeft,textLeft, leftCircle,
            gridRight, subtitleRight,  textRight, rightCircle
        } = this.globalComponents

        // destructure defines
        const {
            titleStyles,
            subtitleStyles,
            animationDimensions, backgroundStyles, subtitleRightStyles, gridStyles, rightGridPos, leftGridPos, subtitleLeftStyles,

            arrowRightPos, arrowLeftPos, arrowStyles,
            textLeftPos, textRightPos
        } = defines

        background.redraw(backgroundStyles)

        title.scale.set(titleStyles.scale)
        title.position.set(animationDimensions.width / 2, 50)


        // left side
        subtitleLeft.scale.set(subtitleStyles.scale)
        subtitleLeft.position.set(subtitleLeftStyles.x, subtitleLeftStyles.y)

        gridLeft.redraw({...gridStyles, fill: 0xFFF995})
        gridLeft.position.set(leftGridPos.x, subtitleLeft.y + subtitleLeft.height + leftGridPos.yDistance)
        gridLeft.pivot.set(gridLeft.width / 2 , 0)

        const leftArrow = new Arrow({orientation: ARROW_ORIENTATION.DOWN, ...arrowStyles})  
        leftArrow.pivot.set(leftArrow.width/2, 0)    
        leftArrow.position.set(arrowLeftPos.x, gridLeft.y + gridLeft.height + arrowLeftPos.yDistance)

        textLeft.position.set(textLeftPos.x, leftArrow.y + leftArrow.height + textLeftPos.yDistance)

        leftCircle.redraw({borderColor: 0xffffff, borderWidth: 3.2 }, {})
        leftCircle.position.set(arrowLeftPos.x, textLeft.y + textLeft.height + leftCircle.height /2 + 10)


        // right side
        subtitleRight.scale.set(subtitleStyles.scale)
        subtitleRight.position.set(subtitleRightStyles.x, subtitleRightStyles.y)

        gridRight.redraw({...gridStyles, fill: 0x008FFF})
        gridRight.position.set(rightGridPos.x, subtitleRight.y + subtitleRight.height + rightGridPos.yDistance)
        gridRight.pivot.set(gridRight.width / 2 , 0)


        const rightArrow = new Arrow({orientation: ARROW_ORIENTATION.DOWN, ...arrowStyles})  
        rightArrow.pivot.set(rightArrow.width/2, 0)    
        rightArrow.position.set(arrowRightPos.x, gridRight.y + gridRight.height +arrowRightPos.yDistance)

        textRight.position.set(textRightPos.x, rightArrow.y + rightArrow.height + textRightPos.yDistance)

        rightCircle.redraw({borderColor: 0xffffff, borderWidth: 3.2 }, {})
        rightCircle.position.set(rightArrow.x, textRight.y + textRight.height + rightCircle.height /2 + 10)


        this.addTemporary({leftArrow, rightArrow})
        
    }
}


export default Page1;