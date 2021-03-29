import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import Arrow, {ARROW_ORIENTATION} from "../../components/Arrow"
import Component from "../../components/Component"
import Grid from "../../components/Grid2"

import CircledText from "../../components/CircledText";

import GridRow from "../../components/GridRow"



import {gsap} from "gsap"

import DataController from "../../core/DataController"


import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"
import HexadecimalTextBox from "../../components/HexadecimalTextBox.js"

class Page11 extends AnimationPage{
    constructor(id){
        super(id);


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


        const title1 = this.createTitle("Start of\nround", {fontSize: 30, align: "center"})
        const title2 = this.createTitle("After\nSubBytes", {fontSize: 30, align: "center"})
        const title3 = this.createTitle("After\nShiftRows", {fontSize: 30, align: "center"})
        const title4 = this.createTitle("After\nMixColumns", {fontSize: 30, align: "center"})
        const title5 = this.createTitle("Round key", {fontSize: 30, align: "center"})

       
        const titles = [title1, title2, title3, title4, title5]
        
        const row6 = new GridRow("round6")
        const row7 = new GridRow("round7")
        const row8 = new GridRow("round8")
        const row9 = new GridRow("round9")
        const row10 = new GridRow("round10")
       
        row10.addGridStyles(3, {fill: 0xCDCBCD})


        //inputRow.addGridStyles(1, {fill: 0xCDCBCD})
       
       
     
        const rows = [row6, row7, row8, row9, row10]


        rows.forEach((row, r) => {

            row.grids.forEach((grid, c) => {

                if(r == 0 && (c == 3 || c == 2 || c == 1)){

                }else{
                    DataController.subscribe("dummyGrid", grid.cells)
                }
                
            })
           
        })

        
        this.addPermanent({background,row6, row7, row8, row9, row10, title1, title2, title3, title4, title5})

        this.addToGlobalComponents({rows, titles})
     

       
    }


    drawPage(defines){
        // get permanent componenents
        const {
            background, row6, 
            titles, rows,
        } = this.globalComponents

        // destructure defines
        const {
            backgroundStyles,
        } = defines

        background.redraw(backgroundStyles)

        const {rowStyles, rowTitleStyles} = defines


        console.time("redraw-rows")
        rows.forEach((row, idx) => {
            row.redraw(rowStyles, rowTitleStyles);
            const y = idx !== 0 ? rows[idx-1].y + rows[idx-1].height : rowStyles.y;
            row.position.set(0, y + rowStyles.margin) 
        })
        console.timeEnd("redraw-rows")

       // const {titles} = this.globalComponents;
        const {titleStyles} = defines

        console.time("redraw-titles")
        titles.forEach((title, idx) => {
            title.scale.set(titleStyles.scale)
            title.position.set(row6.grids[idx].x + row6.grids[idx].width / 2, titleStyles.y)
        })
        console.timeEnd("redraw-titles")


       
    }
}


export default Page11;