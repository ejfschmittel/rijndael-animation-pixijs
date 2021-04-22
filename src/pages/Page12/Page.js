import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import Arrow, {ARROW_ORIENTATION} from "../../components/Arrow"
import Component from "../../components/Component"
import Grid from "../../components/Grid2"

import CircledText from "../../components/CircledText";
import PIXIText from "../../components/PIXIText"
import GridRow from "../../components/GridRow"



import {gsap} from "gsap"

import DataController from "../../core/DataController"


import PageTimeline from "./PageTimline"
import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"
import HexadecimalTextBox from "../../components/HexadecimalTextBox.js"

class Page12 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimeline(this)
        this.registerResponsive("max-400", ResponsiveMax400)
       // this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }



    createTitle(text, baseStyles){
        const title = new PIXI.Text(text, baseStyles)
        title.anchor.set(.5, .5)
        return title;
    }

    create(defines){
        const background = this.createBackground();



        // titles
        const title1 = new PIXIText("roundLabel")
        this.bindPageLocale("roundLabel", title1)

        const title2 = new PIXIText("subBytesLabel")
        this.bindPageLocale("subBytesLabel", title2)

        const title3 = new PIXIText("ShiftRowsLabel")
        this.bindPageLocale("ShiftRowsLabel", title3)

        const title4 = new PIXIText("MixColumnsLabel")
        this.bindPageLocale("MixColumnsLabel", title4)

        const title5 = new PIXIText("RoundKeyLabel")
        this.bindPageLocale("RoundKeyLabel", title5)

        const titles = [title1, title2, title3, title4, title5]
        

        // rows
        const row6 = new GridRow("roundSixLabel")
        this.bindPageLocale("roundSixLabel", row6.title)

        const row7 = new GridRow("roundSevenLabel")
        this.bindPageLocale("roundSevenLabel", row7.title)

        const row8 = new GridRow("roundEightLabel")
        this.bindPageLocale("roundEightLabel", row8.title)

        const row9 = new GridRow("roundNineLabel")
        this.bindPageLocale("roundNineLabel", row9.title)

        const row10 = new GridRow("roundTenLabel")
        this.bindPageLocale("roundTenLabel", row10.title)
       
        const rows = [row6, row7, row8, row9, row10]


        
        //this.subscribeTo("initial-state",inputRow.grids[0].cells)
        //this.subscribeTo("key-0",inputRow.grids[4].cells)

        for(let i = 6; i <= 10; i++){
            const row = rows[i-6];
            row.grids.forEach((grid, c) => {
                switch(c){
                    case 0: this.subscribeTo(`round-${i}-initial`, grid.cells); break;
                    case 1: this.subscribeTo(`after-sub-bytes-${i}`, grid.cells); break;
                    case 2: this.subscribeTo(`after-shift-rows-${i}`, grid.cells); break;
                    case 3: this.subscribeTo(`after-mix-columns-${i}`, grid.cells); break;
                    case 4: this.subscribeTo(`key-${i}`, grid.cells); break;
                }
            })
        }


      

        
        this.addPermanent({background,row6, row7, row8, row9, row10, title1, title2, title3, title4, title5})

        this.addToGlobalComponents({rows, titles})
     

       
    }


    drawPage(defines){
        // get permanent componenents
        const {
            background, 
        } = this.globalComponents

        // destructure defines
        const {
            backgroundStyles,
        } = defines

        background.redraw(backgroundStyles)

       

    

        const {rows, row6} = this.globalComponents;
        const {rowStyles, rowTitleStyles, defaultGridStyles, emptyGridStyles, highlightGridStyles, lastColGridStyles} = defines
        for(let i = 0; i < rows.length; i++){
            const row = rows[i];
            row.redraw(rowStyles, rowTitleStyles, {
                default: defaultGridStyles,
                4: lastColGridStyles
            });
            const y = i !== 0 ? rows[i-1].y + rowStyles.height : rowStyles.y;
            row.position.set(0, y + rowStyles.margin) 
        }


        // redraw titles
        const {titleStyles} = defines
        const {titles} = this.globalComponents
        titles.forEach((title, idx) => {
            title.redraw(titleStyles)
            title.position.set(row6.grids[idx].x + rows[0].gridWidth / 2, titleStyles.y)
        })



       
    }
}


export default Page12;