

import * as PIXI from "pixi.js"

import {ANIMATION_DIMENSIONS} from "../core/AnimationController"





class AnimationPage extends PIXI.Container{
    constructor(id){
        super();
        this.id = id;
 
        this.renderedComponents = {}

        this.DEFAULT_RESPONSIVE_LABEL = "default"

        this.responsives = []
        this.responsivesByLabel = {}
      
    }


    registerResponsive(label, AnimationPageResponsive){
        if(label !== this.DEFAULT_RESPONSIVE_LABEL) this.responsives.push(label)
        this.responsivesByLabel[label] = new AnimationPageResponsive(label, this)
    }

    redraw(){
        this.removeChildren(0, this.children.length)

        const defines = this.getDefines();

        this.draw(defines)
        this.setDataBindings();
    }

    addToRenderedComponents(obj){
        this.renderedComponents = {...this.renderedComponents, ...obj}
    }

    
    drawBackground(color){
        const background = new PIXI.Graphics();
        background.beginFill(color)
        background.drawRect(0,0,ANIMATION_DIMENSIONS.width, ANIMATION_DIMENSIONS.height)
        background.endFill();
        return background;
    }

    getResponsive(){
        for(let i = 0; i < this.responsives.length; i++){
            const label = this.responsives[i];
            const responsive = this.responsivesByLabel[label]

            if(responsive.evoke(ANIMATION_DIMENSIONS)){
                return responsive;
            }

            // return last as default;
            if(i == this.responsives.length -1) return responsive;
        }

    }

    getDefines(){

        const defaultDefines = this.responsivesByLabel[this.DEFAULT_RESPONSIVE_LABEL].getDefines()
        let defines = undefined;

        // find correct responsive
        for(let i = 0; i < this.responsives.length; i++){
            const label = this.responsives[i];
            const responsive = this.responsivesByLabel[label]

            if(responsive.evoke(ANIMATION_DIMENSIONS)){       
                defines =  responsive.getDefines(defaultDefines)
                if(defines !== undefined) break;
            }
        }

        console.log(defaultDefines)
        return defines ? defines: defaultDefines;
    }


    createPageTimeline(globalTimeline, last=false){

        globalTimeline.add(this.getTLMethod((responsive, defaultResponsive) => responsive.createPreFadeIn(defaultResponsive)), `${this.id}-pre-fade-in`)
        globalTimeline.add(this.getTLMethod((responsive, defaultResponsive) => responsive.createFadeIn(defaultResponsive)), `${this.id}-fade-in`)
        globalTimeline.add(this.getTLMethod((responsive, defaultResponsive) => responsive.createAnimationIn(defaultResponsive)), `${this.id}-animation-in`)
        globalTimeline.add(this.getTLMethod((responsive, defaultResponsive) => responsive.createAnimationMain(defaultResponsive)), `${this.id}-animation-main`)
        globalTimeline.add(this.getTLMethod((responsive, defaultResponsive) => responsive.createAnimationOut(defaultResponsive)), `${this.id}-animation-out`)


        if(!last)
            globalTimeline.add(this.getTLMethod((responsive, defaultResponsive) => responsive.createFadeOut(defaultResponsive)), `${this.id}-fade-out`)
    }

    getTLMethod(createAnimationMethod){
        const defaultResponsive = this.responsivesByLabel[this.DEFAULT_RESPONSIVE_LABEL];

        for(let i = 0; i < this.responsives.length; i++){
            const label = this.responsives[i];
            const responsive = this.responsivesByLabel[label]

            if(responsive.evoke(ANIMATION_DIMENSIONS)){       
               const tl = createAnimationMethod(responsive, defaultResponsive)
               if(tl !== undefined) return tl;
            }
        }

        return createAnimationMethod(defaultResponsive)
    }

  

    draw(){}
    setDataBindings(){}

    positionComponent(component, componentDefines){
        const defines = {x: 0, y: 0, anchorX: 0, anchorY: 0, ...componentDefines}
        component.positionComponent(defines.x, defines.y, defines.anchorX, defines.anchorY)
    }
}

export default AnimationPage