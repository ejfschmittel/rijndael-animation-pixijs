

import * as PIXI from "pixi.js"

import Component from "./Component"

class TextBox extends Component{


    constructor(backgroundStyles, textStyles){
        super()

     
        this.backgroundStyles = backgroundStyles;
        this.textStyles = textStyles
        
        this.redraw()
    }

    redraw(){
        
        const {backgroundStyles: bs, textStyles: ts} = this;

        // create text
        const {text, ...otherTextStyles} = ts;
        const textContent = text ? text : "";

        const textStyle = new PIXI.TextStyle(otherTextStyles)
        const textComponent = new PIXI.Text(textContent, textStyle);

        // create background
        const background = new PIXI.Graphics()

        // optionally add border
        if(bs.borderWidth > 0) background.lineStyle(bs.borderWidth, bs.borderFill, 1, 0)

        background.beginFill(bs.fill)
        if(bs.borderRadius > 0){
            background.drawRoundedRect(0, 0, bs.width, bs.height, bs.borderRadius)
        }else{
            background.drawRect(0,0,bs.width,bs.height)
        }
        background.endFill()

        // position text in center of background
        textComponent.position.set(bs.width / 2, bs.height / 2)
        textComponent.anchor.set(0.5)

        // create global references
        this.textComponent = textComponent;
        this.backgroundComponent = background;



        // add to component
        this.addChild(background)
        this.addChild(textComponent)
    }

    updateContent(text){
        this.textComponent.text = text;
    }


}

export default TextBox;