import AnimationPageResponsives from "../../core/AnimationPageResponsives"

class Page2DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);


        this.FADE_OUT_DELAY = 0;
    }


    

    getDefines(){

        const defines = {}


        // base styles
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-alpha"),
        }
     
    
       
        // center box styles
        defines.textBoxStyles = {
            width: this.getWidth(50),
            height: this.getHeight(40),
            borderWidth: 3,
            borderColor: 0xffffff,
            fill: this.c("--encryptor-box"),
            x: this.getWidth(50),
            y: this.getHeight(50),
            anchorX: .5,
            anchorY: .5,
        }

     

        // arrow styles
        defines.textBoxTextStyles = {
            fill: this.c("--text-light"), 
            align: "center",
            fontSize: 40
        }




        defines.arrowStyles = {
            fill: 0x000000,
            borderWidth: 3,
            borderColor: 0xfffffff,
            width: this.getWidth(10),
            height: this.getHeight(20),
        }

        defines.arrowFontStyles = {
            fill: 0xffffff,
            fontSize: 18,
        }

        defines.arrowLeftStyles = {
            ...defines.arrowStyles,
            width: this.getWidth(16),
            height: this.getHeight(10),
        }

        defines.arrowTextBottomStyles = {
            fill: this.c("--text-color-alpha")
        }



        return defines;
    }

}

export default Page2DefaultResponsives