import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";

import {gsap} from "gsap"

import RijndaelAnimation from "./RijndaelAnimation";


import * as PIXI from "pixi.js";

import "./styles/main.scss"

import {startTimer} from "./utils/measure.js"


window.addEventListener("load",function(){
    startTimer()
    gsap.registerPlugin(MotionPathPlugin, PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);
    const rijndaelAnimation = new RijndaelAnimation();
   
},false);

