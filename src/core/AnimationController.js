


import * as PIXI from "pixi.js"

import {gsap} from "gsap"

import {debounce} from "../utils/utils"

export const ANIMATION_DIMENSIONS = {
    width: null,
    height: null,
    widthPercent: null,
    heightPercent: null
}





class AnimationController{

    constructor(containerID, locale){

        this.containerID = containerID;
        this.container = document.getElementById(containerID)


        this.isLoading = true;

        this.locale = locale;

        this.pages = []
        this.pagesByID = {}
        this.pageNames = {}

        this.tl = gsap.timeline({paused: true, onComplete: () => this.pause()})

        this.currentPage = null;

        this.app = null;


        this.isResizing = false;
        this.resizeStore = null;

        const playBtn = document.getElementById("rijndael-animation-play") 
        playBtn.addEventListener("click", this.onPlayPause.bind(this))
   
        if(this.tl.paused()){        
           playBtn.classList.add("rijndael-animation__play-btn--paused")
        }else{
           playBtn.classList.remove("rijndael-animation__play-btn--paused")
        }


        const jumpForwardsButton = document.getElementById("rijndael-animation-jump-forwards")
        jumpForwardsButton.addEventListener("click", this.jumpForwards.bind(this))

        const jumpBackwardsButton = document.getElementById("rijndael-animation-jump-backwards")
        jumpBackwardsButton.addEventListener("click", this.jumpBackwards.bind(this))

        this.init();
 
    }


    updateCurrentPage(pageID){
       // console.log("current page: " + pageID)
        this.currentPage = pageID;
        this.updateAfterCurrentPageUpdate(pageID);      
    }


    // update ui after page change
    updateAfterCurrentPageUpdate = debounce((pageID) => {

        const desktopMenuContainer = document.getElementById("rijndael-animation-menu-desktop")
        const mobileMenuContainer = document.getElementById("rijndael-animation-menu-mobile")

        const menuItems = desktopMenuContainer.querySelectorAll(".rijndael-animation__nav-item")

        const currentIndex = this.pages.indexOf(pageID)

        menuItems.forEach((menuItem, idx) => {
                if(idx == currentIndex){
                    menuItem.classList.add("rijndael-animation__nav-item--current")
                }else{
                    menuItem.classList.remove("rijndael-animation__nav-item--current")
                }
            })

            const mobileMenuItems = mobileMenuContainer.querySelectorAll("option")
            mobileMenuItems.forEach((menuItem, idx) => {
            if(idx == currentIndex){
                menuItem.defaultSelected = true;
            }else{
            menuItem.defaultSelected = false;
            }
        })
    }, 50)



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
      

      
        if(!this.resizeStore){
            this.prepResize();
        }
       
        // resize current page
    
        console.time("redraw-current-page")
        this.pagesByID[this.currentPage].redraw();
        console.timeEnd("redraw-current-page")
 

