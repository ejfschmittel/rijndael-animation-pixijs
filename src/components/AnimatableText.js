import * as PIXI from "pixi.js"

import Component from "./Component"



class AnimatableText extends Component{
    constructor(baseTextStyles){
        super();



        const {text, ...baseTextStyle} = baseTextStyles

        this.chars = [...text].map((char, idx) => {           
            const charGraphic = new PIXI.Text(char, baseTextStyle);        
            this.addChild(charGraphic)
            return charGraphic;
        })
    }

    redraw(textStyles){

        textStyles = {scale: 1, letterspacing: 0, fontSize: 60, ...textStyles}

        this.chars.forEach((char, idx) => {
            const x = idx !== 0 ? this.chars[idx-1].x + this.chars[idx-1].width +  textStyles.letterspacing : 0;
            char.position.set(x,0)  

            if(char.style.fontSize != textStyles.fontSize)
                char.style.fontSize = textStyles.fontSize;
        })    

    }
}



export default AnimatableText