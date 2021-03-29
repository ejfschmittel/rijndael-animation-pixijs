

import * as PIXI from "pixi.js"

import Component from "./Component"



const defaultTextStyles = {scale: 1}

class TextBox extends Component{


    constructor(text="", baseTextStyles){
        super()

     

        this.background = null;
       
        this.text = new PIXI.Text(text, baseTextStyles);
        
        //this.redraw()
    }

    redraw(backgroundStyles, textStyles){

        this.removeChildren();


        const bs = backgroundStyles;
        const ts = {...defaultTextStyles,...textStyles};

        // create text


    
 

        // create background
        const background = new PIXI.Graphics()

        // optionally add border
        if(bs.borderWidth > 0) background.lineStyle(bs.borderWidth, bs.borderFill, 1, 0)

        background.beginFill(0xffffff)
        if(bs.borderRadius > 0){
            background.drawRoundedRect(0, 0, bs.width, bs.height, bs.borderRadius)
        }else{
            background.drawRect(0,0,bs.width,bs.height)
        }
        background.endFill()
        background.tint = bs.fill;
        // position text in center of background
        this.text.scale.set(ts.scale)
        this.text.position.set(bs.width / 2, bs.height / 2)
        this.text.anchor.set(0.5)


        this.background = background;



        // add to component
        this.addChild(background)
        this.addChild(this.text)
    }

    updateContent(text){
        this.textComponent.text = text;
    }


}

export default TextBox;