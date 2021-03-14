
import {ANIMATION_DIMENSIONS} from "./AnimationController"
import {gsap} from "gsap"

class AnimationPageResponsives{

    constructor(label, page){
        this.label = label;
        this.page = page;


        this.FADE_OUT_DELAY = 5;
        this.FADE_OUT_DURATION = .0001;
        this.FADE_IN_DURATION = .0001;
    }

    evoke(pageDimensions){   
        return false;
    }

    getDefines(){
        // defines.
        
    }

    getWidth(widthPercent){
        return ANIMATION_DIMENSIONS.widthPercent * widthPercent
    }

    getHeight(heightPercent){
        return ANIMATION_DIMENSIONS.heightPercent * heightPercent
    }

    createPreFadeIn(){}
    createAnimationIn(){}
    createAnimationOut(){}
    createAnimationMain(){}
    createFadeIn(){
  
        const tl = gsap.timeline();
        tl.to(this.page, {pixi: {alpha: 1}, duration: this.FADE_IN_DURATION})
        return tl;
    }
    createFadeOut(){
        const tl = gsap.timeline();
        tl.to(this.page, {pixi: {alpha: 0},duration: this.FADE_OUT_DURATION, delay: this.FADE_OUT_DELAY})
        return tl;
    }

    getPageComponents(){
        return this.page.renderedComponents;
    }
}


export default AnimationPageResponsives;