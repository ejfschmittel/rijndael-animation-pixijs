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
        
        const inputRow = new GridRow("input")
        const row1 = new GridRow("round1")
        const row2 = new GridRow("round2")
        const row3 = new GridRow("round3")
        const row4 = new GridRow("round4")
        const row5 = new GridRow("round5")


        inputRow.addGridStyles(1, {fill: 0xCDCBCD})
        inputRow.addGridStyles(2, {fill: 0xCDCBCD})
        inputRow.addGridStyles(3, {fill: 0xCDCBCD})
        inputRow.addGridStyles(4, {fill: 0x0090FF})
       
     
        const rows = [inputRow, row1, row2, row3, row4, row5]


        rows.forEach((row, r) => {

            row.grids.forEach((grid, c) => {

                if(r == 0 && (c == 3 || c == 2 || c == 1)){

                }else{
                    DataController.subscribe("dummyGrid", grid.cells)
                }
                
            })
           
        })

        
        this.addPermanent({background, row1, row2, row3, row4, row5, title1, title2, title3, title4, title5, inputRow})

        this.addToGlobalComponents({rows, titles})
     

       
    }


    drawPage(defines){
        // get permanent componenents
        const {
            background, row1, row2, row3, row4, row5,
            title1, title2, title3, title4, title5,
            titles, rows,
        } = this.globalComponents

        // destructure defines
        const {
            backgroundStyles,
        } = defines

        background.redraw(backgroundStyles)

        const {rowStyles, rowTitleStyles} = defines


  
        rows.forEach((row, idx) => {
            row.redraw(rowStyles, rowTitleStyles);
            const y = idx !== 0 ? rows[idx-1].y + rows[idx-1].height : rowStyles.y;
            row.position.set(0, y + rowStyles.margin) 
        })
  

       // const {titles} = this.globalComponents;
        const {titleStyles} = defines


        titles.forEach((title, idx) => {
            title.scale.set(titleStyles.scale)
            title.position.set(row1.grids[idx].x + row1.grids[idx].width / 2, titleStyles.y)
        })



       
    }
}


export default Page11;