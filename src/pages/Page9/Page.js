import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"


import Grid from "../../components/Grid"


import AnimatableBackground from "../../components/AnimatableBackground"

import {gsap} from "gsap"

import DataController from "../../core/DataController"
import Component from "../../components/Component"
import CircledText from "../../components/CircledText"

import DefaultResponsives from "./Responsives.default"

import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"

class Page9 extends AnimationPage{
    constructor(id){
        super(id);


       // this.registerResponsive("max-400", ResponsiveMax400)
        //this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }




    draw(defines){
        

        const {
            stateGrid, 
            defaultCellStyles, 
            defaultCellSize,
            stateGridMovables, 
            animatableBackground,
            animatableBackgroundBar,
            animatableBackgroundText,
            resultMovables,
            equationPos,
        } = defines


        const defaultLanding = {
            ...defaultCellStyles,
            ...defaultCellSize,
        }

        const defaultMovables = {
            ...defaultCellStyles,
            ...defaultCellSize
        }

        const background = this.drawBackground(0xFF1900)


        const animatableBackgroundComponent = new AnimatableBackground(animatableBackground, animatableBackgroundBar, animatableBackgroundText)


      
        // create grid landings
        const stateGridComponent = new Grid(4,4, {...defaultLanding, ...stateGrid}, {})
        this.positionComponent(stateGridComponent, stateGrid)

        // create movables
        const stateGridMovableComponents = stateGridComponent.createMovables({...defaultMovables, ...stateGridMovables})
        DataController.subscribe("dummyGrid", stateGridMovableComponents.movables)

        // create result movables
        const resultGridMovableComponents = stateGridComponent.createMovables({...defaultMovables, ...resultMovables})
        DataController.subscribe("dummyGrid", resultGridMovableComponents.movables)
        



 
        // create equation
       
        const equation = new Component();


        
        const galoisFieldGrid = new Grid(4, 4, {...defaultLanding, fill: 0xffffff}, {})
        DataController.subscribe("galoisField", galoisFieldGrid.cells)

        const addSymbolComponent = new CircledText({fill: 0x000000, radius: 10}, {text: ""})
        addSymbolComponent.pivot.set(0, addSymbolComponent.height / 2)


        const rightAddGrid = new Grid(4, 1, defaultLanding, {})

        const equalsSymbol = new PIXI.Text("=", new PIXI.TextStyle({}))
        equalsSymbol.anchor.set(0, 1)

        const resultGrid = new Grid(4, 1, defaultLanding, {})


        equation.addChild(galoisFieldGrid, addSymbolComponent, rightAddGrid, equalsSymbol, resultGrid)

        let xPos = galoisFieldGrid.width + addSymbolComponent.width;
        addSymbolComponent.position.set(xPos, equation.height / 2 )

        xPos = xPos + addSymbolComponent.width
        rightAddGrid.position.set(xPos, 0)

        xPos = xPos + rightAddGrid.width + equalsSymbol.width
        equalsSymbol.position.set(xPos, equation.height / 2 )

        xPos = xPos + equalsSymbol.width * 2
        resultGrid.position.set(xPos, 0)

    
    
        this.positionComponent(equation, equationPos)

        this.addToRenderedComponents({
            stateGridComponent,
            stateGridMovableComponents,
            resultGridMovableComponents,
            animatableBackgroundComponent,
            equation,
            galoisFieldGrid,
            rightAddGrid,
            resultGrid,
            equalsSymbol,
            addSymbolComponent

        })

        this.addChild(
            background, 
            animatableBackgroundComponent,

            // normal compoents    
            stateGridComponent,
            equation,

            // movables
            ...stateGridMovableComponents.movables, 
            ...resultGridMovableComponents.movables
        )

        
        this.sortableChildren = true

        gsap.set(resultGridMovableComponents.movables, {pixi: {alpha: 0}})

        gsap.set([equalsSymbol, addSymbolComponent, galoisFieldGrid], {pixi: {alpha: 0}})
  
    }
}


export default Page9;