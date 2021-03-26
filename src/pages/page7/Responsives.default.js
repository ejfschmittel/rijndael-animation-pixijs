import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import DataController from "../../core/DataController"

import {hexStringToInt} from "../../utils/hex"

import {gsap} from "gsap"
class Page6DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}


        defines.animatableBackgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.COLORS.BG_BLUE,
        }

        defines.animatableBackgroundTitleStyles = {
            x: this.getWidth(90),
            y: this.getHeight(4),
        }

        defines.animatableBackgroundBarStyles = {
            width: this.getWidth(100),
            height: this.getHeight(5),
            fill: this.COLORS.BG_WHITE,
        }
      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.COLORS.BG_WHITE,
            borderWidth: 0,
        }


        defines.sBoxStyles = {
            width: this.getWidth(50),
            height: this.getHeight(50)
        }

        defines.sboxLegendStyles = {
            scale: .5
        }
        
        defines.sBoxTextStyles = {
            scale: .5,
        }

        defines.sBoxPos = {
            x: this.getWidth(96),
            y: this.getHeight(96)
        }

        defines.gridStyles = {
            width: this.getWidth(24),
            height: this.getWidth(16),
            x: this.getWidth(25),
            y: this.getHeight(50)
        }

        defines.stateMovableStyles = {
            fill: this.COLORS.CELL_BG_YELLOW
        }

        defines.resultMovablesStyles = {
            fill: this.COLORS.CELL_BG_DARK_YELLOW
        }

        defines.textBoxStyle = {
            width: this.getWidth(6),
            height: this.getWidth(4),
        }
    

        return defines;
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




        const firstCellHex = DataController.getData("dummyGrid")[0]
        const cellX = hexStringToInt(firstCellHex[0])
        const cellY = hexStringToInt(firstCellHex[1])
        console.log(cellX, cellY)
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

            console.log(cellX, cellY)
            const sBoxCell = sbox.grid.get(cellX, cellY)

            tl.to(sBoxCell.getBackground(), {pixi: {tint: 0xff0000}, duration: .2, delay: .3} )
            tl.to(cell, {pixi: {alpha: 1}, duration: .2}, "<")
            tl.to(sBoxCell.getBackground(), {pixi: {tint: 0xffffff}, duration: .2, delay: .1} )
        }


       

    



        return tl;
    }




  
}

export default Page6DefaultResponsives