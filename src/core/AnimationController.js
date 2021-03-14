


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

    constructor(containerID){

        this.containerID = containerID;
        this.container = document.getElementById(containerID)


        this.pages = []
        this.pagesByID = {}
        this.pageNames = {}

        this.tl = gsap.timeline({paused: true})

        this.currentPage = null;

        this.app = null;


        this.isResizing = false;
        this.resizeStore = null;

        const playBtn = document.getElementById("rijndael-animation-play") 
        playBtn.addEventListener("click", this.onPlayPause.bind(this))
   
        if(this.tl.paused()){        
           playBtn.classList.remove("rijndael-animation__play--btn--paused")
        }else{
           playBtn.classList.add("rijndael-animation__play-btn--paused")
        }

        this.init();
 
    }


    updateCurrentPage(pageID){
        console.log("current page: " + pageID)
        this.currentPage = pageID;

        // update menues ()

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
        console.log(ANIMATION_DIMENSIONS)
        this.app.renderer.resize(ANIMATION_DIMENSIONS.width, ANIMATION_DIMENSIONS.height)
      

      
        if(!this.resizeStore){
            this.prepResize();
        }

        this.pages.forEach(pageID => {
            this.pagesByID[pageID].redraw();
        })
     
       this.onAfterResize();
    }

    prepResize(){      
        const time = this.tl.totalTime();
        const paused = this.tl.paused();
        this.isResizing = true;

        this.pause();
        let labelTimes = []

        // get label times of direct children
        const directLabelTimes = Object.keys(this.tl.labels).map(key => {
            return this.tl.labels[key];
        })

        labelTimes = labelTimes.concat(...directLabelTimes)
        

        // get clostest labeled resetpoint
        let closestLabelTime = 0;
        
        for(let i = 0; i < labelTimes.length; i++){
            const dist = time - labelTimes[i]
            if(dist >= 0 && dist < time - closestLabelTime){
                closestLabelTime = labelTimes[i]
            }
            
        }

        // go to last safe reset point
        this.tl.seek(closestLabelTime, false)

        // store data
        this.resizeStore = {
            time,
            resetTime: closestLabelTime,
            paused,
        }
    
    }

    onAfterResize = debounce(() => {

        console.log("on after resize")
        this.createTimeline();
    
        console.log(this.resizeStore)
        this.tl.seek(this.resizeStore.resetTime, false)
        if(this.resizeStore && this.resizeStore.paused === false) {
            console.log("resume")
            this.resume();
        }
        this.resizeStore = null;
        this.isResizing = false;
    }, 500)



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

          this.pages.forEach(pageID => {
  
              
              const menuItem = document.createElement("div")
              menuItem.classList.add("rijndael-animation__nav-item")
              menuItem.addEventListener("click", () => {
                  this.goToPage(pageID)
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
              const pageID = e.target.value;
              this.goToPage(pageID)
          })
    }



    goToPage(pageID){
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
        playBtn.classList.add("rijndael-animation__play-btn--paused")
        this.tl.play(label, false)      
    }


    resume(){
        const playBtn = document.getElementById("rijndael-animation-play") 
        playBtn.classList.add("rijndael-animation__play-btn--paused")
        this.tl.resume()
    }

    pause(){
        const playBtn = document.getElementById("rijndael-animation-play") 
        playBtn.classList.remove("rijndael-animation__play-btn--paused")
        this.tl.pause()
    }
  




    
}

export default AnimationController;