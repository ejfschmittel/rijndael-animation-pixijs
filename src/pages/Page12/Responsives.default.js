import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"
class Page7DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}

      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-gamma"),
            borderWidth: 0,
        }


        defines.rowStyles = {
            width: this.getWidth(96),
            height: this.getHeight(15),
            margin: this.getHeight(1),
            x: this.getWidth(2),
            y: this.getHeight(10),
            gap: 20,
        }

        defines.rowTitleStyles = {
            x: 20,
            fontSize: 20,
        }


        defines.titleStyles = {
            y: this.getHeight(5),
            anchor: {
                x: .5,
                y: .5
            },
            fontSize: 16,
            fill: this.c("--text-color")
        }

        defines.defaultGridStyles = {
            fill: this.c("--grid-background-alpha")
        }

        defines.emptyGridStyles = {
            fill: this.c("--grid-background-eta")
        }

        defines.lastColGridStyles = {
            fill: this.c("--grid-background-eta")
        }

        defines.highlightGridStyles = {
            fill: this.c("--grid-background-beta")
        }



        return defines;
    }




  
}

export default Page7DefaultResponsives