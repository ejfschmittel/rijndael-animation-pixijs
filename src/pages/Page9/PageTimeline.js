import {gsap} from "gsap"

import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page9Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
     
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

export default Page9Timline;
