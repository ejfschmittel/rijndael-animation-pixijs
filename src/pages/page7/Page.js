import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import Component from "../../components/Component"
import Grid from "../../components/Grid"
import CircledText from "../../components/CircledText"

import AnimatableBackground from "../../components/AnimatableBackground"

import {gsap} from "gsap"



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
            stateGrid, roundKeyCell, equationPos, addSymbol, defaultCellStyles, defaultCellSize,
            stateGridMovables, roundKeyGridMovables,

            animatableBackground,
            animatableBackgroundBar,
            animatableBackgroundText
            //roundKeyRect, stateRect, stateMovables, equationPos, addSymbol
        
        
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
        stateGridMovableComponents.movables.forEach((cell, idx) => {
            cell.updateContent(idx)
        })

        const resultMovableComponents = stateGridComponent.createMovables({...defaultMovables, fill: 0xff0000})
        resultMovableComponents.movables.forEach((cell, idx) => {
            cell.updateContent(idx-1)
        })

       const roundKeyGrid  = new Grid(4,4, {...defaultLanding}, {})
        this.positionComponent(roundKeyGrid, roundKeyCell)

        const roundKeyMovableComponents = roundKeyGrid.createMovables({...defaultMovables, ...roundKeyGridMovables})
        roundKeyMovableComponents.movables.forEach((cell, idx) => {
            cell.updateContent(idx)
        })



        // equation
        const equation = new Component()


        const leftAddGrid = new Grid(4, 1, defaultLanding, {})
        const addSymbolComponent = new CircledText(addSymbol,{text: "+"})
        const rightAddGrid = new Grid(4, 1, defaultLanding, {})

        const equalsSymbol = new PIXI.Text("=", new PIXI.TextStyle({}))
        equalsSymbol.anchor.set(0,.5)
        const resultGrid = new Grid(4, 1, defaultLanding, {})

      

      
        let xSpace = 0;
        xSpace = leftAddGrid.width + addSymbolComponent.width * 0.5 + 10;
        addSymbolComponent.position.set(leftAddGrid.width + addSymbolComponent.width ,leftAddGrid.height/2)

        xSpace = xSpace + addSymbolComponent.width * 0.5 +30;
        rightAddGrid.position.set(xSpace,0)

        xSpace = xSpace + rightAddGrid.width + 20;
        equalsSymbol.position.set(xSpace,leftAddGrid.height/2)

        xSpace = xSpace + equalsSymbol.width + 10;
        resultGrid.position.set(xSpace, 0)
        

        equation.addChild(leftAddGrid,addSymbolComponent, rightAddGrid, equalsSymbol, resultGrid)
        this.positionComponent(equation, equationPos)


       


    
    

        this.addToRenderedComponents({
            stateGridComponent,
            roundKeyGrid,
            equation,
            stateGridMovableComponents,
            roundKeyMovableComponents,
            resultMovableComponents,
            leftAddGrid,
            rightAddGrid,
            resultGrid,
            animatableBackgroundComponent
        })

        this.addChild(
            background, 
            animatableBackgroundComponent,

            // normal compoents    
            stateGridComponent,roundKeyGrid, equation, 

            // movables
            ...stateGridMovableComponents.movables, 
            ...roundKeyMovableComponents.movables,
            ...resultMovableComponents.movables
        )

        
        this.sortableChildren = true


        gsap.set(resultMovableComponents.movables, {alpha: 0})
  
    }
}


export default Page7;