import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"
class Page7DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}


        /* animatable background defines */

        defines.animatableBackground = {
            fill: 0xff0000,
            width: this.getWidth(100),
            height: this.getHeight(100)
        }

        defines.animatableBackgroundText = {
            text: "4 - Add Round Key",
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
            x: this.getWidth(20),
            y: this.getHeight(75),
            anchorX: .5,
            anchorY: .5,
        }

        
        defines.stateGridMovables = {
            fill: 0xFFF995,
        }

        defines.roundKeyCell = {
            fill: 0xC1C0C1,
            x: this.getWidth(78),
            y: this.getHeight(75),
            anchorX: .5,
            anchorY: .5,
        }

        defines.roundKeyGridMovables = {
            fill: 0xC1C0C1,
        }

        defines.equationPos = {
            x: this.getWidth(50),
            y: this.getHeight(44),
            anchorX: .5,
            anchorY: .5,
        }

        defines.addSymbol = {
            radius: this.getWidth(2),
            borderWidth: 1,
            borderColor: 0x00000,
            fill: 0xffffff,
        }



        return defines;
    }






    createPreFadeIn(){
        const { 
            resultMovableComponents,
            animatableBackgroundComponent
        } = this.getPageComponents();

        const obj = {val: 0}
        const tl = gsap.timeline()
        tl.to(obj, {val: 1, duration: .0001})
        tl.set(resultMovableComponents.movables, {pixi: {alpha: 0}})

        tl.set(animatableBackgroundComponent, {pixi: {y: animatableBackgroundComponent.height}})
        tl.set([
            animatableBackgroundComponent.barComponent,
            animatableBackgroundComponent.textComponent,
        ], {pixi: {alpha: 0}})

        return tl;
    }

    createAnimationIn(){
        const { 
            resultMovableComponents,
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
            roundKeyGrid,
            equation,
            stateGridMovableComponents,
            roundKeyMovableComponents,
            leftAddGrid,
            rightAddGrid, 
            resultMovableComponents,
            resultGrid

        } = this.getPageComponents();

        const bounds = this.getBounds(leftAddGrid.cells[0])

        const tl = gsap.timeline();


        tl.to(resultMovableComponents.movables, {pixi: {alpha: 0}})
        tl.add(this.moveGroup(resultMovableComponents.getCol(0), resultGrid.cells, {duration: .0001}))


        tl.add(this.moveGroup(stateGridMovableComponents.getCol(0), leftAddGrid.cells, {duration: 2}))
        tl.add(this.moveGroup(roundKeyMovableComponents.getCol(0), rightAddGrid.cells, {duration: 2}))

        tl.to(resultMovableComponents.getCol(0), {pixi: {alpha: 1}})

        tl.add(this.moveGroup(resultMovableComponents.getCol(0), stateGridComponent.getCol(0), {duration: 2}))


        tl.to([equation, ...stateGridMovableComponents.getCol(0), ...roundKeyMovableComponents.getCol(0)], {pixi: {alpha: 0}}, "<")


        tl.to(resultMovableComponents.getCol(1), {pixi: {alpha: 1}})
        tl.to(roundKeyMovableComponents.getCol(1), {pixi: {alpha: 0}}, "<")
        tl.to(resultMovableComponents.getCol(2), {pixi: {alpha: 1}})
        tl.to(roundKeyMovableComponents.getCol(2), {pixi: {alpha: 0}}, "<")
        tl.to(resultMovableComponents.getCol(3), {pixi: {alpha: 1}})
        tl.to(roundKeyMovableComponents.getCol(3), {pixi: {alpha: 0}}, "<")

        // reveal result

        return tl;
        



    }
}

export default Page7DefaultResponsives