import {gsap} from "gsap"

import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page10Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
     
    }


    createPreFadeIn(){
        const {
            stateGrid, 
            roundKeyGrid,
            columnLanding1,
            columnLanding2,
            columnResult,
            stateMovables,
            roundKeyMovables,
            resultMovables,
            equationContainer,
            addSign,
            equalsSign,
        } = this.getGlobalComponents();
        const obj = {val: 0}
        const tl = gsap.timeline();
        tl.to(obj, {val: 1, duration: .0001})
        tl.set([equationContainer], {pixi: {alpha: 0}})

        tl.set([...resultMovables.movables], {pixi: {alpha: 0}})
        return tl;
    }

    createAnimationIn(){

        const tl = this.getAnimatableBackgroundTL();

       
        return tl;
    }

    createAnimationMain(){
        const {
            stateGrid, 
            roundKeyGrid,
            columnLanding1,
            columnLanding2,
            columnResult,
            stateMovables,
            roundKeyMovables,
            resultMovables,
            equationContainer,
            addSign,
            equalsSign,
        } = this.getGlobalComponents();

        const tl = gsap.timeline();
        tl.set([...resultMovables.movables], {pixi: {alpha: 0}})

        tl.set([equationContainer, columnLanding2, columnLanding2, columnResult, addSign, equalsSign], {pixi: {alpha: 0}})

        tl.add(this.moveGroup(resultMovables.getCol(0), columnResult.cells, {duration: .0001}))


        tl.add(this.moveGroup(stateMovables.getCol(0), columnLanding1.cells,{duration: 1.5}))
        tl.add(this.moveGroup(roundKeyMovables.getCol(0), columnLanding2.cells, {duration: 1.5}))


        // reval equation
        tl.set(equationContainer, {pixi: {alpha: 1}})
        tl.to(addSign, {pixi: {alpha: 1}, duration: .5})
        tl.to(equalsSign, {pixi: {alpha: 1}})

        tl.to([...resultMovables.getCol(0)], {pixi: {alpha: 1}})


        // move back + hide equation
        tl.add(this.moveGroup(resultMovables.getCol(0), stateGrid.getCol(0), {duration: 1.5}))
        tl.to([equationContainer, ...stateMovables.getCol(0), ...roundKeyMovables.getCol(0)], {pixi: { alpha: 0}, duration: .5}, "<")




        // reval the other 3 columns
        tl.to(roundKeyMovables.getCol(1), {pixi: {alpha: 0}, duration: .1, delay: .5})
        tl.to(resultMovables.getCol(1), {pixi: {alpha: 1}, duration: .1}, "<")

        tl.to(roundKeyMovables.getCol(2), {pixi: {alpha: 0}, duration: .1, delay: .5})
        tl.to(resultMovables.getCol(2), {pixi: {alpha: 1}, duration: .1}, "<")

        tl.to(roundKeyMovables.getCol(3), {pixi: {alpha: 0}, duration: .1, delay: .5})
        tl.to(resultMovables.getCol(3), {pixi: {alpha: 1}, duration: .1}, "<")
        

        return tl;
    }


}

export default Page10Timline;
