import AnimationPageResponsives from "../../core/AnimationPageResponsives"


class ResponsiveMax375 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width < 375) return true;
        return false;
    }

    getDefines(defines){
        
        
        defines.textStyles = {
            ...defines.textStyles, 
            fontSize: 14,
            wordWrapWidth: 280,
            position: {
                x: this.getWidth(10),
                y: this.getHeight(80)
            }
        }

        
        defines.galoisFieldStyles = {
            ...defines.galoisFieldStyles,
            width: 120,
            height: 100,
        }

       
        defines.gridStyles = {
            ...defines.gridStyles,
            width: 160,
            height: 120,
        }

        defines.gridFontStyles = {
            ...defines.gridFontStyles, 
            fontSize: 18
        }

        return defines;
    }
}

export default ResponsiveMax375