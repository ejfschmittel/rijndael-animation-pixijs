import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";

import {gsap} from "gsap"

import RijndaelAnimation from "./RijndaelAnimation";


//import {initHexSprites} from "./components/HexadecimalTextBox"
//import AnimationController from "./core/AnimationController"




//import Page1 from "./pages/Page1/Page"
/*import Page2 from "./pages/Page2/Page"
import Page3 from "./pages/Page3/Page"
import Page4 from "./pages/Page4/Page"
import Page5 from "./pages/Page5/Page"
import Page6 from "./pages/Page6/Page"
import Page7 from "./pages/Page7/Page"
import Page8 from "./pages/Page8/Page"
import Page9 from "./pages/Page9/Page"
import Page10 from "./pages/Page10/Page"
import Page11 from "./pages/Page11/Page"
import Page12 from "./pages/Page12/Page"
import Page13 from "./pages/Page13/Page"
import Page14 from "./pages/Page14/Page"*/
import * as PIXI from "pixi.js";

import "./styles/main.scss"



const createRijndaelAnimation = (locale) => {
    gsap.registerPlugin(MotionPathPlugin, PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);

   
    /* 
        class Rijndael Animation

            - create Pixi apllication
            - create animation controller
    
    */


  
   // const animationController = new AnimationController("rijndael-animation-container", locale)

    //initHexSprites(animationController.app.renderer)

   // initTexture(animationController.app.renderer)
    
  /*  animationController.registerPage(Page1, "page-1", "Page 1 - Intro")
    animationController.registerPage(Page2, "page-2", "Page 2 - SubBytes")
    animationController.registerPage(Page3, "page-3", "Page 3 - SubBytes")
    animationController.registerPage(Page4, "page-4", "Page 4 - SubBytes")
    animationController.registerPage(Page5, "page-5", "Page 5 - SubBytes")
    animationController.registerPage(Page6, "page-6", "Page 6 - SubBytes")
    animationController.registerPage(Page7, "page-7", "Page 7 - SubBytes")
    animationController.registerPage(Page8, "page-8", "Page 8 - SubBytes")
    animationController.registerPage(Page9, "page-9", "Page 9 - SubBytes")
    animationController.registerPage(Page10, "page-10", "Page 10 - SubBytes")
    animationController.registerPage(Page11, "page-11", "Page 11 - SubBytes")
    animationController.registerPage(Page12, "page-12", "Page 12 - SubBytes")
    animationController.registerPage(Page13, "page-13", "Page 13 - SubBytes")
    animationController.registerPage(Page14, "page-14", "Page 14 - SubBytes")
    animationController.createTimeline();

 
    animationController.goToPage("page-5");
    animationController.getCurrentPage();*/




  

}


window.addEventListener("load",function(){
    gsap.registerPlugin(MotionPathPlugin, PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);

    
    const rijndaelAnimation = new RijndaelAnimation();
   



   // initTexture(animationController.app.renderer)

    /* const lang = document.documentElement.lang

   import(`./languages/${lang}.locale.json`).then(locale => 
        createRijndaelAnimation(locale.default)
    );*/
  //  createRijndaelAnimation();
  
    /* 
        class Rijndael Animation

            - create Pixi apllication
            - create animation controller
    
    */


  
    /*const animationController = new AnimationController("rijndael-animation-container")

    initHexSprites(animationController.app.renderer)

    initTexture(animationController.app.renderer)
    
    animationController.registerPage(Page1, "page-1", "Page 1 - Intro")
    animationController.registerPage(Page2, "page-2", "Page 2 - SubBytes")
    animationController.registerPage(Page3, "page-3", "Page 3 - SubBytes")
    animationController.registerPage(Page4, "page-4", "Page 4 - SubBytes")
    animationController.registerPage(Page5, "page-5", "Page 5 - SubBytes")
    animationController.registerPage(Page6, "page-6", "Page 6 - SubBytes")
    animationController.registerPage(Page7, "page-7", "Page 7 - SubBytes")
    animationController.registerPage(Page8, "page-8", "Page 8 - SubBytes")
    animationController.registerPage(Page9, "page-9", "Page 9 - SubBytes")
    animationController.registerPage(Page10, "page-10", "Page 10 - SubBytes")
    animationController.registerPage(Page11, "page-11", "Page 11 - SubBytes")
    animationController.registerPage(Page12, "page-12", "Page 12 - SubBytes")
    animationController.registerPage(Page13, "page-13", "Page 13 - SubBytes")
    animationController.registerPage(Page14, "page-14", "Page 14 - SubBytes")
    animationController.createTimeline();

 
    animationController.goToPage("page-14");
    animationController.getCurrentPage();


    const debug = document.createElement("div");
    debug.classList.add("debug-screen");
    document.querySelector("body").appendChild(debug)


    setInterval(() => {
        debug.innerHTML = `
            <div>currentPage: ${animationController.currentPage}</div>
            <div>isRecalculating: ${animationController.currentPage}</div>
        `
    }, 500);
*/
  

   // animationController.tl.seek(54)
  
},false);

