import {gsap} from "gsap"

import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page12Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
     
    }

    

    createPreFadeIn(){


        const {rows, titles, outputText, cipherText, outputGrid} = this.getGlobalComponents();
        const tl = this.getPreFadeInTimeline();
        tl.set([...rows, ...titles, outputText, cipherText, outputGrid], {pixi: {alpha: 0}})
        return tl;
    }

    createAnimationMain(){
        const {rows, titles, outputText, cipherText, outputGrid} = this.getGlobalComponents();

        const tl = gsap.timeline(); 

        tl.to(titles, {pixi: {alpha: 1}})
        tl.to(rows[0], {pixi: {alpha: 1}})
        tl.to(rows[1], {pixi: {alpha: 1}})
        tl.to(rows[2], {pixi: {alpha: 1}})
        tl.to(rows[3], {pixi: {alpha: 1}})
        tl.to(rows[4], {pixi: {alpha: 1}})
        tl.to(rows[5], {pixi: {alpha: 1}})

        tl.to([outputText, cipherText, outputGrid], {pixi: {alpha: 1}})
        return tl;
    }

}

export default Page12Timline;
