import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import CircledText from "../../components/CircledText";
import SpriteBackground from "../../components/SpriteBackground"
import DataController from "../../core/DataController"
import Grid from "../../components/Grid2"

import SBox from "../../components/SBox2"
import {gsap} from "gsap"

import DefaultResponsives from "./Responsives.default"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"


class Page13 extends AnimationPage{
    constructor(id, locale){
        super(id, locale);

      // this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)
        
    }


    create(defines){
        const background = this.createBackground();


        const title = new PIXI.Text(this.text("title"), {fill: 0xffffff, fontSize: 30})
        const bar = new SpriteBackground();


        // utils 
        const equalsSymbol = new PIXI.Text("=", {fontSize: 40})
        equalsSymbol.anchor.set(.5, .5)

        const addSymbol = new CircledText("+");
        const addSymbol2 = new CircledText("+");

        // grid subtitles
        const gridSubtitleStyles = {fontSize: 16}
        const cipherKeyText = new PIXI.Text(this.text("cipherKeyLabel"), gridSubtitleStyles)
        const roundOneKeyText = new PIXI.Text(this.text("roundKeyOneLabel"), gridSubtitleStyles)
        const roundTwoKeyText = new PIXI.Text(this.text("roundKeyTwoLabel"), gridSubtitleStyles)
        const roundThreeKeyText = new PIXI.Text(this.text("roundKeyThreeLabel"), gridSubtitleStyles)
        const roundTenKeyText = new PIXI.Text(this.text("roundKeyTenLabel"), gridSubtitleStyles)
        cipherKeyText.anchor.set(.5, 0)
        roundOneKeyText.anchor.set(.5, 0)
        roundTwoKeyText.anchor.set(.5, 0)
        roundThreeKeyText.anchor.set(.5, 0)
        roundTenKeyText.anchor.set(1.5, 0)


        const labelStyles = {fill: 0xffffff}

        const rotWordText = new PIXI.Text(this.text("RotWordLabel"), labelStyles)
        const subBytesText = new PIXI.Text(this.text("SubBytesLabel"), labelStyles)
        const sboxText = new PIXI.Text(this.text("SBoxLabel"))
        subBytesText.anchor.set(1, .5)

        const Rcon4Text = new PIXI.Text(this.text("RconFourLabel"))


       
        const textInitial = new PIXI.Text(this.text("textIntro"), { wordWrap: true,wordWrapWidth: 160, fontSize: 14})
        textInitial.anchor.set(1, 0)


        const sText = new PIXI.Text(this.text("text"), { wordWrap: true,wordWrapWidth: 160, fontSize: 14})
        sText.anchor.set(1, 0)
     
        const aText = new PIXI.Text(this.text("textA"), { wordWrap: true,wordWrapWidth: 160, fontSize: 14})
        aText.anchor.set(1, 0)

        const bText = new PIXI.Text(this.text("textB"), { wordWrap: true,wordWrapWidth: 160, fontSize: 14})
        bText.anchor.set(1, 0)

        const textXor = new PIXI.Text(this.text("textXOR"), { wordWrap: true,wordWrapWidth: 160, fontSize: 14})
        textXor.anchor.set(1, 0)


        const sbox = new SBox();
        DataController.subscribe("sbox", sbox.grid.cells)
        sbox.redraw({width: 360, height: 240, legendWidth: 20}, {scale: .3}, {scale: .3})
        sbox.pivot.set(sbox.width, sbox.height / 2)



     

    
        const primaryGridOne = new Grid(4,4, {},{});
        const primaryGridTwo = new Grid(4,4, {},{});
        const primaryGridThree = new Grid(4,4, {},{});
        const primaryGridFour = new Grid(4,4, {},{});
        const primaryGrids = [primaryGridOne, primaryGridTwo, primaryGridThree, primaryGridFour]

        // create movables
        const pgOneMovablesOg = primaryGridOne.createMovables();
        const pgOneMovablesTranform = primaryGridOne.createMovables();
        DataController.subscribe("dummyGrid", pgOneMovablesOg.movables)
        DataController.subscribe("dummyGrid", pgOneMovablesTranform.movables)

        const pgTwoMovablesOg = primaryGridTwo.createMovables();
        const pgTwoMovablesTranform = primaryGridTwo.createMovables();
        DataController.subscribe("dummyGrid", pgTwoMovablesOg.movables)
        DataController.subscribe("dummyGrid", pgTwoMovablesTranform.movables)

        const pgThreeMovablesOg = primaryGridThree.createMovables();
        const pgThreeMovablesTranform = primaryGridThree.createMovables();
        DataController.subscribe("dummyGrid", pgThreeMovablesOg.movables)
        DataController.subscribe("dummyGrid", pgThreeMovablesTranform.movables)

        const pgFourMovablesOg = primaryGridFour.createMovables();
        DataController.subscribe("dummyGrid", pgFourMovablesOg.movables)
        

        const subBytesMovables = primaryGridOne.createMovables();
        DataController.subscribe("dummyGrid", subBytesMovables.movables)
        
        const finalGrid = new Grid(4,4, {},{})
        const finalGridMovables = finalGrid.createMovables();
        DataController.subscribe("dummyGrid", finalGridMovables.movables)


        const secondaryGridOne = new Grid(4,4, {},{});
        const secondaryGridTwo = new Grid(4,4, {},{});
        const secondaryGridThree = new Grid(4,4, {},{});
        const secondaryGridFour = new Grid(4,4, {},{});
        const secondaryGrids = [secondaryGridOne, secondaryGridTwo, secondaryGridThree, secondaryGridFour]


     

     

        const rcon = new Grid(4, 10, {},{})
        const rconText = new PIXI.Text("Rcon", {fill: 0xffffff, fontSize: 30})
        const rconMovables = rcon.createMovables()
        rcon.alpha = 0;
        DataController.subscribe("rcon", rconMovables.movables)
      

        this.addPermanent({
            background, bar, title, 
            primaryGridOne, primaryGridTwo, primaryGridThree, primaryGridFour, 
            secondaryGridOne, secondaryGridTwo, secondaryGridThree, secondaryGridFour,
            rcon, rconText, finalGrid,
            equalsSymbol,
            addSymbol,
            addSymbol2,
            sbox,
            roundOneKeyText, roundTwoKeyText, cipherKeyText, roundThreeKeyText, roundTenKeyText,
            rotWordText, sboxText,subBytesText,
            textXor,
            textInitial, sText, aText, bText
            
        })


        this.addChild(
            ...pgOneMovablesOg.movables, 
            ...pgOneMovablesTranform.movables,
            ...pgTwoMovablesOg.movables, 
            ...pgTwoMovablesTranform.movables,
            ...pgThreeMovablesOg.movables, 
            ...pgThreeMovablesTranform.movables,
            ...rconMovables.movables,
            ...subBytesMovables.movables,
            ...finalGridMovables.movables,
            ...pgFourMovablesOg.movables
        )
        this.addToGlobalComponents({
            pgFourMovablesOg,
            finalGridMovables,
            subBytesMovables, rconMovables, primaryGrids, secondaryGrids, 
            pgOneMovablesTranform, pgOneMovablesOg, pgTwoMovablesOg, 
            pgTwoMovablesTranform, pgThreeMovablesOg, pgThreeMovablesTranform})
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, 
            primaryGrids,
            secondaryGrids,
            rcon,
            rconText,
            title,
            bar,
            finalGrid,
            pgOneMovablesOg,
            pgOneMovablesTranform,
            pgTwoMovablesOg,
            pgTwoMovablesTranform,
            pgThreeMovablesOg,
            pgThreeMovablesTranform,
            addSymbol,
            sbox,
            rconMovables,
            addSymbol2,
            subBytesMovables,
            subBytesText
        } = this.globalComponents

