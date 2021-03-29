import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"
class Page7DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}

      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.COLORS.BG_GREY,
            borderWidth: 0,
        }


        defines.rowStyles = {
            width: this.getWidth(96),
            height: this.getHeight(15),
            margin: this.getHeight(1),
            x: this.getWidth(2),
            y: this.getHeight(10),
            gap: 20,
        }

        defines.rowTitleStyles = {
            x: 20,
            scale: 1,
        }


        defines.titleStyles = {
            y: this.getHeight(5),
            scale: .8,
        }


        return defines;
    }



    createPreFadeIn(){

        const {rows, titles} = this.getGlobalComponents();
        const obj = {val: 0}
        const tl = gsap.timeline();
        tl.to(obj, {val: 1, duration: .0001})
        tl.set([...rows, ...titles], {pixi: {alpha: 0}})
        return tl;
    }

    createAnimationMain(){
        const {rows, titles} = this.getGlobalComponents();

        const tl = gsap.timeline(); 

        tl.to(titles, {pixi: {alpha: 1}})
        tl.to(rows[0], {pixi: {alpha: 1}})
        tl.to(rows[1], {pixi: {alpha: 1}})
        tl.to(rows[2], {pixi: {alpha: 1}})
        tl.to(rows[3], {pixi: {alpha: 1}})
        tl.to(rows[4], {pixi: {alpha: 1}})
        tl.to(rows[5], {pixi: {alpha: 1}})

        return tl;
    }


  
}

export default Page7DefaultResponsives