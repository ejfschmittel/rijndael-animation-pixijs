import Arrow, {ARROW_ORIENTATION as ARROW_ORIENTATION_CONST} from "./Arrow"

import * as PIXI from "pixi.js"

import Component from "./Component"


export const ARROW_ORIENTATION = ARROW_ORIENTATION_CONST

class ArrowWithText extends Component{

    constructor(arrowStyles={}, textStyles={}){
        super();

        this.textStyles = textStyles
        this.arrowStyles = arrowStyles;


        this.text = null;
        this.arrow = null;

        this.redraw();
    }

    redraw(){
        this.arrow = new Arrow(this.arrowStyles)

        const {text, ...textStyles} = this.textStyles
        const textStyle = new PIXI.TextStyle(textStyles)
        this.text = new PIXI.Text(text, textStyle)
        this.text.anchor.set(.5)
        this.text.position.set(this.arrow.width/2, this.arrow.height/2)

        if(this.arrowStyles.orientation == ARROW_ORIENTATION.UP || this.arrowStyles.orientation == ARROW_ORIENTATION.DOWN){
            this.text.rotation = 1.5708
        }

        this.addChild(this.arrow, this.text)
    }

}

export default ArrowWithText;