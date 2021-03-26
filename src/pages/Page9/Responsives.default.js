import AnimationPageResponsives from "../../core/AnimationPageResponsives"

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
            fill: this.COLORS.BG_YELLOW,
        }

        defines.animatableBackgroundTitleStyles = {
            x: this.getWidth(90),
            y: this.getHeight(4),
        }

        defines.animatableBackgroundBarStyles = {
            width: this.getWidth(100),
            height: this.getHeight(8),
            fill: this.COLORS.BG_WHITE,
        }
      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.COLORS.BG_RED,
            borderWidth: 0,
        }


        defines.gridStyles = {
            width: this.getWidth(26),
            height: this.getWidth(20),
        }

        defines.gridTextStyles = {
            scale:1,
        }

        defines.gridLandingPos = {
            x: this.getWidth(20),
            y: this.getHeight(70)
        }



        defines.equationPos = {
            x: this.getWidth(40),
            y: this.getHeight(30)
        }

        defines.columnStyles = {
            width: defines.gridStyles.width / 4,
            height: defines.gridStyles.height
        }

        defines.stateGridStyle = {
            fill: this.COLORS.CELL_BG_YELLOW,
        }

        defines.resultGridStyle = {
            fill: this.COLORS.CELL_BG_PINK,
        }

        defines.columnLandingPos = {}
        defines.resultLandingPos = {}

    

        return defines;
    }





    createAnimationIn(){
        const tl = this.getAnimatableBackgroundTL();

        return tl;
    }


    createAnimationMain(){

        const {
            grid, gridMovables, gridMovablesResults,
            equationContainer, 
            galoisField, 
            landingCol, 
            multiplicationSign,
            equalsSign, 
            resultCol
        } = this.getGlobalComponents();
        const tl =  gsap.timeline();

        // premove
        tl.set([equationContainer, multiplicationSign, equalsSign, galoisField], {pixi: {alpha: 0}})
        tl.set(gridMovablesResults.movables, {pixi: {alpha: 0}})
        tl.add(this.moveGroup(gridMovablesResults.getCol(0), resultCol.cells, {duration: .0001}))

        tl.add(this.moveGroup(gridMovables.getCol(0), landingCol.cells, {duration: 1.5}))

        // reveal equation 
        tl.to(equationContainer, {pixi: {alpha: 1}})
        tl.to(galoisField, {pixi: {alpha: 1}})
        tl.to(multiplicationSign, {pixi: {alpha: 1}})

        tl.to([equalsSign, ...gridMovablesResults.getCol(0)], {pixi: {alpha: 1}})


        // move back
        tl.add(this.moveGroup(gridMovablesResults.getCol(0), grid.getCol(0), {duration: 1.5}))

        // hide equation
        tl.to([equationContainer, ...gridMovables.getCol(0)], {pixi: {alpha: 0}}, "<")
    

        // reveal other
        tl.to(gridMovablesResults.getCol(1), {pixi: {alpha: 1}, duration: .5})
        tl.to(gridMovablesResults.getCol(2), {pixi: {alpha: 1}, duration: .5})
        tl.to(gridMovablesResults.getCol(3), {pixi: {alpha: 1}, duration: .5})

        return tl;
    }



  
}

export default Page6DefaultResponsives