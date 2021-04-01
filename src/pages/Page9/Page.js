import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import AnimatableBackground from "../../components/AnimatableBackground"

import DataController from "../../core/DataController"
import {gsap} from "gsap"


import Grid from "../../components/Grid2"

import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"
import HexadecimalTextBox from "../../components/HexadecimalTextBox.js"

class Page9 extends AnimationPage{
    constructor(id, locale){
        super(id, locale);


        this.registerResponsive("max-400", ResponsiveMax400)
        this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }


    create(defines){


        const background = this.createBackground();
        
        const animatableBackground = new AnimatableBackground(this.text("title"), {})


          // grid + movables
          const grid = new Grid(4, 4, {}, {})
          const gridMovables = grid.createMovables()
          const gridMovablesResults = grid.createMovables()

          DataController.subscribe("dummyGrid", gridMovables.movables)
          DataController.subscribe("dummyGrid", gridMovablesResults.movables)
  
  
          // equation 
          const equationContainer = new PIXI.Container()
  
  
          const galoisField = new Grid(4,4, {}, {})
          DataController.subscribe("galoisField", galoisField.cells)
  
          const landingCol = new Grid(4, 1, {}, {})
          const resultCol = new Grid(4, 1, {}, {})
  
          const multiplicationSign = new PIXI.Graphics();
          multiplicationSign.beginFill(0x000000)
          multiplicationSign.drawCircle(0,0, 6),
          multiplicationSign.endFill();
  
          const equalsSign = new PIXI.Text("=", {fontSize: 30})
          equalsSign.anchor.set(.5, .5)
  
  
          equationContainer.addChild(galoisField, multiplicationSign, landingCol, equalsSign, resultCol )
  
  
          this.addPermanent({background,animatableBackground,grid, equationContainer})
          this.addChild(...gridMovables.movables, ...gridMovablesResults.movables)
          this.addToGlobalComponents({
              gridMovables,
              gridMovablesResults,
              resultCol,
              landingCol,
              multiplicationSign,
              equalsSign,
              galoisField
          })
      
        
          this.sortableChildren = true;
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, animatableBackground, grid, gridMovables, gridMovablesResults,
            equationContainer, galoisField, landingCol, multiplicationSign, equalsSign, resultCol
        } = this.globalComponents

        // background redraw
        const { backgroundStyles, gridTextStyles} = defines
        background.redraw(backgroundStyles)


        // animatable background
        const {
            animatableBackgroundStyles: abStyles,
            animatableBackgroundTitleStyles: abTitleStyles,
            animatableBackgroundBarStyles: abBarStyles,
        } = defines

        animatableBackground.redraw(abStyles,abBarStyles,abTitleStyles)


        // grid landings
        const {gridStyles, gridLandingPos} = defines;

        grid.redraw(gridStyles, {})
        grid.position.set(gridLandingPos.x, gridLandingPos.y)
        grid.pivot.set(grid.width/2, grid.height/2)



        // equation 

        const {equationPos, columnStyles} = defines;
        galoisField.redraw(gridStyles, gridTextStyles)
        landingCol.redraw(columnStyles, {})
        resultCol.redraw(columnStyles, {})

        equationContainer.position.set(equationPos.x, equationPos.y)
        multiplicationSign.position.set(galoisField.width + multiplicationSign.width, equationContainer.height / 2)
        landingCol.position.set(multiplicationSign.x + multiplicationSign.width, 0)
        equalsSign.position.set(landingCol.x + landingCol.width + equalsSign.width, equationContainer.height / 2)
        resultCol.position.set(equalsSign.x + equalsSign.width, 0)


        // initial movables
        const {stateGridStyle} = defines;
        gridMovables.movables.forEach((movable, idx) => {
            const {x,y,width, height}= grid.cells[idx].getBounds()
            movable.redraw({width, height, ...stateGridStyle},gridTextStyles);
            movable.position.set(x, y)
        })

        const {resultGridStyle} = defines;
        gridMovablesResults.movables.forEach((movable, idx) => {
            const {x,y,width, height}= grid.cells[idx].getBounds()
            movable.redraw({width, height, ...resultGridStyle},gridTextStyles);
            movable.position.set(x, y)
        })


      
    }
}


export default Page9;