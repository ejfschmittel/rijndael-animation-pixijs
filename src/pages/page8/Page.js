import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import AnimatableBackground from "../../components/AnimatableBackground"
import Grid from "../../components/Grid2"
import PIXIText from "../../components/PIXIText"

import {gsap} from "gsap"


import DataController from "../../core/DataController"


import PageTimline from "./PageTimeline"
import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"
import HexadecimalTextBox from "../../components/HexadecimalTextBox.js"

class Page8 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimline(this);
      //  this.registerResponsive("max-400", ResponsiveMax400)
        this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }


    create(defines){
        const background = this.createBackground();
        
        // background 
        const animatableBackground = new AnimatableBackground("title", {})
        this.bindPageLocale("title", animatableBackground.title)

        // grid + movables
        const grid = new Grid(4,4, {},{})
        const movables = grid.createMovables()
        this.subscribeTo("after-sub-bytes-1", movables.movables)


        // texts
        const text1 = new PIXIText("rotateTextOne")
        this.bindPageLocale("rotateTextOne",text1)

        const text2 = new PIXIText("rotateTextTwo")
        this.bindPageLocale("rotateTextTwo",text2)

        const text3 = new PIXIText("rotateTextThree")
        this.bindPageLocale("rotateTextThree",text3)

      
        this.addPermanent({background,animatableBackground, grid, text1, text2, text3})
        this.addChild(...movables.movables)
        this.addToGlobalComponents({movablesCollector: movables})

        this.sortableChildren = true;
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, animatableBackground,
        } = this.globalComponents

        // background redraw
        const { backgroundStyles,movablesStyles} = defines
        background.redraw(backgroundStyles)

        // redraw animatable background
        const {
            animatableBackgroundStyles: abStyles,
            animatableBackgroundTitleStyles: abTitleStyles,
            animatableBackgroundBarStyles: abBarStyles,
        } = defines

        animatableBackground.redraw(abStyles,abBarStyles,abTitleStyles)


        // redraw grid & movables
        const { grid, movablesCollector} = this.globalComponents;
        const {gridStyles} = defines;
        grid.redraw(gridStyles, {})
        grid.position.set(gridStyles.x, gridStyles.y)
        grid.pivot.set(grid.width /2, 0)


        movablesCollector.movables.forEach((movable, idx) => {
            const {x,y,width, height}= grid.cells[idx].getBounds()
            movable.redraw({width, height, ...movablesStyles},{});
            movable.position.set(x, y)
        })


        // redraw text
        const {text1Styles,text2Styles,text3Styles} = defines;
        const {text1, text2, text3} = this.globalComponents;
        text1.redraw(text1Styles)
        text2.redraw(text2Styles)
        text3.redraw(text3Styles)   
    }
}


export default Page8;