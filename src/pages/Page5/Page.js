import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import AnimatableBackground from "../../components/AnimatableBackground"


import {gsap} from "gsap"
import Grid from "../../components/Grid2"

import DataController from "../../core/DataController"
import CircledText from "../../components/CircledText"
import DefaultResponsives from "./Responsives.default"

import SlowTextBox from "../../components/SlowTextBox"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax600 from "./Responsive.max-600"
import ResponsiveMax400 from "./Responsive.max-400"
import HexadecimalTextBox from "../../components/HexadecimalTextBox.js"
import SpriteBackground from "../../components/SpriteBackground.js"
import TextBox from "../../components/SlowTextBox"


import SVGPath from "../../components/Page5Path"

class Page5 extends AnimationPage{
    constructor(id, locale){
        super(id, locale);


        //this.registerResponsive("max-400", ResponsiveMax400)
        //this.registerResponsive("max-600", ResponsiveMax600)
        this.registerResponsive("default", DefaultResponsives)

        
    }


    create(defines){

        const background = this.createBackground();


        const svg = new SVGPath();
        
        const {abBaseTextStyles} = defines
        const animatableBackground = new AnimatableBackground(this.text("title"), abBaseTextStyles)

        // create big labels

        const labelTextBaseStyle = {
            fontSize: 40,
            fill: 0x666666,
            align: "center"
        }
        const labelBaseStyle = new PIXI.TextStyle(labelTextBaseStyle)

        const labelInitialRound = new PIXI.Text(this.text("titleInitialRound"), labelBaseStyle);

        const labelMainRounds = new PIXI.Text(this.text("titleMainRounds"), labelBaseStyle);

        const labelFinalRound = new PIXI.Text(this.text("titleFinalRound"), labelBaseStyle);


        
        //const container = new PIXI.Container();
        const runner = new SpriteBackground();
        //container.addChild(runner)
 


        // create labels
        const {roundedLabelStyles} = defines
        const initialAddRoundKey = new SlowTextBox(this.text("labelInitial"))

        const mrSubBytes = new SlowTextBox(this.text("labelMrone"))
        const mrShiftRows = new SlowTextBox(this.text("labelMrTwo"))
        const mrMixColumns = new SlowTextBox(this.text("labelMrThree"))
        const mrAddRoundKey = new SlowTextBox(this.text("labelMrFour"))

        const frSubBytes = new SlowTextBox(this.text("labelFrOne"))
        const frShiftRows = new SlowTextBox(this.text("labelFrTwo"))
        const frAddRoundKey = new SlowTextBox(this.text("labelFrThree"))

        //const mrAddRoundKey 

      
        this.addPermanent({
            background,animatableBackground, 
            labelInitialRound, labelMainRounds, labelFinalRound,
            runner,
            initialAddRoundKey,
            mrSubBytes, mrShiftRows, mrMixColumns, mrAddRoundKey,
            frSubBytes, frShiftRows, frAddRoundKey,
            svg,
        })

       // this.addToGlobalComponents({runner})
       
       this.sortChildren = true;
    }


    createSVG(styles){
        const {width, height} = styles;

        const graphic = new PIXI.Graphics();


        const yMul = height / 10;
        const yOne = yMul * 2;
        const yTwo = yOne + 4 * yMul;
        const yThree = height; 


        graphic.lineStyle(2, 0x000000, 1, 0)
        graphic.moveTo(0,0)
        graphic.lineTo(0, yTwo)

        graphic.lineTo(width, yTwo)
        graphic.lineTo(width, yOne)
        graphic.lineTo(0, yOne)
        graphic.lineTo(0, height)
        

        return graphic;
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, animatableBackground,
            labelInitialRound, labelMainRounds, labelFinalRound,
            initialAddRoundKey,
            mrSubBytes, mrShiftRows, mrMixColumns, mrAddRoundKey,
            frSubBytes, frShiftRows, frAddRoundKey,
            runner, container, svg,
        } = this.globalComponents

        // background redraw
        const { backgroundStyles} = defines
        background.redraw(backgroundStyles)


        // animatable background
        const {
            animatableBackgroundStyles: abStyles,
            animatableBackgroundTitleStyles: abTitleStyles,
            animatableBackgroundBarStyles: abBarStyles,
        } = defines

