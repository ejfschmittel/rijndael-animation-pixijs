import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import Component from "../../components/Component"


//import TextBox from "../../components/TextBox"
import TextBox from "../../components/TextBox2"
import Arrow from "../../components/Arrow"
import ArrowWithText,{ARROW_ORIENTATION} from "../../components/ArrowWithText"

import {gsap} from "gsap"


import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"

class Page2 extends AnimationPage{
    constructor(id){
        super(id);


      //  this.registerResponsive("max-400", ResponsiveMax400)
       // this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }

    create(defines){
        const background = this.createBackground();

        const centerBox = new TextBox("Rijndael\nEncryptor", {
            fill: 0xffffff,
            align: "center",
            fontSize: 50,
        })

        this.addPermanent({background, centerBox})

    }

    drawPage(defines){
        const {backgroundStyles, textBoxStyles, arrowStyles, arrowFontStyles, arrowLeftStyles} = defines
        const {background, centerBox} = this.globalComponents;

        background.redraw(backgroundStyles)

        centerBox.redraw(textBoxStyles, .8)
        centerBox.position.set(textBoxStyles.x, textBoxStyles.y)
        centerBox.pivot.set(centerBox.width /2, centerBox.height/2)


       
        /* ARROW TOP */
        // create container
        const arrowTopContainer = new PIXI.Container();

        // create text + arrow
        const text = new PIXI.Text("Plaintext",{fill: 0xffffff})
        const arrowTop = new ArrowWithText({orientation: ARROW_ORIENTATION.DOWN, ...arrowStyles},arrowFontStyles)

        // set arrow + text positions
        text.anchor.set(.5, 0)
        text.position.set(arrowTop.width / 2, 0 )
        arrowTop.position.set(0, text.height + 10)

        // add to contaienr
        arrowTopContainer.addChild(text, arrowTop)

        // position container
        arrowTopContainer.position.set(textBoxStyles.x,centerBox.y - centerBox.height / 2- arrowTopContainer.height)
        arrowTopContainer.pivot.set(arrowTopContainer.width  * .5,0)


        /* ARROW BOTTOM */
        // create container
        const arrowBotContainer = new PIXI.Container();

        // create text + arrow
        const textBot = new PIXI.Text("Ciphertext",{fill: 0xD49136})
        const arrowBot = new ArrowWithText({orientation: ARROW_ORIENTATION.DOWN, ...arrowStyles},{...arrowFontStyles, fill: 0xD49136})

        // set arrow + text positions
        textBot.anchor.set(.5, 0)
        textBot.position.set(arrowTop.width / 2, arrowBot.height )

        // add to contaienr
        arrowBotContainer.addChild(textBot, arrowBot)

        // position container
        arrowBotContainer.position.set(textBoxStyles.x,centerBox.y + centerBox.height - (centerBox.height / 2))
        arrowBotContainer.pivot.set(arrowTopContainer.width  * .5,0)


            /* ARROW LEFT */
        // create container
        const arrowLeftContainer = new PIXI.Container();

        // create text + arrow
        const textLeft = new PIXI.Text("Cipher Key",{fill: 0xffffff})
        const arrowLeft = new ArrowWithText({orientation: ARROW_ORIENTATION.RIGHT, ...arrowLeftStyles},arrowFontStyles)

        // set arrow + text positions
        
    
        arrowLeft.position.set(0, textLeft.height +10 )

        // add to contaienr
        arrowLeftContainer.addChild(textLeft, arrowLeft)

        // position container
        arrowLeftContainer.position.set(centerBox.x -  centerBox.width /2 -  arrowLeftContainer.width,textBoxStyles.y )
        arrowLeftContainer.pivot.set(0, arrowLeftContainer.height * .5)


        textLeft.position.set(arrowLeftContainer.width /2 , 0 )
        textLeft.anchor.set(.7, 0)
  


        this.addTemporary({arrowTopContainer, arrowBotContainer, arrowLeftContainer})

    }



    draw(defines){
        const { 
            textBoxTextStyles,
            textBoxStyles
        } = defines


        const background = this.drawBackground(0x000000)

  

        const textBox = new TextBox(textBoxStyles,textBoxTextStyles)     
        this.positionComponent(textBox,textBoxStyles)

        const textBoxBounds = textBox.getBounds();


        const textStyle = new PIXI.TextStyle({fill: 0xffffff})



        /* ARROW TOP */
        // create container
        const arrowTopContainer = new PIXI.Container();

        // create text + arrow
        const text = new PIXI.Text("Plaintext",textStyle)
        const arrowTop = new ArrowWithText({orientation: ARROW_ORIENTATION.DOWN},{text: "101010", fill: 0xff0000})

        // set arrow + text positions
        text.anchor.set(.5, 0)
        text.position.set(arrowTop.width / 2, 0 )
        arrowTop.position.set(0, text.height)

        // add to contaienr
        arrowTopContainer.addChild(text, arrowTop)

        // position container
        arrowTopContainer.position.set(textBoxStyles.x,textBoxBounds.y - arrowTopContainer.height)
        arrowTopContainer.pivot.set(arrowTopContainer.width  * .5,0)

        

        /* ARROW BOTTOM */
        // create container
        const arrowBotContainer = new PIXI.Container();

        // create text + arrow
        const textBot = new PIXI.Text("Plaintext",textStyle)
        const arrowBot = new ArrowWithText({orientation: ARROW_ORIENTATION.DOWN},{text: "101010", fill: 0xff0000})

        // set arrow + text positions
        textBot.anchor.set(.5, 0)
        textBot.position.set(arrowTop.width / 2, arrowBot.height )

        // add to contaienr
        arrowBotContainer.addChild(textBot, arrowBot)

        // position container
        arrowBotContainer.position.set(textBoxStyles.x,textBoxBounds.y + textBoxBounds.height)
        arrowBotContainer.pivot.set(arrowTopContainer.width  * .5,0)
  

        /* ARROW LEFT */
        // create container
        const arrowLeftContainer = new PIXI.Container();

        // create text + arrow
        const textLeft = new PIXI.Text("Plaintext",textStyle)
        const arrowLeft = new ArrowWithText({orientation: ARROW_ORIENTATION.RIGHT},{text: "101010", fill: 0xff0000})

        // set arrow + text positions
        textLeft.anchor.set(0, .5)
        textLeft.position.set(0, arrowLeft.height / 2 )
        arrowLeft.position.set(textLeft.width, 0)

        // add to contaienr
        arrowLeftContainer.addChild(textLeft, arrowLeft)

        // position container
        arrowLeftContainer.position.set(textBoxBounds.x - arrowLeftContainer.width,textBoxStyles.y )
        arrowLeftContainer.pivot.set(0, arrowLeftContainer.height * .5)
  
    
    

        this.addToRenderedComponents({
         
        })

        this.addChild(
            background,
            textBox,
            arrowTopContainer,
            arrowBotContainer,
            arrowLeftContainer,
        )

    
    }
}


export default Page2;