        this.onAfterResize();
    }

    prepResize(){      
       const time = this.tl.totalTime();
        const paused = this.tl.paused();
        this.isResizing = true;

        this.pause();
        const label = this.tl.currentLabel();
        
        // go to last safe reset point
        this.tl.seek(label, false)
       
        // store data
        this.resizeStore = {
            label,
            time,
            resetTime: this.tl.labels[label],
            paused,
        }
    
    }


    getCurrentPage = () => {
        // keeping current page consistent ????
        const labelsObj = this.tl.labels;
        const tlCurrentTime = this.tl.totalTime();

        let closestTime = null;
        let closestLabel = null;
        let closestTimeDist = 3000 // tl duration

        Object.keys(labelsObj).forEach(label => {
            const labelTime = labelsObj[label];

            const dist = tlCurrentTime -labelTime;
            if(dist >= 0 && dist < closestTimeDist){
                closestTime = labelTime;
                closestTimeDist = dist;
                closestLabel = label;
            }
        })

        
    }

    onAfterResize = debounce(() => {

        console.time("after-resize")
        

        console.time("redraw-pages")
        this.pages.forEach(pageID => {
            if(pageID !== this.currentPage){
                this.pagesByID[pageID].redraw();
               // this.pagesByID[pageID].hide();
       
            }       
            gsap.set(this.pagesByID[pageID], {pixi: {alpha: 0}})
        })
        console.timeEnd("redraw-pages")
       
        console.time("recreate-timeline")
        this.createTimeline();
        console.timeEnd("recreate-timeline")
    
        console.time("seek")
        this.tl.seek(this.resizeStore.label, false)
        if(this.resizeStore && this.resizeStore.paused === false) {
            this.resume();
        }
        this.resizeStore = null;
        this.isResizing = false;
        console.timeEnd("seek")
        console.timeEnd("after-resize")
    }, 500)



    registerPage(PageClass, pageID, pageName){
        const pageLocale = this.locale[pageID] || {}

      
        const page = new PageClass(pageID, pageLocale)
        this.pagesByID[pageID] = page
        this.pages.push(pageID)
        this.pageNames[pageID] = pageName


        page.init();
        // hide page
        gsap.set(page, {pixi: {alpha: 0}})
        this.app.stage.addChild(page)
     
    }


    createTimeline(){

        this.tl = null;
        this.tl = gsap.timeline({paused: true});

        this.pages.forEach((pageID, idx) => {
            const page = this.pagesByID[pageID]
            this.tl.call(() => this.updateCurrentPage(pageID))
            page.createPageTimeline(this.tl, idx == this.pages.length -1)

        })

        // create / update menu?
        this.createMenu()
    }

    createMenu(){
        
        const desktopMenuContainer = document.getElementById("rijndael-animation-menu-desktop")
        const mobileMenuContainer = document.getElementById("rijndael-animation-menu-mobile")
        desktopMenuContainer.innerHTML = ""
        mobileMenuContainer.innerHTML = ""

          // create desktop menu

   
          this.pages.forEach((pageID, pageIndex) => {      
              const menuItem = document.createElement("label")
              menuItem.classList.add("rijndael-animation__nav-item")
              menuItem.innerHTML = pageIndex + 1;
              menuItem.title = this.pageNames[pageID]
              menuItem.addEventListener("click", () => {
                    if(!this.isResizing){
                     this.goToPage(pageID)
                    }
              })
              desktopMenuContainer.appendChild(menuItem)
          })
  
          // create mobile menu
          this.pages.forEach(pageID => {
              const menuItem = document.createElement("option")
              menuItem.value = pageID;
              menuItem.innerHTML = this.pageNames[pageID];
             
             
              mobileMenuContainer.appendChild(menuItem)
          })
  
          mobileMenuContainer.addEventListener("change", (e) => {
              if(!this.isResizing){
                const pageID = e.target.value;
                this.goToPage(pageID)
              }
          })
          
    }



    goToPage(pageID){
        console.log("go to page")
        const paused = this.tl.paused();
        this.tl.pause();
   
        this.tl.seek(`${pageID}-animation-main`, false)

        this.updateCurrentPage(pageID)
        if(!paused) this.tl.play(null, false);
    }

    onPlayPause(){

            const paused = this.tl.paused()

            if(paused){
                this.resume();
            }else{
                this.pause();           
            }
     }


    playFrom(label=null){
        const playBtn = document.getElementById("rijndael-animation-play") 
        playBtn.classList.remove("rijndael-animation__play-btn--paused")
        this.tl.play(label, false)      
    }


    resume(){
        const playBtn = document.getElementById("rijndael-animation-play") 
        playBtn.classList.remove("rijndael-animation__play-btn--paused")
        this.tl.resume()
    }

    pause(){
        const playBtn = document.getElementById("rijndael-animation-play") 
        playBtn.classList.add("rijndael-animation__play-btn--paused")
        this.tl.pause()
    }
  

    jumpForwards(){
        const currentTime = this.tl.totalTime();
        this.tl.seek(currentTime + .5, false)       
    }

    jumpBackwards(){
        const currentTime = this.tl.totalTime();
        this.tl.seek(currentTime - .5, false)  
    }




    
}

export default AnimationController;