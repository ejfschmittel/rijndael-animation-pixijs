

import * as PIXI from "pixi.js"

import {ANIMATION_DIMENSIONS} from "../core/AnimationController"
import SpriteBackground from "../components/SpriteBackground"


/*
    new Page();


    init():
        - create 
        - redraw();

    redraw():
        - remove recreated
        - get defines
        - redraw();
        

*/



class AnimationPage extends PIXI.Container{
    constructor(id){
        super();
        this.id = id;
 
        this.renderedComponents = {}



        this.permanentComponents = []
        this.temporaryComponents = []
        this.globalComponents = {}

        // this.globalComponents
        // this.addPermanent()
        // this.addTemporary()

        this.DEFAULT_RESPONSIVE_LABEL = "default"

        this.responsives = []
        this.responsivesByLabel = {}
      
    }

    addPermanent(obj){
        const objArray = Object.keys(obj).map(key => obj[key])
        this.addChild(...objArray)
        this.permanentComponents = [...this.permanentComponents, ...objArray]
        this.addToGlobalComponents(obj)       
    }

    addTemporary(obj){
        const objArray = Object.keys(obj).map(key => obj[key])
        this.addChild(...objArray)
        this.temporaryComponents = [...this.temporaryComponents, ...objArray]
        this.addToGlobalComponents(obj)
    }


    registerResponsive(label, AnimationPageResponsive){
        if(label !== this.DEFAULT_RESPONSIVE_LABEL) this.responsives.push(label)
        this.responsivesByLabel[label] = new AnimationPageResponsive(label, this)
    }


    init(){
        this.removeChildren();
        const defines = this.getDefines();
        this.create(defines)
        this.drawPage(defines)
    }

    drawPage(defines){}


    redraw(){
        console.log("redraw")
        console.log(...this.temporaryComponents)

        this.removeChild(...this.temporaryComponents)
        this.temporaryComponents = []

        const defines = this.getDefines();

        this.drawPage(defines)
    }

    addToRenderedComponents(obj){
        this.renderedComponents = {...this.renderedComponents, ...obj}
    }

    addToGlobalComponents(obj){
        this.globalComponents = {...this.globalComponents, ...obj}
    }

    
    createBackground(color){
        const background = new SpriteBackground();
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


        const d =  defines ? defines: defaultDefines;

        return {...d, animationDimensions: ANIMATION_DIMENSIONS}
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

  



    positionComponent(component, componentDefines){
        const defines = {x: 0, y: 0, anchorX: 0, anchorY: 0, ...componentDefines}
        component.positionComponent(defines.x, defines.y, defines.anchorX, defines.anchorY)
    }
}

export default AnimationPage