

import * as PIXI from "pixi.js"

import TextBox from "./TextBox"

import Component from "./Component"


class MovablesCollector{
    constructor( movables, rows=1, cols=movables.length){
        this.movables = movables;
        this.cols = cols,
        this.rows = rows;
    }


    getRow(rowIndex){
        return this.movables.slice(rowIndex * this.cols, rowIndex * this.cols + this.cols)
    }

    getCol(colIndex){
        return this.movables.reduce((colArray, movable, idx) => {
            return idx % this.cols == colIndex ? [...colArray, movable] : colArray;
        }, [])
    }

    get(rowIndex, colIndex){
        return this.movables[rowIndex * this.cols + colIndex];
    }


}

class Grid extends Component{
    constructor(rows, cols, cellBackgroundStyles, cellTextStyles){
        super()
        this.rows = rows;
        this.cols = cols;
        this.cellBackgroundStyles = cellBackgroundStyles;
        this.cellTextStyles = cellTextStyles
        this.cells = [];

        this.redraw();
    }


    redraw(){
        this.clear()
    

        this.cells = []
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                const cell = new TextBox(this.cellBackgroundStyles, this.cellTextStyles)
                this.cells.push(cell)
                this.addChild(cell)

                // position child
                const cellX  = c * cell.width;
                const cellY = r * cell.height;
                cell.position.set(cellX, cellY)
            }
        }

        // set children sortable
        
    }

    createMovables(cellBackgroundStyle, cellTextStyle={}){
        const movableCells = []
        this.cells.forEach(cell => {
            const cellBounds = cell.getBounds()
            const movableCell = new TextBox(cellBackgroundStyle, cellTextStyle) 
            movableCell.position.set(cellBounds.x, cellBounds.y)
            movableCells.push(movableCell)
        })

        return new MovablesCollector(movableCells, this.rows, this.cols)
    }

    getRow(rowIndex){
        return this.cells.slice(rowIndex * this.cols, rowIndex * this.cols + this.cols)
    }

    getCol(colIndex){
        return this.cells.reduce((colArray, cell, idx) => {
            return idx % this.cols == colIndex ? [...colArray, cell] : colArray;
        }, [])
    }

    get(rowIndex, colIndex){
        return this.cells[rowIndex * this.cols + colIndex];
    }

}




export default Grid;