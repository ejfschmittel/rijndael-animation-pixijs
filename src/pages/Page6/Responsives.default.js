import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"
class Page6DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}

      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: 0xffffff,
            borderWidth: 0,
        }

        defines.titleStyles = {
            x: this.getWidth(50),
            y: this.getHeight(30)
        }

        defines.containerPos = {
            x: this.getWidth(50),
        }

        defines.labelStyles = {
            width: this.getWidth(22), 
            height: this.getHeight(6),
            borderWidth: 2,
            borderFill: 0x000000,
            borderRadius: 30,
        }

        defines.labelTextStyles = {

        }

    

        return defines;
    }


    createPreFadeIn(){

   
        const {container, title} = this.getGlobalComponents();
        const tl = gsap.timeline();
        const obj = {val: 0};
        tl.to(obj, {val: 1, duration: .0001})
        tl.set([title, container], {pixi: {alpha: 0}})
    
        return tl;
    }

    createAnimationMain(){
        const {container, title} = this.getGlobalComponents();
        const tl = gsap.timeline();
        


        tl.set(container, {pixi: {x: container.x-200, scale: .7}})
        tl.to(container, {pixi: {alpha: 1}, duration: .5})
        tl.to(container, {pixi: {x: container.x, scale: 1}, duration: 1})
        tl.to(title, {pixi: {alpha: 1}}, "<")
        return tl;
    }



  
}

export default Page6DefaultResponsives