        animatableBackground.redraw(abStyles,abBarStyles,abTitleStyles)


        const barEnd = (animatableBackground.bar.y + animatableBackground.bar.height)
        const height = background.height - barEnd - 20;

       

        const {svgStyles} = defines
        svg.redraw({height, width: svgStyles.width});
        svg.position.set(svgStyles.x,barEnd + 10)


        const {label1Pos, label2Pos, label3Pos, labelTextStyles} = defines
        labelInitialRound.position.set(label1Pos.x, label1Pos.y)
        labelInitialRound.anchor.set(1,0)
        labelInitialRound.scale.set(labelTextStyles.scale)

        labelMainRounds.position.set(label2Pos.x, label2Pos.y)
        labelMainRounds.anchor.set(1,0)
        labelMainRounds.scale.set(labelTextStyles.scale)

        labelFinalRound.position.set(label3Pos.x, label3Pos.y)
        labelFinalRound.anchor.set(1,0)
        labelFinalRound.scale.set(labelTextStyles.scale)


        // draw svg labels
      
        runner.redraw({width: 50, height: 50, fill: 0x666666})
        runner.foreground.alpha=0;
        runner.anchor.set(.5)
        runner.position.set(svg.x, svg.y)

      const {roundedLabelStyles, roundLabelTextStyles, addRoundKeyStyles, mixColumnsStyles, shiftRowsStyles, subBytesStyles} = defines;
        initialAddRoundKey.redraw({...roundedLabelStyles, ...addRoundKeyStyles}, roundLabelTextStyles)
        mrSubBytes.redraw({...roundedLabelStyles, ...subBytesStyles}, roundLabelTextStyles)
        mrShiftRows.redraw({...roundedLabelStyles,...shiftRowsStyles}, roundLabelTextStyles)
        mrMixColumns.redraw({...roundedLabelStyles,...mixColumnsStyles}, roundLabelTextStyles)
        mrAddRoundKey.redraw({...roundedLabelStyles,...addRoundKeyStyles}, roundLabelTextStyles)
        frSubBytes.redraw({...roundedLabelStyles,...subBytesStyles}, roundLabelTextStyles)
        frShiftRows.redraw({...roundedLabelStyles,...shiftRowsStyles}, roundLabelTextStyles)
        frAddRoundKey.redraw({...roundedLabelStyles,...addRoundKeyStyles}, roundLabelTextStyles)

        // positions 
        initialAddRoundKey.position.set(svg.position.x, svg.position.y + svg.height * .1)
        initialAddRoundKey.pivot.set(initialAddRoundKey.width /2, initialAddRoundKey.height /2)

        // center 
        const mrStart = .4
        const mrDist = .07
        mrSubBytes.position.set(svg.position.x, svg.position.y + svg.height * (mrStart - 1.5 * mrDist ))
        mrSubBytes.pivot.set(mrSubBytes.width /2, mrSubBytes.height /2)

        mrShiftRows.position.set(svg.position.x, svg.position.y + svg.height * (mrStart - .5* mrDist ))
        mrShiftRows.pivot.set(mrShiftRows.width /2, mrShiftRows.height /2)

        mrMixColumns.position.set(svg.position.x, svg.position.y + svg.height * (mrStart + .5 * mrDist ))
        mrMixColumns.pivot.set(mrMixColumns.width /2, mrMixColumns.height /2)

        mrAddRoundKey.position.set(svg.position.x, svg.position.y + svg.height * (mrStart + 1.5 * mrDist ))
        mrAddRoundKey.pivot.set(mrAddRoundKey.width /2, mrAddRoundKey.height /2)

        // 0.5 + 0
        const frStart = .8
        const frDist = .07
        frSubBytes.position.set(svg.position.x, svg.position.y + svg.height * (frStart - frDist ))
        frSubBytes.pivot.set(frSubBytes.width /2, frSubBytes.height /2)

        frShiftRows.position.set(svg.position.x, svg.position.y + svg.height * (frStart ))
        frShiftRows.pivot.set(frShiftRows.width /2, frShiftRows.height /2)

        frAddRoundKey.position.set(svg.position.x, svg.position.y + svg.height * (frStart +  frDist ))
        frAddRoundKey.pivot.set(frAddRoundKey.width /2, frAddRoundKey.height /2)

  
    }
}


export default Page5;