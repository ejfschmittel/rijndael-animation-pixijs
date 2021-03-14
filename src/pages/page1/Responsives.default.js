import AnimationPageResponsives from "../../core/AnimationPageResponsives"


class Page1DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}


        defines.rect = {
            width: this.getWidth(50),
            height: this.getHeight(50),
        }

        return defines;
    }
}

export default Page1DefaultResponsives