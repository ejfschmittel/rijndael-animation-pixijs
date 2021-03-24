

import AnimationController from "./core/AnimationController"

import Page1 from "../pages/Page1/Page"
import Page7 from "../pages/page7/Page"
import Page10 from "../pages/page10/Page"
import Page8 from "../pages/page8/Page"
import Page9 from "../pages/page9/Page"


export let rijndaelAnimationController = null;

export const createRijndaelAnimation = () => {
    rijndaelAnimationController = new AnimationController("rijndael-animation-container")
    rijndaelAnimationController.registerPage(Page1, "page-1", "Page 1 - Intro")
    rijndaelAnimationController.registerPage(Page7, "page-7", "Page 7 - SubBytes")
    rijndaelAnimationController.registerPage(Page8, "page-8", "Page 8 - SubBytes")
    rijndaelAnimationController.registerPage(Page9, "page-9", "Page 9 - MixColumns")
    rijndaelAnimationController.registerPage(Page10, "page-10", "Page 10 - AddRoundkey")
    rijndaelAnimationController.createTimeline();
    rijndaelAnimationController.goToPage("page-1");
}