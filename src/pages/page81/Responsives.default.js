import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"


import {shiftArray} from "../../utils/utils"


class Page7DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}


        /* animatable background defines */

        defines.animatableBackground = {
            fill: 0xFF1900,
            width: this.getWidth(100),
            height: this.getHeight(100)
        }

        defines.animatableBackgroundText = {
            text: "2 - ShiftRows",
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
            x: this.getWidth(30),
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

        defines.text1 = {
            x: this.getWidth(50),
            y: this.getHeight(75) - defines.defaultCellSize.height * .5,
        }
        defines.text2 = {
            x: this.getWidth(50),
            y: this.getHeight(75) + defines.defaultCellSize.height * .5,
        }
        defines.text3 = {
            x: this.getWidth(50),
            y: this.getHeight(75) + defines.defaultCellSize.height * 1.5,
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


    shiftRow(movables, landings, settings={}){
        const tl = gsap.timeline();

       // tl.add(this.moveToLandingAdvanced(movablesRow[0], landingsRow[3], {offsetY: -100}), "shift")

       


       const landingBounds = this.getBounds(landings[3])
       const landingBoundsZero = this.getBounds(landings[0])
     //  tl.to(movables[0], {pixi: {...landingBounds, zIndex: 10}, duration: 1}, "shift-row")

       tl.to(movables[0], {pixi: {
           ...landingBounds,
           x: (landingBounds.x + landingBoundsZero.x) / 2,
           y: landingBounds.y -100, 
           zIndex: 10,
        }, duration: 1}, "shift-row")
        tl.to(movables[0], {pixi: {...landingBounds, zIndex: 10}, duration: 1})



       for(let i = 1; i < movables.length; i++){
           const bounds = this.getBounds(landings[i-1])
           tl.to(movables[i], {pixi: {...bounds, zIndex: 5}, duration: .8}, "shift-row+=1")
       }

       tl.set(movables, {pixi: {zIndex: 1}})   

        return tl;
    }

    createAnimationMain(){
        

        const { 
        
            stateGridComponent,
            text1Component,
            text2Component,
            text3Component,

            // movables
            stateGridMovableComponents
        } = this.getPageComponents();





        const tl = gsap.timeline();


        tl.to(text1Component, {pixi: {alpha: 1}})
        // shift second row 
        tl.add(this.shiftRow(stateGridMovableComponents.getRow(1), stateGridComponent.getRow(1)))
        tl.to(text1Component, {pixi: {alpha: 0}})
        tl.to(text2Component, {pixi: {alpha: 1}}, "<")
        // shift 3 row 2 times
        
        const secondsRowMovables =stateGridMovableComponents.getRow(2)
        tl.add(this.shiftRow(secondsRowMovables, stateGridComponent.getRow(2)))
        tl.add(this.shiftRow(shiftArray(secondsRowMovables, 1), stateGridComponent.getRow(2)))
        

        // shift 4th row 3 times
        tl.to(text2Component, {pixi: {alpha: 0}})
        tl.to(text3Component, {pixi: {alpha: 1}}, "<")

        const thirdRowMovables =stateGridMovableComponents.getRow(3)
        tl.add(this.shiftRow(thirdRowMovables, stateGridComponent.getRow(3)))
        tl.add(this.shiftRow(shiftArray(thirdRowMovables, 1), stateGridComponent.getRow(3)))
        tl.add(this.shiftRow(shiftArray(thirdRowMovables, 2), stateGridComponent.getRow(3)))
        tl.to(text3Component, {pixi: {alpha: 0}})
        

        return tl;
        



    }
}

export default Page7DefaultResponsives