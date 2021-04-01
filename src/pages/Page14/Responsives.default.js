import AnimationPageResponsives from "../../core/AnimationPageResponsives"


import {hexStringToInt} from "../../utils/hex"
import {shiftArray} from "../../utils/utils"

import {gsap} from "gsap"
class Page7DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}

      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.COLORS.BG_GREY,
            borderWidth: 0,
        }

        defines.barStyles = {
            width: this.getWidth(100),
            height: this.getHeight(5),
            fill: this.COLORS.BG_WHITE,
            borderWidth: 0,
        }

        defines.baseGridStyles = {
            width: 120,
            height: 100,
            fill: this.COLORS.BG_GREY,
        }

        defines.finalGridPos = {
            x: this.getWidth(96),
        }

        defines.titleStyles = {
            y: 10, 
            x: this.getWidth(90),
            scale: 1,
        }

        defines.sboxStyles = {
            x: this.getWidth(80),
            y: this.getHeight(60),
        }


        defines.rconStyles = {
            fill: this.COLORS.CELL_BG_YELLOW,
            width: this.getWidth(20),
            height: this.getHeight(10),
            x: this.getWidth(50),
            y: this.getHeight(96),
     

   
        }

        defines.rconMovableStyles = {

        }


        defines.firstGridStyle = {
            fill: this.COLORS.BG_BLUE,
        }

        defines.gridMovableStyles = {
            fill: 0xC2C0C2,
        }

        defines.gridTextStyle = {
            scale: .8,
        }

        
        defines.subbytesMovablesStyles = {
            fill: this.COLORS.CELL_BG_DARK_YELLOW
        }


        defines.xorTextPos = {
            x: this.getWidth(96),
            y: this.getHeight(50)
        }
    
        return defines;
    }




    moveXL(idx=4, movablesOne, movablesTwo, ogMovables){
        const {
            equalsSymbol,
            primaryGrids,
            secondaryGrids,
            addSymbol
        } = this.getGlobalComponents();
        // idx refers to 0-15 to global grid idx
        const col1Idx = idx - 3;
        const col2Idx = idx;
        const col3Idx = idx + 3;
        const resColIdx = idx +1; 

    

        // movables
        const col1 = movablesOne.getCol(col1Idx % 4);
        const col2 = movablesTwo.getCol(col2Idx % 4);

        console.log(col1Idx % 4)
        console.log(col1)

        const colRes = movablesTwo.getCol(resColIdx % 4);

        // landings
        const landingsAddOne = secondaryGrids[Math.floor(col1Idx / 4)].getCol(col1Idx % 4)
        const landingsAddTwo = secondaryGrids[Math.floor(col2Idx / 4)].getCol(col2Idx % 4)
        const landingsAddRes = secondaryGrids[Math.floor(col3Idx / 4)].getCol(col3Idx % 4)
        const landingsReturn = primaryGrids[Math.floor(resColIdx / 4)].getCol(resColIdx % 4)


        console.log(landingsAddOne)

 
     
    

        const tl = gsap.timeline();

        // position addition symbol

        const addCell = secondaryGrids[Math.floor((idx-1) / 4)].get(2, (idx-1) % 4)
        const addPos = addCell.getBounds();

        const equalsCell = secondaryGrids[Math.floor((idx+2) / 4)].get(2, (idx+2) % 4)
        const equalsPos = equalsCell.getBounds();

        // prep
        tl.set(equalsSymbol, {pixi: {x: equalsPos.x, y: equalsPos.y}})
        tl.set(addSymbol, {pixi: {x: addPos.x, y: addPos.y}})
        tl.set([...colRes, equalsSymbol, addSymbol], {pixi: {alpha: 0}})        
        tl.add(this.moveGroup(colRes, landingsAddRes, {duration: .001}))

        // move columns down
        tl.add(this.moveGroup(col1, landingsAddOne,{duration: 1}))
        tl.add(this.moveGroup(col2, landingsAddTwo,{duration: 1}))

        // reval equation
        tl.to(addSymbol, {pixi: {alpha: 1}})
        tl.to(equalsSymbol, {pixi: {alpha: 1}})
        tl.to(colRes, {pixi: {alpha: 1}})       

        // move back
        tl.add(this.moveGroup(colRes, landingsReturn, {duration: 1}),)

        // hide equation + cleanup
        tl.to( [...col1, ...col2, equalsSymbol, addSymbol], {pixi: {alpha: 0}})
        tl.set(ogMovables.getCol(resColIdx % 4), {pixi: {alpha: 1}})
        
        return tl;
    }


    shiftColumn(movables, landings, settings={}){
        const tl = gsap.timeline();


       const landingBoundsFirst = this.getBounds(landings[0])
       const landingBoundsLast = this.getBounds(landings[3])
      


       tl.to(movables[0], {pixi: {
           ...landingBoundsLast,
           x: landingBoundsLast.x - 100,
            y: (landingBoundsLast.y + landingBoundsFirst.y) / 2,
           zIndex: 10,
        }, duration: 1}, "shift-col")
        tl.to(movables[0], {pixi: {...landingBoundsLast, zIndex: 10}, duration: 1})



       for(let i = 1; i < movables.length; i++){
           const bounds = this.getBounds(landings[i-1])
           tl.to(movables[i], {pixi: {...bounds, zIndex: 5}, duration: .8}, "shift-col+=1")
       }

       tl.set(movables, {pixi: {zIndex: 1}})   

        return tl;
    }


    getSecondaryGridBounds(index){
        const {secondaryGrids} = this.getGlobalComponents();
        const bounds = secondaryGrids[Math.floor(index / 4)].get(2,index % 4).getBounds();
        return {x: bounds.x, y: bounds.y}
    }




    createPreFadeIn(){
        const {
            equalsSymbol,
            pgTwoMovablesOg,
            pgTwoMovablesTranform,
            pgThreeMovablesOg,
            pgThreeMovablesTranform,
            addSymbol,
            addSymbol2,
            subBytesMovables,
            sbox,
            subBytesText,
            cipherKeyText,
            roundOneKeyText,
            roundTwoKeyText
        } = this.getGlobalComponents();
        const tl = gsap.timeline();

        // hide movables and symbols
        tl.set([...subBytesMovables.movables,...pgTwoMovablesTranform.movables, ...pgTwoMovablesOg.movables, ...pgThreeMovablesOg.movables, ...pgThreeMovablesTranform.movables], {pixi: {alpha: 0}})
        tl.set([addSymbol, addSymbol2, equalsSymbol, cipherKeyText, roundOneKeyText, roundTwoKeyText], {pixi: {alpha: 0}})
  

      

        return tl;
    }


    createAnimationMain(){

        const {
            background, 
            primaryGrids,
            secondaryGrids,
            equalsSymbol,
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
            rconMovables,
            addSymbol,
            addSymbol2,
            subBytesMovables,
            sbox
        } = this.getGlobalComponents();

        const tl = gsap.timeline();

        /* START ANIMATION FIRST RCON COL 4 */

        // define landings + movable columns


        // subbytes movables


        // movables

        tl.add(this.createFirstSubByteTimeline())



    


        /* COL 5 - 8 */
        
        // first box
        tl.add(this.moveXL(4, pgOneMovablesTranform, pgTwoMovablesTranform, pgTwoMovablesOg))
        tl.add(this.moveXL(5, pgOneMovablesTranform, pgTwoMovablesTranform, pgTwoMovablesOg))
        tl.add(this.moveXL(6, pgOneMovablesTranform, pgTwoMovablesTranform, pgTwoMovablesOg))
        



        

        return tl;
    }



    createSubByteTimeline(toSubCol, subbedCol, landings){
        const {sbox, subBytesText } = this.getGlobalComponents();
        const tl = gsap.timeline();

        const shiftedColum = shiftArray([...toSubCol], 1)

        //subbytes movabes, shifted col

        // move subbyte movables to equation landings
        tl.add(this.moveGroup(subbedCol, landings), {duration: .001})

        // reveal sbox


        tl.to([sbox, subBytesText], {pixi: {alpha: 1}})
        


        // reveal subbytes from sbox
        for(let i = 0; i < 4; i++){           
            const cellLanding = this.getSubByteCellLanding(shiftedColum[i])
            const cellSub = subbedCol[i]

            if(i == 0){
                tl.set(cellSub, {pixi: {...this.getBounds(cellLanding)}})
                tl.to(cellSub, {pixi: {alpha: 1}})
                tl.to(cellSub, {pixi: {...this.getBounds(landings[0])}})
            }else{
                // highlight sbox cell + reveal cell landing
                tl.to(cellLanding.getBackground(), {pixi: {tint: "0xff0000"}})
                tl.to(cellSub, {pixi: {alpha: 1}})
                tl.to(cellLanding.getBackground(), {pixi: {tint: "0xffffff"}})
            }
        }

        // hide sbox
        tl.to([sbox, subBytesText], {pixi: {alpha: 0}})

        return tl;
    }


    createFirstSubByteTimeline(){
        
        const {
            primaryGrids,
            secondaryGrids,
            equalsSymbol,
            pgOneMovablesTranform,
            pgTwoMovablesOg,
            pgTwoMovablesTranform,
            rconMovables,
            addSymbol,
            addSymbol2,
            subBytesMovables
        } = this.getGlobalComponents();

        const tl = gsap.timeline();

        // movables
        const lastColMovables = pgOneMovablesTranform.getCol(3);
        const firstColMovables =  pgOneMovablesTranform.getCol(0)
        const rconColMovables = rconMovables.getCol(0)
        const resultMovables = pgTwoMovablesTranform.getCol(0)

        // landing
        const lastColOgLanding = primaryGrids[0].getCol(3);
        const addOneLanding = secondaryGrids[0].getCol(0)
        const addTwoLanding = secondaryGrids[0].getCol(3)
        const addThreeLanding = secondaryGrids[1].getCol(2)
        const resultLanding = secondaryGrids[2].getCol(1)
        const resultDestinationLanding = primaryGrids[1].getCol(0)

        // hide + move result column to initial result position
        tl.set([...resultMovables], {pixi: {alpha: 0}})
        tl.add(this.moveGroup(resultMovables, resultLanding, {duration: .001}))

        // move symbols to positions (hidden)
        tl.set(addSymbol, {pixi: {...this.getSecondaryGridBounds(2)}})
        tl.set(addSymbol2, {pixi: {...this.getSecondaryGridBounds(5)}})
        tl.set(equalsSymbol, {pixi: {...this.getSecondaryGridBounds(8)}})
        
        
        // move down and shift col
        tl.add(this.moveGroup(lastColMovables, addTwoLanding, {duration: 1}))
        tl.add(this.shiftColumn(lastColMovables, addTwoLanding, {}))
    

        // subbytes
        tl.add(this.createSubByteTimeline(
            lastColMovables,
            subBytesMovables.getRow(0),
            addTwoLanding
        ))
      

        // move adds and reveal equation
        tl.add(this.moveGroup(firstColMovables, addOneLanding, {duration: 1}))
        tl.to(addSymbol, {pixi: {alpha: 1}})

        tl.add(this.moveGroup(rconColMovables, addThreeLanding, {duration: 1}))
        tl.to(addSymbol2, {pixi: {alpha: 1}})
        tl.to(equalsSymbol, {pixi: {alpha: 1}})
        tl.to(resultMovables, {pixi: {alpha: 1}})

        // move back result
        tl.add(this.moveGroup(resultMovables, resultDestinationLanding, {duration: 1}))

        // hide / reset equation

        // show column underneath result (for moving later)
        tl.set(pgTwoMovablesOg.getCol(0), {pixi: {alpha: 1}})

        // hide equation
        tl.to([addSymbol, addSymbol2, equalsSymbol], {pixi: {alpha: 0}})
        tl.to([...lastColMovables, ...firstColMovables, ...rconColMovables, ...subBytesMovables.movables], {pixi: {alpha: 0}})

        // move last col back
        tl.add(this.moveGroup(lastColMovables, lastColOgLanding, {duration: .001}))
        tl.set(lastColMovables, {pixi: {alpha: 1}})

        return tl;

    }


    getSubByteCellLanding(cell){
        const {sbox} = this.getGlobalComponents()
        const text = cell.text.text
        const subX = hexStringToInt(text[0])
        const subY = hexStringToInt(text[1])
        const cellLanding = sbox.grid.get(subX, subY) 
        return cellLanding;
    }



  
}

export default Page7DefaultResponsives