import Component from "./Component"

import * as PIXI from "pixi.js"
import PIXIText from "./PIXIText"


class CircledText extends Component{
    constructor(text, textBaseStyle){
        super();

        this.textStyles = {...textBaseStyle};

        this.text = new PIXIText(text, textBaseStyle)
    }

    updateContent(text){
        this.text.text = text;
    }

    redraw(cirlceStyles, textStyles){
        this.removeChildren();

        this.textStyles = {...this.textStyles, ...textStyles}

        // draw cirlce
        const cs = {radius: 30, borderColor: 0xfffffff, borderWidth: 2, ...cirlceStyles}
        const circleComponent = new PIXI.Graphics();
        if(cs.borderWidth > 0) circleComponent.lineStyle(cs.borderWidth, cs.borderColor, 1, 0)  
        circleComponent.drawCircle(0,0, cs.radius);
        circleComponent.endFill();


        this.text.redraw({
            ...this.textStyles,
            anchor: {x: .5, y: .5}
        })


        this.addChild(circleComponent, this.text)

    }
}



export default CircledText;