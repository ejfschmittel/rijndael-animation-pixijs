
import * as PIXI from "pixi.js"


const baseTextStyles = {
    fill: 0xffffff,
    fontSize: 36,
}

class PIXIText extends PIXI.Text{

    constructor(text, styles={}){
        super(text, {...baseTextStyles, ...styles})
    }

    redraw(styles={}){
      
        const {fontSize, scale, fill, position, anchor, wordWrap, wordWrapWidth} = styles

        if(fontSize) this.style.fontSize = fontSize;
        if(scale) this.scale.set(scale)
        this.tint = fill || 0x000000;
        if(position)  this.position.set(position.x, position.y)
        if(anchor) this.anchor.set(anchor.x, anchor.y)
        if(wordWrap) this.style.wordWrap = wordWrap;
        if(wordWrapWidth) this.style.wordWrapWidth = wordWrapWidth
    }
}

export default PIXIText;