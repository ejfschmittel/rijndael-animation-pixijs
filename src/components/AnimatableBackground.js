import Component from "./Component"

import * as PIXI from "pixi.js"

class AnimatableBackground extends Component{
    constructor(backgroundStyles, barStyles, textStyles){
        super();
        this.backgroundStyles = backgroundStyles;
        this.barStyles = barStyles;
        this.textStyles = textStyles;

        this.backgroundComponent = null;
        this.barComponent = null;
        this.textComponent = null;

        this.redraw();
    }


    redraw(){

        const {backgroundStyles: bs, barStyles: es, textStyles: ts} = this;

        const backgroundComponent = new PIXI.Graphics();
        backgroundComponent.beginFill(bs.fill)
        backgroundComponent.drawRect(0,0, bs.width, bs.height)
        backgroundComponent.endFill();
    
        const barComponent = new PIXI.Graphics();
        barComponent.beginFill(es.fill)
        barComponent.drawRect(0,0, es.width, es.height)
        barComponent.endFill();


        const {text,x,y,anchorX, anchorY, ...otherTextStyles} = ts;
        const displayText = text ? text : "";
        const textStyle = new PIXI.TextStyle(otherTextStyles)
        const textComponent = new PIXI.Text(displayText, textStyle)

        this.backgroundComponent = backgroundComponent;
        this.barComponent = barComponent;
        this.textComponent = textComponent

        textComponent.position.set(x, y)
        textComponent.anchor.set(1, 0)
        barComponent.position.set(0, es.y)
        


        this.addChild(backgroundComponent, barComponent, textComponent)
    }

}

export default AnimatableBackground