import AnimationController from "./core/AnimationController"
import LOCALE from "./languages/index"

import Page1 from "./pages/Page1/Page"
/*import Page2 from "./pages/Page2/Page"
import Page3 from "./pages/Page3/Page"
import Page4 from "./pages/Page4/Page"
import Page5 from "./pages/Page5/Page"
import Page6 from "./pages/Page6/Page"
import Page7 from "./pages/Page7/Page"
import Page8 from "./pages/Page8/Page"
import Page9 from "./pages/Page9/Page"
import Page10 from "./pages/Page10/Page"
import Page11 from "./pages/Page11/Page"
import Page12 from "./pages/Page12/Page"
import Page13 from "./pages/Page13/Page"
import Page14 from "./pages/Page14/Page"*/

const SETTINGS = {
    locale: LOCALE,
    themes: [
        {name: "default", className: "theme--default", localeKey: "themeOptionDefault"},
        {name: "new", className: "theme--new", localeKey: "themeOptionNew"},
    ]
}



class RijndaelAnimation extends AnimationController {
    constructor(){
        super(SETTINGS)

        this.registerAnimationPage(Page1, "page-1")

   
 
        this.buildTimeline()

        this.timeline.tl.play()
        console.log(this.timeline.tl)



        //this.timeline.tl.seek("page-1-animation-out",false)
    }
}

export default RijndaelAnimation;