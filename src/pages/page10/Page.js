import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import AnimatableBackground from "../../components/AnimatableBackground"


import {gsap} from "gsap"
import Grid from "../../components/Grid2"

import DataController from "../../core/DataController"
import CircledText from "../../components/CircledText"
import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"
import HexadecimalTextBox from "../../components/HexadecimalTextBox.js"

class Page4 extends AnimationPage{
    constructor(id, locale){
        super(id, locale);


        this.registerResponsive("max-400", ResponsiveMax400)
        this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }


    create(defines){
        const background = this.createBackground();
        
        const animatableBackground = new AnimatableBackground(this.text("title"), {})


        const stateGrid = new Grid(4,4,{},{})
        const stateMovables = stateGrid.createMovables();
        const resultMovables = stateGrid.createMovables();

        const roundKeyGrid = new Grid(4,4, {}, {})
        const roundKeyMovables = roundKeyGrid.createMovables();


        DataController.subscribe("dummyGrid", stateMovables.movables)
        DataController.subscribe("dummyGrid", resultMovables.movables)
        DataController.subscribe("dummyGrid", roundKeyMovables.movables)


        const equationContainer = new PIXI.Container();


        const columnLanding1 = new Grid(4,1, {}, {})
        const addSign = new CircledText("+", {fontSize: 30, fill: 0x333333, fontWeight: "700"})
        const columnLanding2 = new Grid(4,1, {}, {})
        const equalsSign = new PIXI.Text("=", {fontSize: 30})
        equalsSign.anchor.set(.5,.5)
        const columnResult = new Grid(4,1, {}, {})



        equationContainer.addChild(columnLanding1, addSign, columnLanding2, equalsSign, columnResult)



        // equation 

      
        this.addPermanent({background,animatableBackground, stateGrid, roundKeyGrid, equationContainer})
        this.addChild(...stateMovables.movables, ...resultMovables.movables, ...roundKeyMovables.movables)
        this.addToGlobalComponents({columnLanding1, addSign, columnLanding2, equalsSign, columnResult, stateMovables, roundKeyMovables, resultMovables})
       
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, animatableBackground,

            stateGrid, roundKeyGrid, 
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


        const {gridStyles, gridTextStyles, roundKeyGridPos, stateGridPos} = defines 

        stateGrid.redraw(gridStyles, gridTextStyles);
        stateGrid.position.set(stateGridPos.x, stateGridPos.y)
        stateGrid.pivot.set(stateGrid.width/2, stateGrid.height/2)

        roundKeyGrid.redraw(gridStyles, gridTextStyles);
        roundKeyGrid.position.set(roundKeyGridPos.x, roundKeyGridPos.y)
        roundKeyGrid.pivot.set(roundKeyGrid.width/2, roundKeyGrid.height/2)


        // equation redraw
        const {columnLanding1, addSign, columnLanding2, equalsSign, columnResult, equationContainer} = this.globalComponents;
        const {columnStyles, equationPos,} = defines;

        columnLanding1.redraw(columnStyles, {})
        columnLanding2.redraw(columnStyles, {})
        columnResult.redraw(columnStyles, {})
      //  addSign.redraw({radius: 20, borderWidth: 2, borderColor: 0x000000 }, {scale: 1, fill: 0x000000})
        addSign.redraw({borderColor: 0x333333, borderWidth: 2.81, radius: 16 }, {})

        addSign.position.set(columnLanding1.width + addSign.width, columnLanding1.height/2)
        columnLanding2.position.set(addSign.x + addSign.width, 0)
        equalsSign.position.set(columnLanding2.x + columnLanding2.width + equalsSign.width, columnLanding1.height/2)
        columnResult.position.set(equalsSign.x + equalsSign.width, 0)
           
        equationContainer.position.set(equationPos.x, equationPos.y)
        equationContainer.pivot.set(equationContainer.width/2, equationContainer.height/2)



        // movables
        const {stateMovables} = this.globalComponents;
        const {stateGridStyles} = defines;
        stateMovables.movables.forEach((movable, idx) => {
            const {x,y,width, height} = stateGrid.cells[idx].getBounds()
            movable.redraw({width, height, ...stateGridStyles},gridTextStyles);
            movable.position.set(x, y)
        })

      const {resultMovables} = this.globalComponents;
        const {resultGridStyles} = defines
        resultMovables.movables.forEach((movable, idx) => {
            const {x,y,width, height} = stateGrid.cells[idx].getBounds()
            movable.redraw({width, height, ...resultGridStyles},gridTextStyles);
            movable.position.set(x, y)
        })

        const {roundKeyMovables} = this.globalComponents;
        const {roundKeyGridStyles} = defines
        roundKeyMovables.movables.forEach((movable, idx) => {
            const {x,y,width, height} = roundKeyGrid.cells[idx].getBounds()
            movable.redraw({width, height, ...roundKeyGridStyles},gridTextStyles);
            movable.position.set(x, y)
        })

   

        

        
  
    }
}


export default Page4;