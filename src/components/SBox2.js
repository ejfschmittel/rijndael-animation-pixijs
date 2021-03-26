

import * as PIXI from "pixi.js"
import Component from "./Component";
import Grid from "./Grid2";
import TextBox from "./TextBox2"

import {toHex} from "../utils/hex"


const defaultSBoxStyles = {
    width: 600,
    height: 500,
    legendWidth: 40,
}


const sBoxCellStyle = {
    fill: 0xffffff,
    borderWidth: 1,
    borderColor: 0x000000,
}

class SBox2 extends Component{
    constructor(){
        super();


        const hexadecimals = [...new Array(16)].map((_, idx) => toHex(idx ))

        this.title = new TextBox("hex")

        this.legendXLabel = new TextBox("x")
        this.legendX = new Grid(16, 1, {},{})
        this.legendX.cells.forEach((cell, i) => cell.updateContent(hexadecimals[i]))

        this.legendYLabel = new TextBox("y")
        this.legendY = new Grid(1, 16, {},{})    
        this.legendY.cells.forEach((cell, i) => cell.updateContent(hexadecimals[i]))


        this.grid = new Grid(16, 16, {}, {})

        this.addChild(this.title, this.legendXLabel, this.legendYLabel, this.legendX, this.legendY, this.grid)

    }


    redraw(sboxStyles, sBoxLegendStyles={}, sBoxTextStyles={}){
        sboxStyles = {...defaultSBoxStyles,...sboxStyles}

        const legendFontStyle = {scale: 1, ...sBoxLegendStyles}
        const cellFontStyle = {scale:1, ...sBoxTextStyles}

       

        const {width, height, legendWidth} = sboxStyles
        const hlf = legendWidth / 2


        const cellWidth = (width - legendWidth) / 16;
        const cellHeight = (height - legendWidth) / 16;

        this.title.redraw({width: legendWidth, height: legendWidth}, legendFontStyle)


        this.legendXLabel.redraw({width: hlf, height: height - legendWidth},legendFontStyle)
        this.legendXLabel.position.set(0, legendWidth)

        this.legendX.redraw({width: hlf, height: height - legendWidth}, legendFontStyle)
        this.legendX.position.set(hlf, legendWidth)


        this.legendYLabel.redraw({width: width - legendWidth, height: hlf},legendFontStyle)
        this.legendYLabel.position.set(legendWidth, 0)

        this.legendY.redraw({width: width - legendWidth, height: hlf}, legendFontStyle)
        this.legendY.position.set(legendWidth, hlf)

        this.grid.redraw({width: width -legendWidth, height: height - legendWidth },cellFontStyle)
        this.grid.position.set(legendWidth, legendWidth)


    }
}

export default SBox2;