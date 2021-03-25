import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"


import {shiftArray} from "../../utils/utils"


class Page9DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}


        /* animatable background defines */

        defines.animatableBackground = {
            fill: 0xFFC400,
            width: this.getWidth(100),
            height: this.getHeight(100)
        }

        defines.animatableBackgroundText = {
            text: "3 - MixColumns",
            fontSize: this.getWidth(4),
            fill: 0xffffff,
            x: this.getWidth(96),
            y: this.getWidth(1),
        }


        defines.animatableBackgroundBar = {
            fill: 0xffffff,
            width: this.getWidth(100),
            height: this.getHeight(6),
            y: defines.animatableBackgroundText.fontSize + 2 * this.getWidth(1),
        }

        defines.equationPos = {
            x: this.getWidth(90),
            y: this.getHeight(50),
            anchorX: 1,
            anchorY: .5,
        }

       
        /* general defines */
        defines.symbolFont = { }

        defines.defaultCellSize = {
            width: this.getWidth(6),
            height: this.getWidth(5),
        }

        defines.defaultCellStyles = {
            borderWidth: 1,
            borderFill: 0x000000,
            fill: 0xFFF995,
        }

        defines.defaultCellFontStyles = {

        }

        /* specific defines */
        defines.stateGrid = {
            x: this.getWidth(25),
            y: this.getHeight(75),
            anchorX: .5,
            anchorY: .5,
        }


        defines.defaultFontStyles = {
            fill: 0xffffff,
            fontSize: this.getWidth(4)
        }
        
        defines.stateGridMovables = {
            fill: 0xFFF995,
        }

        defines.resultMovables = {
            fill: 0xFFD0CC,
        }

    
        return defines;
    }




  
    createPreFadeIn(){
        const { 
            animatableBackgroundComponent
        } = this.getPageComponents();

        const obj = {val: 0}
        const tl = gsap.timeline()
        tl.to(obj, {val: 1, duration: .0001})
     

        tl.set(animatableBackgroundComponent, {pixi: {y: animatableBackgroundComponent.height}})
        tl.set([
            animatableBackgroundComponent.barComponent,
            animatableBackgroundComponent.textComponent,
        ], {pixi: {alpha: 0}})

        return tl;
    }

    createAnimationIn(){
        const { 
            animatableBackgroundComponent
        } = this.getPageComponents();
        const tl = gsap.timeline();


        tl.to(animatableBackgroundComponent, {pixi: {y: 0}})
        tl.to(animatableBackgroundComponent.barComponent, {pixi: {alpha: 1}})
        tl.to(animatableBackgroundComponent.textComponent, {pixi: {alpha: 1}})
        return tl;
    }


    createAnimationMain(){
        

        const { 
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
        } = this.getPageComponents();





        const tl = gsap.timeline();

            tl.add(this.moveGroup(resultGridMovableComponents.getCol(0), resultGrid.cells, {duration: .0001}))
            tl.add(this.moveGroup(stateGridMovableComponents.getCol(0), rightAddGrid.cells, {duration: 1.5}))

            tl.to(galoisFieldGrid, {pixi: {alpha: 1}})
            tl.to(addSymbolComponent, {pixi: {alpha: 1}})
            tl.to(equalsSymbol, {pixi: {alpha: 1}})

            tl.to(equalsSymbol, {pixi: {alpha: 1}})

            tl.to(resultGridMovableComponents.getCol(0), {pixi: {alpha: 1}})

            tl.to([equation, ...stateGridMovableComponents.getCol(0)], {pixi: {alpha: 0}})

            tl.add(this.moveGroup(resultGridMovableComponents.getCol(0), stateGridComponent.getCol(0), {duration: 1.5}))

            tl.to(resultGridMovableComponents.getCol(1), {pixi: {alpha: 1}})
            tl.to(resultGridMovableComponents.getCol(2), {pixi: {alpha: 1}})
            tl.to(resultGridMovableComponents.getCol(3), {pixi: {alpha: 1}})


        return tl;

    }
}

export default Page9DefaultResponsives