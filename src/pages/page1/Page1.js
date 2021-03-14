import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"


import Page1DefaultResponsives from "./Responsives.default"

class TestPage extends AnimationPage{
    constructor(id){
        super(id);

        this.registerResponsive("default", Page1DefaultResponsives)
    }

    draw(defines){
      

        const {rect} = defines

        const backgroundGraphics = new PIXI.Graphics();
        backgroundGraphics.beginFill(0xff0000);
        backgroundGraphics.drawRect(0,0, rect.width, rect.height)
        backgroundGraphics.endFill();

        this.addChild(backgroundGraphics)
    }
}


export default TestPage;