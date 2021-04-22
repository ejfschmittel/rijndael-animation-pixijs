import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import CircledText from "../../components/CircledText";
import SpriteBackground from "../../components/SpriteBackground"
import DataController from "../../core/DataController"
import Grid from "../../components/Grid2"

import SBox from "../../components/SBox2"
import PIXIText from "../../components/PIXIText"
import {gsap} from "gsap"

import PageTimeline from "./PageTimline"

import DefaultResponsives from "./Responsives.default"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"


class Page14 extends AnimationPage{
    constructor(){
        super();
        this.timeline = new PageTimeline(this);
      // this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)
        
    }


    create(defines){
        const background = this.createBackground();


        const title = new PIXIText("title", {fill: 0xffffff, fontSize: 30})
        this.bindPageLocale("title", title)

        const bar = new SpriteBackground();


        // utils 
        const equalsSymbol = new PIXI.Text("=", {fontSize: 40})
        equalsSymbol.anchor.set(.5, .5)

        const addSymbol = new CircledText("+");
        const addSymbol2 = new CircledText("+");

   
        // round key labels
        const gridSubtitleStyles = {fontSize: 16}

        const cipherKeyText = new PIXIText("cipherKeyLabel", gridSubtitleStyles)
        this.bindPageLocale("cipherKeyLabel", cipherKeyText)
        cipherKeyText.anchor.set(.5, 0)

        const roundOneKeyText = new PIXIText("roundKeyOneLabel", gridSubtitleStyles)
        this.bindPageLocale("roundKeyOneLabel", cipherKeyText)
        roundOneKeyText.anchor.set(.5, 0)

        const roundTwoKeyText = new PIXIText("roundKeyTwoLabel", gridSubtitleStyles)
        this.bindPageLocale("roundKeyTwoLabel", cipherKeyText)
        roundTwoKeyText.anchor.set(.5, 0)

        const roundThreeKeyText = new PIXIText("roundKeyThreeLabel", gridSubtitleStyles)
        this.bindPageLocale("roundKeyThreeLabel", cipherKeyText)
        roundThreeKeyText.anchor.set(.5, 0)

        const roundTenKeyText = new PIXIText("roundKeyTenLabel", gridSubtitleStyles)
        this.bindPageLocale("roundKeyTenLabel", cipherKeyText)
        roundTenKeyText.anchor.set(1.5, 0)


        const labelStyles = {fill: 0xffffff}

        const rotWordText = new PIXI.Text("RotWordLabel", labelStyles)
        this.bindPageLocale("RotWordLabel", rotWordText)
        const subBytesText = new PIXI.Text("SubBytesLabel", labelStyles)
        this.bindPageLocale("SubBytesLabel", subBytesText)
        const sboxText = new PIXI.Text("SBoxLabel")
        this.bindPageLocale("SBoxLabel", sboxText)


        subBytesText.anchor.set(1, .5)
        const Rcon4Text = new PIXI.Text("RconFourLabel")


       
        const textInitial = new PIXI.Text("textIntro", { wordWrap: true,wordWrapWidth: 160, fontSize: 14})
        this.bindPageLocale("textIntro", textInitial)
        textInitial.anchor.set(1, 0)


        const sText = new PIXI.Text("text", { wordWrap: true,wordWrapWidth: 160, fontSize: 14})
        this.bindPageLocale("text", sText)
        sText.anchor.set(1, 0)
     
        const aText = new PIXI.Text("textA", { wordWrap: true,wordWrapWidth: 160, fontSize: 14})
        this.bindPageLocale("textA", aText)
        aText.anchor.set(1, 0)

        const bText = new PIXI.Text("textB", { wordWrap: true,wordWrapWidth: 160, fontSize: 14})
        this.bindPageLocale("textB", bText)
        bText.anchor.set(1, 0)

        const textXor = new PIXI.Text("textXOR", { wordWrap: true,wordWrapWidth: 160, fontSize: 14})
        this.bindPageLocale("textXOR", textXor)
        textXor.anchor.set(1, 0)


        const sbox = new SBox();
        this.subscribeTo("sbox", sbox.grid.cells)
        sbox.redraw({width: 360, height: 240, legendWidth: 20}, {scale: .3}, {scale: .3})
        sbox.pivot.set(360, 240 / 2)



     

    
        const primaryGridOne = new Grid(4,4, {},{});
        const primaryGridTwo = new Grid(4,4, {},{});
        const primaryGridThree = new Grid(4,4, {},{});
        const primaryGridFour = new Grid(4,4, {},{});
        const primaryGrids = [primaryGridOne, primaryGridTwo, primaryGridThree, primaryGridFour]

        // create movables
        const pgOneMovablesOg = primaryGridOne.createMovables();
        const pgOneMovablesTranform = primaryGridOne.createMovables();
        this.subscribeTo("key-0", pgOneMovablesOg.movables)
        this.subscribeTo("key-0", pgOneMovablesTranform.movables)

        const pgTwoMovablesOg = primaryGridTwo.createMovables();
        const pgTwoMovablesTranform = primaryGridTwo.createMovables();
        this.subscribeTo("key-1", pgTwoMovablesOg.movables)
        this.subscribeTo("key-1", pgTwoMovablesTranform.movables)

        const pgThreeMovablesOg = primaryGridThree.createMovables();
        const pgThreeMovablesTranform = primaryGridThree.createMovables();
        this.subscribeTo("key-2", pgThreeMovablesOg.movables)
        this.subscribeTo("key-2", pgThreeMovablesTranform.movables)

        const pgFourMovablesOg = primaryGridFour.createMovables();
        this.subscribeTo("key-3", pgFourMovablesOg.movables)
        

        const subBytesMovables = primaryGridOne.createMovables();
        this.subscribeTo("dummyGrid", subBytesMovables.movables)
        
        const finalGrid = new Grid(4,4, {},{})
        const finalGridMovables = finalGrid.createMovables();
        this.subscribeTo("key-10", finalGridMovables.movables)


        const secondaryGridOne = new Grid(4,4, {},{});
        const secondaryGridTwo = new Grid(4,4, {},{});
        const secondaryGridThree = new Grid(4,4, {},{});
        const secondaryGridFour = new Grid(4,4, {},{});
        const secondaryGrids = [secondaryGridOne, secondaryGridTwo, secondaryGridThree, secondaryGridFour]


     

     

        const rcon = new Grid(4, 10, {},{})
        const rconText = new PIXI.Text("Rcon", {fill: 0xffffff, fontSize: 30})
        const rconMovables = rcon.createMovables()
        rcon.alpha = 0;
        this.subscribeTo("rcon", rconMovables.movables)
      

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
        subBytesText.position.set(sbox.x - 360, sbox.y )
        

        // redraw primary grids
        const {baseGridStyles, baseGridTextStyles} = defines
        const primaryGridsY = bar.y + bar.height + 50;
        primaryGrids.forEach((grid, idx) => {
            grid.redraw({...baseGridStyles}, baseGridTextStyles)

            const prevGrid = idx != 0 ? primaryGrids[idx -1] : null;
            const primaryGridsX = prevGrid ? prevGrid.x + baseGridStyles.width : 50;
            grid.position.set(primaryGridsX, primaryGridsY)
            
        })


        // redraw secondary grids
        const secondaryGridsY = primaryGridsY+ 200;
        secondaryGrids.forEach((grid, idx) => {
            grid.redraw({...baseGridStyles})

            const prevGrid = idx != 0 ? primaryGrids[idx -1] : null;
            const primaryGridsX = prevGrid ? prevGrid.x + baseGridStyles.width : 50;
            grid.position.set(primaryGridsX, secondaryGridsY)
            
        })


        // redraw final grid
        const {finalGridPos} = defines
        finalGrid.redraw({...baseGridStyles})
        finalGrid.position.set(finalGridPos.x, primaryGridsY)
        finalGrid.pivot.set(baseGridStyles.width, 0)

      
        // redraw rcon
        const {rconStyles} = defines;
        rcon.redraw({...rconStyles})
        rcon.position.set(rconStyles.x, rconStyles.y)
        rcon.pivot.set(rconStyles.width/2, rconStyles.height)
       
        rconText.position.set(rcon.x + rconStyles.width / 2 + 20, rcon.y - rconStyles.height / 2)
        rconText.anchor.set(0, .5)
   
    

      

        // redraw movables

        // grid movables

        const {pgFourMovablesOg,finalGridMovables} = this.globalComponents

        const {firstGridStyle} = defines

        const {gridMovableStyles, gridTextStyle, subbytesMovablesStyles, rconMovablesTextStyles, rconMovablesStyles} = defines

        this.redrawMovables(rconMovables, rcon, rconMovablesStyles,rconMovablesTextStyles)

        
        this.redrawMovables(pgOneMovablesOg, primaryGrids[0], {...firstGridStyle}, baseGridTextStyles)
        this.redrawMovables(pgOneMovablesTranform, primaryGrids[0], {...firstGridStyle},baseGridTextStyles)
        this.redrawMovables(pgTwoMovablesOg, primaryGrids[1], gridMovableStyles,baseGridTextStyles)
        this.redrawMovables(pgTwoMovablesTranform, primaryGrids[1], gridMovableStyles,baseGridTextStyles)
        this.redrawMovables(pgThreeMovablesOg, primaryGrids[2], gridMovableStyles,baseGridTextStyles)
        this.redrawMovables(pgThreeMovablesTranform, primaryGrids[2], gridMovableStyles,baseGridTextStyles)

        this.redrawMovables(subBytesMovables, primaryGrids[0], subbytesMovablesStyles,baseGridTextStyles)
        this.redrawMovables(pgFourMovablesOg, primaryGrids[3], gridMovableStyles,baseGridTextStyles)
        this.redrawMovables(finalGridMovables, finalGrid, gridMovableStyles,baseGridTextStyles)




        this.colorFirstCol(0x868486, pgTwoMovablesOg)
        this.colorFirstCol(0x868486, pgTwoMovablesTranform)
        this.colorFirstCol(0x868486, pgThreeMovablesOg)
        this.colorFirstCol(0x868486, pgThreeMovablesTranform)
        this.colorFirstCol(0x868486, pgFourMovablesOg)
        this.colorFirstCol(0x868486, finalGridMovables)


        
        // redraw lables
        const {cipherKeyText, roundOneKeyText, roundTwoKeyText, roundThreeKeyText, roundTenKeyText} = this.globalComponents; 
        const {roundKeyLabelStyles} = defines


  
      
        cipherKeyText.position.set(primaryGrids[0].x + baseGridStyles.width / 2, primaryGrids[0].y + baseGridStyles.height + 10)
        roundOneKeyText.position.set(primaryGrids[1].x + baseGridStyles.width / 2, primaryGrids[1].y + baseGridStyles.height + 10)
        roundTwoKeyText.position.set(primaryGrids[2].x + baseGridStyles.width / 2, primaryGrids[2].y + baseGridStyles.height + 10)
        roundThreeKeyText.position.set(primaryGrids[3].x + baseGridStyles.width / 2, primaryGrids[3].y + baseGridStyles.height + 10)
        roundTenKeyText.position.set(finalGrid.x + baseGridStyles.width / 2, finalGrid.y + baseGridStyles.height + 10)
          

        const {textXor, aText, bText, sText, textInitial} = this.globalComponents
        const {xorTextPos, sTextStylesPos, initialTextPos} = defines;
        textXor.position.set(xorTextPos.x, xorTextPos.y)


        textInitial.position.set(initialTextPos.x,initialTextPos.y)
        sText.position.set(sTextStylesPos.x, sTextStylesPos.y)
        aText.position.set(sText.x, sText.y + sText.height)
        bText.position.set(sText.x, aText.y + aText.height)

    }

    drawRoundKeyLabel(label, styles, position){
        label.redraw({
            ...styles,
        })
        label.position.set(position.x, position.y)
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


export default Page14;