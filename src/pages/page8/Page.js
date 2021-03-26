import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import AnimatableBackground from "../../components/AnimatableBackground"
import Grid from "../../components/Grid2"

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
        
        const animatableBackground = new AnimatableBackground("2 - Shift Rows", {})


   
        const grid = new Grid(4,4, {},{})
        
        const movables = grid.createMovables()
        
     
        DataController.subscribe("dummyGrid", movables.movables)




        const textBaseStyle = new PIXI.TextStyle({fill: 0xffffff, fontSize: 30})


        const textContainer1 = new PIXI.Container();
        const text1 = new PIXI.Text("rotate over 1 byte", textBaseStyle)
        textContainer1.addChild(text1)

        const textContainer2 = new PIXI.Container();
        const text2 = new PIXI.Text("rotate over 2 bytes", textBaseStyle)
        textContainer2.addChild(text2)

        const textContainer3 = new PIXI.Container();
        const text3 = new PIXI.Text("rotate over 3 bytes", textBaseStyle)
        textContainer3.addChild(text3)

      
      
        this.addPermanent({background,animatableBackground, grid, textContainer1, textContainer2, textContainer3})

        this.addChild(...movables.movables)
        this.addToGlobalComponents({movablesCollector: movables})

        this.sortableChildren = true;
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, animatableBackground,
            grid, movablesCollector,
            textContainer1, textContainer2, textContainer3
        } = this.globalComponents

        // background redraw
        const { backgroundStyles, gridStyles, movablesStyles} = defines
        background.redraw(backgroundStyles)


        // animatable background
        const {
            animatableBackgroundStyles: abStyles,
            animatableBackgroundTitleStyles: abTitleStyles,
            animatableBackgroundBarStyles: abBarStyles,
        } = defines

        animatableBackground.redraw(abStyles,abBarStyles,abTitleStyles)


        grid.redraw(gridStyles, {})
        grid.position.set(gridStyles.x, gridStyles.y)
        grid.pivot.set(grid.width /2, 0)



        movablesCollector.movables.forEach((movable, idx) => {
            const {x,y,width, height}= grid.cells[idx].getBounds()
            movable.redraw({width, height, ...movablesStyles},{});
            movable.position.set(x, y)
        })


        const {text1Pos} = defines;
        textContainer1.position.set(text1Pos.x, text1Pos.y)

        const {text2Pos} = defines;
        textContainer2.position.set(text2Pos.x, text2Pos.y)

        const {text3Pos} = defines;
        textContainer3.position.set(text3Pos.x, text3Pos.y)




        
    }
}


export default Page4;