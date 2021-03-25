import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import SlowTextBox from "../../components/SlowTextBox"



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
        // title
        const title = new PIXI.Text("The 4 types of\ntransformations:", {fill: 0x333333, fontSize: 24, align: "center", fontWeight: "700"})
        title.anchor.set(.5, .5)
      
        this.addPermanent({background,title,})
       
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, title,
        } = this.globalComponents

        // destructure defines
        const {
            backgroundStyles,
            circledCharStyles, 
            titleStyles,
            textStyles,
            labelStyles,
            containerPos,
        } = defines

        background.redraw(backgroundStyles)

      

        title.position.set(titleStyles.x,titleStyles.y)


        const container = new PIXI.Container();
        const labelSubBytes = new SlowTextBox({...labelStyles, fill: 0xB2D7F9},{text: "1-SubBytes"})
        const labelShiftRows = new SlowTextBox({...labelStyles, fill: 0xFACCC7},{text: "2-ShiftRows"})
        const labelMixColumns = new SlowTextBox({...labelStyles, fill: 0xEFEAC1},{text: "3-MixColumns"})
        const labelAddRoundKey = new SlowTextBox({...labelStyles, fill: 0xA2C1B7},{text: "4-AddRoundKey"})

        const labelMargin = 20;
        labelShiftRows.position.set(0, labelSubBytes.y + labelSubBytes.height + labelMargin)
        labelMixColumns.position.set(0, labelShiftRows.y + labelShiftRows.height + labelMargin)
        labelAddRoundKey.position.set(0, labelMixColumns.y + labelMixColumns.height + labelMargin)


        

        container.addChild(labelSubBytes, labelShiftRows, labelMixColumns, labelAddRoundKey)
        container.pivot.set(container.width / 2, 0)
        container.position.set(containerPos.x, title.position.y + title.height + 20)



        

        this.addTemporary({container})
  
    }
}


export default Page4;