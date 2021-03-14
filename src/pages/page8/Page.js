import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"


import Grid from "../../components/Grid"


import AnimatableBackground from "../../components/AnimatableBackground"

import {gsap} from "gsap"

import DataController from "../../core/DataController"



import DefaultResponsives from "./Responsives.default"

import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"

class Page8 extends AnimationPage{
    constructor(id){
        super(id);


        this.registerResponsive("max-400", ResponsiveMax400)
        this.registerResponsive("max-600", ResponsiveMax600)
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
            text1,
            text2,
            text3,
            defaultFontStyles
        } = defines


        const defaultLanding = {
            ...defaultCellStyles,
            ...defaultCellSize,
        }

        const defaultMovables = {
            ...defaultCellStyles,
            ...defaultCellSize
        }

        const background = this.drawBackground(0xaaaaaa)


        const animatableBackgroundComponent = new AnimatableBackground(animatableBackground, animatableBackgroundBar, animatableBackgroundText)


      
        const stateGridComponent = new Grid(4,4, {...defaultLanding, ...stateGrid}, {})
        this.positionComponent(stateGridComponent, stateGrid)

        const stateGridMovableComponents = stateGridComponent.createMovables({...defaultMovables, ...stateGridMovables})
        DataController.subscribe("dummyGrid", stateGridMovableComponents.movables)




        // text 

        const textStyles = new PIXI.TextStyle(defaultFontStyles);
        const text1Component = new PIXI.Text("rotate over 1 byte", textStyles)
        const text2Component = new PIXI.Text("rotate over 2 bytes", textStyles)
        const text3Component = new PIXI.Text("rotate over 3 bytes", textStyles)


        text1Component.anchor.set(0, .5)  
        text2Component.anchor.set(0, .5)
        text3Component.anchor.set(0, .5)
        text1Component.position.set(text1.x, text1.y)
        text2Component.position.set(text2.x, text2.y)
        text3Component.position.set(text3.x, text3.y)

       


    
    

        this.addToRenderedComponents({
            stateGridComponent,
            stateGridMovableComponents,
            animatableBackgroundComponent,
            text1Component,
            text2Component,
            text3Component
        })

        this.addChild(
            background, 
            animatableBackgroundComponent,

            // normal compoents    
            stateGridComponent,
            text1Component,
            text2Component,
            text3Component,

            // movables
            ...stateGridMovableComponents.movables, 
        )

        
        this.sortableChildren = true


        gsap.set([text1Component, text2Component, text3Component], {pixi: {alpha: 0}})
  
    }
}


export default Page8;