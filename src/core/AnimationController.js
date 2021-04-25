import * as PIXI from "pixi.js"


import {initTexture} from "../components/SpriteBackground"

import AnimationPlayerUI from "./AnimationPlayerUI.js"
import AnimationTimeline from "./AnimationTimeline.js"
import DataController from "./DataController.js"
import LocaleController from "./LocaleController"
import ThemeController from "./ThemeController"
import FormController from "./RijndaelFormController.js"

import {Viewport} from "pixi-viewport"

class AnimationController{

    constructor(settings){

        this.app = null;
        this.settings = settings;
        this.container = document.getElementById("rijndael-animation-screen")


        this.ANIMATION_DIMENSIONS = {
            width: null,
            height: null,
            widthPercent: null,
            heightPercent: null
        }
      

        this.pageIDs = [];
        this.pagesByID = {}
        this.currentPage = null;

        this.isResizing = false;

        this.locale = new LocaleController(this, settings.locale)
        this.theme = new ThemeController(this, settings.themes)
        this.data = new DataController(this)
        this.timeline = new AnimationTimeline(this); 
        this.ui = new AnimationPlayerUI(this);  
        this.form = new FormController(this)

        // add resize event listener
        const onResize = this.onResize.bind(this)
        window.addEventListener("resize", onResize)


        this.app = null;


        this.init();
    }

    
    init(){
        console.log("init")
        // get canvas container dimensions
        this.updateAnimationDimensions();

        // create pixi & canvas
        this.app = new PIXI.Application({
            autoDensity: true,
            resolution: 2
        })

       
        const bounds = this.container.getBoundingClientRect();
        this.app.renderer.resize(bounds.width, bounds.height)
        initTexture(this.app.renderer)


      

        // add stage to canvas
        this.container.appendChild(this.app.view)
        //this.app.renderer.plugins.interaction.autoPreventDefault = false
        // create viewport
        this.viewport = new Viewport({
            screenWidth: this.ANIMATION_DIMENSIONS.width,
            screenHeight: this.ANIMATION_DIMENSIONS.height,
            worldWidth: this.ANIMATION_DIMENSIONS.width,
            worldHeight: this.ANIMATION_DIMENSIONS.height,
            interaction: this.app.renderer.plugins.interaction
        });
        this.app.stage.addChild(this.viewport)


       // this.app.renderer.plugins.interaction.autoPreventDefault = false;
        this.app.renderer.view.style.touchAction = 'auto';

//        app.stage.addChild(this.viewport)
            this.viewport.pinch({noDrag: true}).clampZoom({
                maxWidth: this.ANIMATION_DIMENSIONS.width,
                maxHeight: this.ANIMATION_DIMENSIONS.height,
                maxScale: 2,
            }).clamp({
                direction: "all"
            })
                

        // add on resize event listener
       // window.addEventListener("resize", this.onResize)
    }

    updateAnimationDimensions = () => {
        const containerBounds = this.container.getBoundingClientRect()
        this.ANIMATION_DIMENSIONS.width = containerBounds.width;
        this.ANIMATION_DIMENSIONS.height = containerBounds.height
        this.ANIMATION_DIMENSIONS.widthPercent = containerBounds.width / 100;
        this.ANIMATION_DIMENSIONS.heightPercent = containerBounds.height / 100;
    }



    onResize(){
        this.isResizing = true;
        this.updateAnimationDimensions();
        // resize renderer
        this.app.renderer.resize(this.ANIMATION_DIMENSIONS.width, this.ANIMATION_DIMENSIONS.height)
        this.viewport.resize(this.ANIMATION_DIMENSIONS.width, this.ANIMATION_DIMENSIONS.height,this.ANIMATION_DIMENSIONS.width, this.ANIMATION_DIMENSIONS.height)

        // do i need to update clamp 
        
        this.timeline.onResize();
        this.pagesByID[this.currentPage].redraw();
       
    }

    hideCurrentPage(){
        this.pagesByID[this.currentPage].hide();
    }
   

    setCurrentPage(pageID){
        this.currentPage = pageID;
        this.ui.updateCurrentPageUI(pageID)
     
    }

    


    redrawPages(){
        this.pageIDs.map(pageID => {
            const page = this.pagesByID[pageID];
            page.redraw();
        })
    }


  /*  setLocale(localeCode){
        console.log("set localse")
        if(this.currentLocaleCode === localeCode) return;
        if(!Object.keys(LOCALES).includes(localeCode)) throw new Error(`locale code ${localeCode} not supported`)

        this.currentLocaleCode = localeCode

        // update pages text
        this.pageIDs.forEach(pageID => {
            const page = this.pagesByID[pageID];
            page.updateLocaleLanguageTexts()
        })


        console.log("update ui")
        // update ui text
        this.uiController.updatePlayerLocale();


        // redo timeline (because of into animation)
        this.timelineController.saveAndRebuildTimeline();

    }


    setTheme(newTheme){
        if(this.currentTheme == newTheme) return;
        if(!THEME_LIST.includes(newTheme)) throw new Error(`invalid theme ${newTheme}`);

        this.currentTheme = newTheme;
        this.themeElement.className = "";
        this.themeElement.classList.add(...THEMES[this.currentTheme])

        // update timeline
        this.timelineController.saveAndRebuildTimeline();
    }

    getPageLocale(pageID){
        return LOCALES[this.currentLocaleCode][pageID];
    }

    getLocale(){
        return LOCALES[this.currentLocaleCode]
    }*/


    play(){
        this.timeline.play()
    }

    pause(){
        this.timeline.pause();
    }

    goToFirstPage(){
        this.timeline.tl.seek(`${this.pageIDs[0]}-animation-main`, false)
    }


    registerAnimationPage(AnimationPageClass, pageID){
       
        const animationPage = new AnimationPageClass() 
      
        animationPage.initPage(pageID, this)
        this.pageIDs.push(pageID)
        this.pagesByID[pageID] = animationPage;

        // hide pages
        animationPage.hide();

        
        //this.app.stage.addChild(animationPage)
        this.viewport.addChild(animationPage)
        this.ui.addInfoText(pageID);

    }


    buildTimeline(){
  
        // redraw pages

        this.timeline.createTimeline();
        this.ui.recreateNavigation()
    }

}

export default AnimationController;