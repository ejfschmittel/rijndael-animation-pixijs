import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import AnimatableBackground from "../../components/AnimatableBackground"


import {gsap} from "gsap"




import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"
import HexadecimalTextBox from "../../components/HexadecimalTextBox.js"

class Page4 extends AnimationPage{
    constructor(id){
        super(id);


      //  this.registerResponsive("max-400", ResponsiveMax400)
      //  this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }


    create(defines){
        const background = this.createBackground();
        
        const animatableBackground = new AnimatableBackground("1 - SubBytes", {})
      
        this.addPermanent({background,animatableBackground,})
       
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, animatableBackground
        } = this.globalComponents

        // background redraw
        const { backgroundStyles} = defines
        background.redraw(backgroundStyles)


        // animatable background
        const {
            animatableBackgroundStyles: abStyles,
            animatableBackgroundTitleStyles: abTitleStyles,
            animatableBackgroundBarStyles: abBarStyles,
        } = defines

        animatableBackground.redraw(abStyles,abBarStyles,abTitleStyles)



        

        
  
    }
}


export default Page4;