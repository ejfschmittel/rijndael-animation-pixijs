


import * as PIXI from "pixi.js"

import {gsap} from "gsap"

import AnimationPage from "./AnimationPage"
import Page1 from "../pages/page1/Page1.js"
import TestPage2 from "../pages/Page"

export const ANIMATION_DIMENSIONS = {
    width: null,
    height: null,
    widthPercent: null,
    heightPercent: null
}











class AnimationController{

    constructor(containerID){

        this.containerID = containerID;
        this.container = document.getElementById(containerID)


        this.pages = []
        this.pagesByID = {}
        this.pageNames = {}

        this.tl = gsap.timeline({paused: true})



        this.app = null;
        this.init();
 
    }


    init(){
        // get canvas container dimensions
        this.updateAnimationDimensions();

        // create pixi & canvas
        this.app = new PIXI.Application({
            backgroundColor: 0xDDDDDD,

        })

       
        const bounds = this.container.getBoundingClientRect();
        this.app.renderer.resize(bounds.width, bounds.height)
   


        // add stage to canvas
        this.container.appendChild(this.app.view)

        // add on resize event listener
        window.addEventListener("resize", this.onResize)
        
      

    }

    updateAnimationDimensions = () => {
        const containerBounds = this.container.getBoundingClientRect()
        ANIMATION_DIMENSIONS.width = containerBounds.width;
        ANIMATION_DIMENSIONS.height = containerBounds.height
        ANIMATION_DIMENSIONS.widthPercent = containerBounds.width / 100;
        ANIMATION_DIMENSIONS.heightPercent = containerBounds.height / 100;
    }

    onResize = () => {
        this.updateAnimationDimensions();
        this.app.renderer.resize(ANIMATION_DIMENSIONS.width, ANIMATION_DIMENSIONS.height)
       // this.app.renderer.render();

       // rerender
       this.pages.forEach(pageID => {
        this.pagesByID[pageID].redraw();
       })
    }


    registerPage(PageClass, pageID, pageName){
        const page = new PageClass(pageID)
        this.pagesByID[pageID] = page
        this.pages.push(pageID)
        this.pageNames[pageID] = pageName


        page.redraw();
        // hide page
        gsap.set(page, {pixi: {alpha: 0}})
        this.app.stage.addChild(page)
     
    }


    createTimeline(){
        this.pages.forEach((pageID, idx) => {
            const page = this.pagesByID[pageID]


            page.createPageTimeline(this.tl, idx == this.pages.length -1)

        })

        // create / update menu?
    }





    
}

export default AnimationController;