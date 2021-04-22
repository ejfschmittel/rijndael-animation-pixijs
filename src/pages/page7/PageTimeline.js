
import {hexStringToInt} from "../../utils/conversions"
import {gsap} from "gsap"

import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page7Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
     

     
    }


    

    createAnimationIn(){
        const tl = this.getAnimatableBackgroundTL();

        return tl;
    }


    createAnimationMain(){
        const {
            sbox, grid, textBox,
            stateMovables, resultMovables
        } = this.getGlobalComponents();
        const tl = gsap.timeline()




        const firstCellHex = this.page.controller.data.getData("after-initial-round")[0]
        const cellX = hexStringToInt(firstCellHex[0])
        const cellY = hexStringToInt(firstCellHex[1])
  
        const sBoxCell = sbox.grid.get(cellX, cellY)
       

        const sBoxRow = sbox.grid.getRow(cellX).map(cell => cell.getBackground())
        const sBoxCol = sbox.grid.getCol(cellY).map(cell => cell.getBackground())

        tl.to(resultMovables.get(0,0), {pixi: {...this.getBounds(sBoxCell), alpha: 0}, duration: .0001})
        tl.set(resultMovables.movables, {pixi: {alpha: 0}})


        tl.to(stateMovables.get(0,0), {pixi: {...this.getBounds(textBox), zIndex: 10}, duration: 1.5}, "move-group")
        
        tl.to(sBoxRow, {pixi: {tint: 0xff0000}})
        tl.to(sBoxCol, {pixi: {tint: 0xff0000}})


        tl.to(resultMovables.get(0,0), {pixi: {alpha: 1}})

        tl.to(sBoxRow, {pixi: {tint: 0xffffff}})
        tl.to(sBoxCol, {pixi: {tint: 0xffffff}}, "<")

        tl.to(resultMovables.get(0,0), {pixi: {scale: .8}})

        tl.to(resultMovables.get(0,0), {pixi: {scale: 1, ...this.getBounds(grid.get(0,0)), zIndex: 10}, duration: 1.5}, "move-back")
        tl.set(resultMovables.get(0,0), {pixi: {zIndex: 1}})

        tl.to(stateMovables.get(0,0), {pixi: {alpha: 0}}, "move-back+=0")


        for(let i = 0; i < resultMovables.movables.length; i++){
            const cell = resultMovables.movables[i] 
            const cellX = hexStringToInt(cell.text.text[0])
            const cellY = hexStringToInt(cell.text.text[1])

            const sBoxCell = sbox.grid.get(cellX, cellY)

            tl.to(sBoxCell.getBackground(), {pixi: {tint: 0xff0000}, duration: .2, delay: .3} )
            tl.to(cell, {pixi: {alpha: 1}, duration: .2}, "<")
            tl.to(sBoxCell.getBackground(), {pixi: {tint: 0xffffff}, duration: .2, delay: .1} )
        }

        return tl;
    }


}

export default Page7Timline;

