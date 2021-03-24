import * as PIXI from "pixi.js"
import SpriteBackground from "./SpriteBackground"

class TextBox extends PIXI.Container{
    constructor(text, baseTextStyles){
        super();

        this.baseTextStyles = baseTextStyles;
        this.textStyles = null;

        this.background = new SpriteBackground();
        this.addChild(this.background)

        this.text = null;
    
        if(text){
            this.text = new PIXI.Text(text, baseTextStyles)
            this.addChild(this.text)
        }
    }



    updateContent(newText){
        if(!this.text){
            this.createText(newText);
        }else{
            this.text.text = newText;
        }
    }

    createText(text){
        this.text = new PIXI.Text(text)
        this.addChild(this.text)
    }


    redraw(bgStyles, textScale=1){
       
        this.background.redraw(bgStyles)

        if(this.text){
            this.text.scale.set(textScale)
            this.text.position.set(this.background.width/2, this.background.height/2)
            this.text.anchor.set(.5,.5)
        }
    }
}

export default TextBox;