        // destructure defines
        const {
            backgroundStyles,
            
        } = defines

        background.redraw(backgroundStyles)


        addSymbol.redraw({radius: 16, borderColor: 0x333333}, 1)
        addSymbol2.redraw({radius: 16, borderColor: 0x333333}, 1)

        /// redraw title and bar
        const {barStyles, titleStyles} = defines;
        title.scale.set(titleStyles.scale)
        title.position.set(titleStyles.x, titleStyles.y)
        title.anchor.set(1, 0)
        bar.redraw(barStyles)
        bar.position.set(0, title.y * 2 + title.height)
    

       // sbox.redraw({width: 300, height: 200})
     
       const {sboxStyles} = defines
        sbox.position.set(sboxStyles.x, sboxStyles.y)
        subBytesText.position.set(sbox.x - sbox.width , sbox.y )
        

        // redraw primary grids
        const {baseGridStyles} = defines
        const primaryGridsY = bar.y + bar.height + 50;
        primaryGrids.forEach((grid, idx) => {
            grid.redraw({...baseGridStyles})

            const prevGrid = idx != 0 ? primaryGrids[idx -1] : null;
            const primaryGridsX = prevGrid ? prevGrid.x + prevGrid.width : 50;
            grid.position.set(primaryGridsX, primaryGridsY)
            
        })


        // redraw secondary grids
        const secondaryGridsY = primaryGridsY+ 200;
        secondaryGrids.forEach((grid, idx) => {
            grid.redraw({...baseGridStyles})

            const prevGrid = idx != 0 ? primaryGrids[idx -1] : null;
            const primaryGridsX = prevGrid ? prevGrid.x + prevGrid.width : 50;
            grid.position.set(primaryGridsX, secondaryGridsY)
            
        })


