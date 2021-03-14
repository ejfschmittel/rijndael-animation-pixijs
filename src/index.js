import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";

import {gsap} from "gsap"

import AnimationController from "./core/AnimationController"
import Page1 from "./pages/page1/Page1"
import Page7 from "./pages/page7/Page"

import * as PIXI from "pixi.js";

import "./main.scss"

window.addEventListener("load",function(){
    gsap.registerPlugin(MotionPathPlugin, PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);
  
    const animationController = new AnimationController("rijndael-animation-container")
    animationController.registerPage(Page1, "page-1", "Page 1 - Intro")
    animationController.registerPage(Page7, "page-7", "Page 7 - SubBytes")

    animationController.createTimeline();
    animationController.playFrom("page-7-animation-main");
  
},false);

