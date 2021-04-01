import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {shiftArray} from "../../utils/utils"

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
            fill: this.COLORS.BG_RED,
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
            fill: this.COLORS.BG_BLUE,
            borderWidth: 0,
        }



        defines.gridStyles = {
            width: this.getWidth(30),
            height: this.getHeight(30),
            fill: this.COLORS.CELL_BG_YELLOW,
            x: this.getWidth(25),
            y: this.getHeight(50)
        }

        defines.movablesStyles = {
            fill: this.COLORS.CELL_BG_YELLOW
        }


        const cellHeight = defines.gridStyles.height / 4;
        defines.text1Pos = {
            x: this.getWidth(50),
            y: defines.gridStyles.y + cellHeight
        }

        defines.text2Pos = {
            x: this.getWidth(50),
            y: defines.gridStyles.y + cellHeight * 2
        }

        defines.text3Pos = {
            x: this.getWidth(50),
            y: defines.gridStyles.y + cellHeight * 3
        }



    

        return defines;
    }





    createAnimationIn(){
        const tl = this.getAnimatableBackgroundTL();

        return tl;
    }


    createAnimationMain(){
        const {
            movablesCollector, grid, textContainer1, textContainer2, textContainer3
        } = this.getGlobalComponents();
        const tl = gsap.timeline();

        tl.set([textContainer1, textContainer2, textContainer3], {pixi: {alpha: 0}})

        tl.to(textContainer1, {pixi: {alpha: 1}})

       // movablesCollector.getCol(1).map(cell => console.log(cell.text.text))
       tl.add(this.shiftRow(movablesCollector.getRow(1), grid.getRow(1)))
       tl.to(textContainer1, {pixi: {alpha: 0}})
       tl.to(textContainer2, {pixi: {alpha: 1}}, "<")
       // shift 3 row 2 times
       
       const secondsRowMovables = movablesCollector.getRow(2)
       tl.add(this.shiftRow(secondsRowMovables, grid.getRow(2)))
       tl.add(this.shiftRow(shiftArray(secondsRowMovables, 1), grid.getRow(2)))
       

       // shift 4th row 3 times
       tl.to(textContainer2, {pixi: {alpha: 0}})
       tl.to(textContainer3, {pixi: {alpha: 1}}, "<")

       const thirdRowMovables =movablesCollector.getRow(3)
       tl.add(this.shiftRow(thirdRowMovables, grid.getRow(3)))
       tl.add(this.shiftRow(shiftArray(thirdRowMovables, 1), grid.getRow(3)))
       tl.add(this.shiftRow(shiftArray(thirdRowMovables, 2), grid.getRow(3)))
       tl.to(textContainer3, {pixi: {alpha: 0}})

        return tl;  
    }




    shiftRow(movables, landings, settings={}){
        const tl = gsap.timeline();

       const landingBounds = this.getBounds(landings[3])
       const landingBoundsZero = this.getBounds(landings[0])


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


  
}

export default Page6DefaultResponsives