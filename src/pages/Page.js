import * as PIXI from "pixi.js"
import AnimationPage from "../core/AnimationPage"

class TestPage extends AnimationPage{
    constructor(){

        super();

       
    }

    init(){
        const backgroundGraphics = new PIXI.Graphics();
        backgroundGraphics.beginFill(0xff0000);
        backgroundGraphics.drawRect(0,0, 100, 100)
        backgroundGraphics.endFill();

        console.log(this.addChild)
        this.addChild(backgroundGraphics)
    }
}

export default TestPage
