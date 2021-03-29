
import Component from "./Component"
import Grid from "./Grid2"
import CircledText from "./CircledText"
import * as PIXI from "pixi.js"
/*

    const row = new GridRow(title)
    row.addGridSettings(1, {})
*/

import {COLORS} from "../utils/colors"

const defaultGridStyles = {
    fill: COLORS.CELL_BG_YELLOW
}

const lastColStyles = {
    fill: 0xC6C4C6,
}

class GridRow extends Component{
    constructor(title){
        super();
        this.title = new PIXI.Text(title, {})

        
        this.addSymbol = new CircledText("+", {fill: 0x333333, fontSize: 30, align: "center"})
        this.equalsSymbol = new PIXI.Text("=", {})

        this.gridStyles = {}

        this.grids = []
        for(let i = 0; i < 5; i++){
            const grid = new Grid(4,4, {},{})
            this.grids.push(grid);
        }

        this.addChild(this.title, ...this.grids, this.addSymbol, this.equalsSymbol)


    }

    addGridStyles(idx, styles){
        this.gridStyles[idx] = styles;
    }

    getGridStyles(idx){
        let gridStyles = defaultGridStyles;

        if(idx == 4) {
            gridStyles = {...gridStyles, ...lastColStyles}
        }

        if(this.gridStyles[idx]){
            gridStyles = {...defaultGridStyles, ...this.gridStyles[idx]}
        }
     
        return gridStyles
    }

    redraw(rowStyles, titleStyles, fontStyles){
        rowStyles = {
            width: 1000,
            gap: 10,
            margin: 10,
            titleSpace: 140,
            ...rowStyles
        }

        titleStyles = {scale: 1, rotation: 0, ...titleStyles}
        fontStyles = {scale: .5, ...fontStyles}

        const {grids, title, addSymbol, equalsSymbol} = this


        title.scale.set(titleStyles.scale)
        title.rotation = titleStyles.rotation

        // calculate space for grid
        const addSymbolGap = addSymbol.width * 2;
        const equalsSymbolGap = equalsSymbol.width * 2;
        const openSpace = rowStyles.width - addSymbolGap - equalsSymbolGap - rowStyles.titleSpace - 5 * rowStyles.gap - 2 ;
        const gridWidth = openSpace / 5;

        // redraw
        grids.forEach((grid, idx) => {
            const styles = this.getGridStyles(idx)
            grid.redraw({width: gridWidth, height: rowStyles.height - rowStyles.margin, ...styles}, {scale: .3});
        })
        addSymbol.redraw({radius: 12, borderWidth: 1, borderColor: 0x333333},1)
        addSymbol.scale.set(.5)

        equalsSymbol.anchor.set(.4)
        equalsSymbol.scale.set(.4)
        

        title.anchor.set(.5,.5)

        // position

        title.position.set(rowStyles.titleSpace / 2, grids[0].height/2)
        grids[0].position.set(rowStyles.titleSpace, 0)

        for(let i = 1; i < 4; i++){
            const grid = grids[i];
            const prevGrid = grids[i-1]
            grid.position.set(prevGrid.x + prevGrid.width + rowStyles.gap,0)
        }

        
        addSymbol.position.set(grids[3].x + grids[3].width + addSymbol.width, grids[0].height /2)

        grids[4].position.set(addSymbol.x + addSymbol.width, 0)

        equalsSymbol.position.set(grids[4].x + grids[4].width + equalsSymbol.width, grids[0].height / 2)
    }
}

export default GridRow;