        // redraw final grid
        const {finalGridPos} = defines
        finalGrid.redraw({...baseGridStyles})
        finalGrid.position.set(finalGridPos.x, primaryGridsY)
        finalGrid.pivot.set(finalGrid.width, 0)

      
        // redraw rcon
        const {rconStyles} = defines;
        rcon.redraw({...rconStyles})
        rcon.position.set(rconStyles.x, rconStyles.y)
        rcon.pivot.set(rcon.width/2, rcon.height)
       
        rconText.position.set(rcon.x + rcon.width / 2 + 20, rcon.y - rcon.height / 2)
        rconText.anchor.set(0, .5)
   
    

      

        // redraw movables

        // grid movables

        const {pgFourMovablesOg,finalGridMovables} = this.globalComponents

        const {firstGridStyle} = defines

        const {gridMovableStyles, gridTextStyle, subbytesMovablesStyles} = defines

        this.redrawMovables(rconMovables, rcon, {fill: 0xffff00},{scale: .5})

        
        this.redrawMovables(pgOneMovablesOg, primaryGrids[0], {...firstGridStyle}, gridTextStyle)
        this.redrawMovables(pgOneMovablesTranform, primaryGrids[0], {...firstGridStyle},gridTextStyle)
        this.redrawMovables(pgTwoMovablesOg, primaryGrids[1], gridMovableStyles,gridTextStyle)
        this.redrawMovables(pgTwoMovablesTranform, primaryGrids[1], gridMovableStyles,gridTextStyle)
        this.redrawMovables(pgThreeMovablesOg, primaryGrids[2], gridMovableStyles,gridTextStyle)
        this.redrawMovables(pgThreeMovablesTranform, primaryGrids[2], gridMovableStyles,gridTextStyle)

        this.redrawMovables(subBytesMovables, primaryGrids[0], subbytesMovablesStyles,gridTextStyle)
        this.redrawMovables(pgFourMovablesOg, primaryGrids[3], gridMovableStyles,gridTextStyle)
        this.redrawMovables(finalGridMovables, finalGrid, gridMovableStyles,gridTextStyle)




        this.colorFirstCol(0x868486, pgTwoMovablesOg)
        this.colorFirstCol(0x868486, pgTwoMovablesTranform)
        this.colorFirstCol(0x868486, pgThreeMovablesOg)
        this.colorFirstCol(0x868486, pgThreeMovablesTranform)
        this.colorFirstCol(0x868486, pgFourMovablesOg)
        this.colorFirstCol(0x868486, finalGridMovables)


        
        // C2C0C2

        const {cipherKeyText, roundOneKeyText, roundTwoKeyText, roundThreeKeyText, roundTenKeyText} = this.globalComponents;
        
        cipherKeyText.position.set(primaryGrids[0].x + primaryGrids[0].width / 2, primaryGrids[0].y + primaryGrids[0].height + 10)
        roundOneKeyText.position.set(primaryGrids[1].x + primaryGrids[1].width / 2, primaryGrids[1].y + primaryGrids[1].height + 10)
        roundTwoKeyText.position.set(primaryGrids[2].x + primaryGrids[2].width / 2, primaryGrids[2].y + primaryGrids[2].height + 10)
        roundThreeKeyText.position.set(primaryGrids[3].x + primaryGrids[3].width / 2, primaryGrids[3].y + primaryGrids[3].height + 10)
        roundTenKeyText.position.set(finalGrid.x + finalGrid.width / 2, finalGrid.y + finalGrid.height + 10)
          

        const {textXor, aText, bText, sText, textInitial} = this.globalComponents
        const {xorTextPos, sTextStylesPos, initialTextPos} = defines;
        textXor.position.set(xorTextPos.x, xorTextPos.y)


        textInitial.position.set(initialTextPos.x,initialTextPos.y)
        sText.position.set(sTextStylesPos.x, sTextStylesPos.y)
        aText.position.set(sText.x, sText.y + sText.height)
        bText.position.set(sText.x, aText.y + aText.height)

    }

    colorFirstCol(color, grid){
        grid.getCol(0).map(cell => cell.getBackground().tint = color);
    }

    redrawMovables(movablesController, grid, movablesStyles={}, movablesTextStyles={}){
        movablesController.movables.forEach((movable, idx) => {
           const {x,y,width, height}= grid.cells[idx].getBounds()          
           movable.redraw({width, height, ...movablesStyles},{scale: 1, ...movablesTextStyles});
           movable.position.set(x, y)        
       })
    }


   




}


export default Page13;