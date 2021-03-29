
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

class GridRow extends Component{
    constructor(title){
        super();
        this.title = new PIXI.Text(title, {})

        
        this.addSymbol = new CircledText("+", {fill: 0x333333, fontSize: 30, align: "center"})
        this.equalsSymbol = new PIXI.Text("=", {})

        
        this.grids = []
        for(let i = 0; i < 5; i++){
            const grid = new Grid(4,4, {},{})
            this.grids.push(grid);
        }

        this.addChild(this.title, ...this.grids, this.addSymbol, this.equalsSymbol)


    }

    getGridStyles(idx){
        if(this.gridStyles[idx]){
            return {...this.defaultGridStyles, ...this.gridStyles[idx]}
        }
        return this.defaultGridStyles
    }

    redraw(rowStyles, titleStyles, fontStyles){
        rowStyles = {
            width: 1000,
            gap: 10,
            margin: 10,
            titleSpace: 140,
            ...rowStyles
        }
        const {grids, title, addSymbol, equalsSymbol} = this

        // calculate space for grid
        const addSymbolGap = addSymbol.width * 2;
        const equalsSymbolGap = equalsSymbol.width * 2;
        const openSpace = rowStyles.width - addSymbolGap - equalsSymbolGap - rowStyles.titleSpace - 5 * rowStyles.gap - 2 ;
        const gridWidth = openSpace / 5;

        // redraw
        grids.forEach(grid => {
            grid.redraw({width: gridWidth, height: rowStyles.height - rowStyles.margin});
        })
        addSymbol.redraw({radius: 12, borderWidth: 1, borderColor: 0x333333},1)
        equalsSymbol.anchor.set(.5)

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