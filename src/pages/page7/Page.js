import AnimationPage from "../../core/AnimationPage.js"
import PageTimeline from "./PageTimeline"
import * as PIXI from "pixi.js"

import AnimatableBackground from "../../components/AnimatableBackground"

import SBox from "../../components/SBox2"
import Grid from "../../components/Grid2"
import TextBox from "../../components/TextBox2"
import {gsap} from "gsap"
import DataController from "../../core/DataController"



import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"
import HexadecimalTextBox from "../../components/HexadecimalTextBox.js"

class Page7 extends AnimationPage{
    constructor(){
        super();


        this.timeline = new PageTimeline(this)
        this.registerResponsive("max-400", ResponsiveMax400)
        this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }


    create(defines){
        const background = this.createBackground();
        
        const animatableBackground = new AnimatableBackground("title", {})


        this.bindPageLocale("title", animatableBackground.title)

        const sbox = new SBox()
        this.subscribeTo("sbox", sbox.grid.cells)
        const {sBoxPos, sBoxStyles, sboxLegendStyles, sBoxTextStyles} = defines
        sbox.redraw(sBoxStyles, sboxLegendStyles, sBoxTextStyles);

        const textBox = new TextBox()

        const grid = new Grid(4,4, {},{})
        const stateMovables = grid.createMovables()
        const resultMovables = grid.createMovables();

        
        this.subscribeTo("after-initial-round", resultMovables.movables)
        this.subscribeTo("after-sub-bytes-1", stateMovables.movables)
      
        this.addPermanent({background,animatableBackground,sbox, grid, textBox})

        this.addChild(...stateMovables.movables, ...resultMovables.movables)

        this.addToGlobalComponents({stateMovables, resultMovables})
       
        this.sortableChildren = true;
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, animatableBackground, sbox, grid, textBox
        } = this.globalComponents

        // background redraw
        const { backgroundStyles} = defines
        background.redraw(backgroundStyles)


        // animatable background
        const {
            animatableBackgroundStyles: abStyles,
            animatableBackgroundTitleStyles: abTitleStyles,
            animatableBackgroundBarStyles: abBarStyles,
        } = defines

        animatableBackground.redraw(abStyles,abBarStyles,abTitleStyles)



        const {sBoxPos, sBoxStyles, sboxLegendStyles, sBoxTextStyles} = defines
        sbox.redraw(sBoxStyles, sboxLegendStyles, sBoxTextStyles);    
        sbox.pivot.set(sBoxStyles.width, sBoxStyles.height)
        sbox.position.set(sBoxPos.x, sBoxPos.y)


        const {textBoxStyle} = defines;
        textBox.redraw(textBoxStyle, {})
        textBox.position.set(sbox.x - sBoxStyles.width / 2, sbox.y - sBoxStyles.height - textBox.height -10)
        textBox.pivot.set(textBox.width/2, 0)


        const {gridStyles} = defines
        grid.redraw(gridStyles);
        grid.position.set(gridStyles.x, gridStyles.y)
        grid.pivot.set(grid.width/2, grid.height/2)


        const {stateMovables} = this.globalComponents;
        const {stateMovableStyles} = defines
        stateMovables.movables.forEach((movable, idx) => {
            const {x,y,width, height}= grid.cells[idx].getBounds()
            movable.redraw({width, height, ...stateMovableStyles},{});
            movable.position.set(x, y)
        })

        const {resultMovables} = this.globalComponents;
        const {resultMovablesStyles} = defines
        resultMovables.movables.forEach((movable, idx) => {
            const {x,y,width, height}= grid.cells[idx].getBounds()
            movable.redraw({width, height, ...resultMovablesStyles},{});
            movable.position.set(x, y)
        })



        

        
  
    }
}


export default Page7;