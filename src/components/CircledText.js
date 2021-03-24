import Component from "./Component"

import * as PIXI from "pixi.js"


class CircledText extends Component{
    constructor(text, textBaseStyle){
        super();

        this.textBaseStyle = textBaseStyle;

        this.text = new PIXI.Text(text, textBaseStyle)
    }

    updateContent(text){
        this.text.text = text;
    }

    redraw(cirlceStyles, textStyles){
        this.removeChildren();

        // draw cirlce
        const cs = {radius: 30, borderColor: 0xfffffff, borderWidth: 2, ...cirlceStyles}
        const circleComponent = new PIXI.Graphics();
        if(cs.borderWidth > 0) circleComponent.lineStyle(cs.borderWidth, cs.borderColor, 1, 0)  
        circleComponent.drawCircle(0,0, cs.radius);
        circleComponent.endFill();

        if(textStyles.scale) this.text.scale = textStyles.scale
        if(textStyles.fontSize) this.text.style.fontSize = textStyles.fontSize

        //this.text.position.set(this.width /2, this.height/2)
        this.text.anchor.set(.5)

        this.addChild(circleComponent, this.text)

    }
}

/*class CircledText extends Component{
    constructor(circleStyles, textStyles){
        super();

        this.circleStyles = circleStyles;
        
  
        this.textStyles = textStyles

        this.textComponent = null;
        this.cirlceComponent = null;

        this.redraw();
    }


    redraw(){

        const {circleStyles: cs, textStyles: ts} = this;

       
        const {text, ...otherTextStyles} = ts;
        const displayedText = text ? text : "";

        const textStyle = new PIXI.TextStyle(otherTextStyles)
        const textComponent = new PIXI.Text(displayedText, textStyle);

        const circleComponent = new PIXI.Graphics();
        console.log(cs)
        if(cs.borderWidth > 0) circleComponent.lineStyle(cs.borderWidth, cs.borderColor, 1, 0)
       
        circleComponent.drawCircle(0,0, cs.radius);
        circleComponent.endFill();


        // center text
        textComponent.anchor.set(.5)


        this.textComponent = textComponent
        this.addChild(circleComponent, textComponent)
    }
}*/

export default CircledText;