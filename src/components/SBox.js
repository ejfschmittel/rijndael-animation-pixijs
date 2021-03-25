

import Grid from "./Grid"
import Component from "./Component"
import TextBox from "./TextBox"

import HexTextBox from "./HexadecimalTextBox"
import HexadecimalGrid from "./HexadecimalGrid"
import {toHex} from "../utils/hex"

import * as PIXI from "pixi.js"
/*

    {
        width,
        height,
        legendWidth: 0,
    }

*/


const defaultSBoxStyles = {
    fill: 0xffffff,
    borderWidth: 1,
    borderColor: 0x00000,
}


class SBox extends Component{
    constructor(SBoxStyles, legendFontStyles, cellFontStyle){
        super()
        this.SBoxStyles = SBoxStyles;
        this.legendFontStyles = legendFontStyles
        this.cellFontStyle = cellFontStyle

        this.grid = null;
        this.redraw();

    }

    redraw(){
        this.clear();
        const {width, height, legendWidth} = this.SBoxStyles
        const gridWidth = width - legendWidth;
        const gridHeight = height - legendWidth


        const boxWidth = Math.round(gridWidth / 16);
        const boxHeight = Math.round(gridHeight / 16);

        console.time("create-title")
        const title = new TextBox({...defaultSBoxStyles, width: legendWidth, height: legendWidth}, {text: "hex", ...this.legendFontStyles})
        console.timeEnd("creat-title")

        console.time("legend-x")
        const legendX = new TextBox({...defaultSBoxStyles, width: legendWidth / 2, height: boxHeight * 16}, {text: "x", ...this.legendFontStyles})
        legendX.position.set(0, legendWidth)

        const legendXIndex = new HexadecimalGrid(16, 1, {...defaultSBoxStyles, width: legendWidth / 2, height: boxHeight},{scale: .4})
        legendXIndex.cells.forEach((cell, idx) => cell.updateContent(toHex(idx)))
        legendXIndex.position.set(legendWidth / 2, legendWidth)
        console.timeEnd("legend-x")


        const legendY = new TextBox({...defaultSBoxStyles, width: boxWidth * 16, height: legendWidth / 2}, {text: "y", ...this.legendFontStyles})
        legendY.position.set(legendWidth, 0)

        const legendYIndex = new HexadecimalGrid(1, 16, {...defaultSBoxStyles, width: boxWidth, height:legendWidth / 2 },{scale: .4})
        legendYIndex.cells.forEach((cell, idx) => cell.updateContent(toHex(idx)))
        legendYIndex.position.set(legendWidth , legendWidth / 2)

        console.time("grid")
        const grid = new HexadecimalGrid(16, 16,  {...defaultSBoxStyles, width: boxWidth, height: boxHeight },{scale: .4})
        grid.position.set(legendWidth, legendWidth)
        console.timeEnd("grid")
    

        this.addChild(title, legendX, legendXIndex, legendY, legendYIndex, grid)
    }
}

export default SBox;

