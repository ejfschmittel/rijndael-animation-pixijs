import * as PIXI from "pixi.js"

import TextBox from "./TextBox2.js"

class ResponsiveGrid extends PIXI.Container{

    constructor(rows, cols, bgStyles, textStyles){
        super();
        this.cols = cols;
        this.rows = rows;
        this.bgStyles = bgStyles;
        this.textStyles = textStyles;

        this.cells = [...new Array(this.cols * this.rows)].map((_,idx) => {
            const cell = new TextBox()
            this.addChild(cell)
            return cell;
        })
    }


    redraw(bgStyles, textStyles){

        bgStyles = {width: 300, height: 200, ...bgStyles}

        const cellWidth = bgStyles.width / this.cols;
        const cellHeight = bgStyles.height / this.rows;

        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                const cell = this.cells[r * this.cols + c];
                cell.redraw({...bgStyles, width: cellWidth, height: cellHeight}, textStyles)
                cell.position.set(cellWidth * r, cellHeight * c)
            }
        }
  
    }

    // get col etc


}

export default ResponsiveGrid;