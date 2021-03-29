import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"
import { TilingSprite } from "pixi.js";
class Page6DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}


        defines.abBaseTextStyles = {
            fill: this.COLORS.BG_GREY,
        }

        defines.animatableBackgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.COLORS.BG_WHITE,
        }

        defines.animatableBackgroundTitleStyles = {
            x: this.getWidth(90),
            y: this.getHeight(4),
           
        }

        defines.animatableBackgroundBarStyles = {
            width: this.getWidth(100),
            height: this.getHeight(4),
            fill: this.COLORS.BG_GREY
 
        }
      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.COLORS.BG_BLACK,
            borderWidth: 0,
        }


        defines.svgStyles = {
            width: 200,
            x: this.getWidth(20),
        }



        defines.label1Pos = {
            x: this.getWidth(90),
            y: 100,
        }

        defines.label2Pos = {
            x: this.getWidth(90),
            y: 300,
        }


        defines.label3Pos = {
            x: this.getWidth(90),
            y: 500,
        }

        defines.labelTextStyles = {
            scale: .8,
        }




        defines.roundedLabelStyles = {
            width: this.getWidth(16), 
            height: this.getHeight(4),
            fill: 0xff0000,
            borderWidth: 1,
            borderFill: 0x000000,
            borderRadius: 30,
        }

        defines.roundLabelTextStyles = {
            scale: .7
        }


        defines.addRoundKeyStyles = {
            fill: this.COLORS.LABEL_BG_GREEN
        }

        defines.subBytesStyles = {
            fill: this.COLORS.LABEL_BG_BLUE
        }

        defines.shiftRowsStyles = {
            fill: this.COLORS.LABEL_BG_RED
        }

        defines.mixColumnsStyles = {
            fill: this.COLORS.LABEL_BG_YELLOW
        }

    
    

        return defines;
    }





  
    createAnimationIn(){

        const tl = this.getAnimatableBackgroundTL();

       
        return tl;
    }


   


    getMotionPathDuration(start, end){
        return (end - start) * 10;
    }

   createAnimationMain(){
        const {runner, svg, container,  initialAddRoundKey, mrSubBytes, mrShiftRows, mrMixColumns, mrAddRoundKey,  frSubBytes, frShiftRows, frAddRoundKey,}  = this.getGlobalComponents();


        const svgData = svg.createPointsArray(40)

        const segOnePos = svg.info.pathOne / svg.info.totalLength
        const segTwoPos = svg.info.pathTwo / svg.info.totalLength
        const segThreePos = svg.info.pathThree / svg.info.totalLength
        const segFourPos = svg.info.pathFour / svg.info.totalLength;


        console.log(svg.info.segments.two)

        const tl = gsap.timeline()

        // INITIAL ROUND
        const segOneDuration = this.getMotionPathDuration(0, svg.info.segments.two.progress)
        tl.to(runner, {motionPath: {
            path: svgData,
            start: 0,
            end: svg.info.segments.two.progress,
        }, duration: segOneDuration,  ease: "none",}, "segOne")

        // initial add round key blink
        const [start, end] = this.getTimes(initialAddRoundKey.y - svg.y, svg.info.segments.one.length, segOneDuration)  
        tl.to(initialAddRoundKey.background,{pixi: {tint: this.COLORS.LABEL_BG_GREEN_HIGHLIGHT },duration: .001}, `segOne+=${start}`)
        tl.to(initialAddRoundKey.background,{pixi: {tint: this.COLORS.LABEL_BG_GREEN },duration: .001}, `segOne+=${end}`)
      

          // MAIN ROUNDS 1 - 8 
        const mainRoundTL = gsap.timeline({repeat: 7, onRepeat: () => {
            console.log("on repeat")
            tl.timeScale(3)
        }})
        mainRoundTL.add(this.getMainRoundTL(svgData))

        const segThreeDuration = this.getMotionPathDuration(svg.info.segments.three.progress, svg.info.segments.four.progress)
        mainRoundTL.set(runner, {pixi: {x: runner.x, y: runner.y}})
        mainRoundTL.to(runner, {motionPath: {
            path: svgData,  
            start: svg.info.segments.three.progress,
            end: svg.info.segments.four.progress,
            
        }, duration: segThreeDuration,  ease: "none",})


        tl.add(mainRoundTL)


          // MAIN ROUND 9 
        
        tl.add(this.getMainRoundTL(svgData))
        //tl.call(() => {tl.timeScale(1)})
        // FINAL ROUND

        const finalRoundDuration = this.getMotionPathDuration(svg.info.segments.five.progress, 1)

    
        
        tl.set(runner, {pixi: {x: runner.x, y: runner.y}})
        tl.to(runner, {motionPath: {
            path: svgData,  
            start: svg.info.segments.five.progress,
            end: 1,
        }, duration: finalRoundDuration,  ease: "none",}, "finalRound")

        const finalSegmentY = svg.y + svg.info.segments.five.y;
        const [frsbStart, frsbEnd] = this.getTimes(frSubBytes.y - finalSegmentY, svg.info.segments.five.length, finalRoundDuration)  


  
        tl.to(frSubBytes.background,{pixi: {tint: this.COLORS.LABEL_BG_BLUE_HIGHLIGHT },duration: .001}, `finalRound+=${frsbStart}`)
        tl.to(frSubBytes.background,{pixi: {tint: this.COLORS.LABEL_BG_BLUE },duration: .001}, `finalRound+=${frsbEnd}`)

        const [frsrStart, frsrEnd] = this.getTimes(frShiftRows.y - finalSegmentY, svg.info.segments.five.length, finalRoundDuration)  
        tl.to(frShiftRows.background,{pixi: {tint: this.COLORS.LABEL_BG_RED_HIGHLIGHT },duration: .001}, `finalRound+=${frsrStart}`)
        tl.to(frShiftRows.background,{pixi: {tint: this.COLORS.LABEL_BG_RED },duration: .001}, `finalRound+=${frsrEnd}`)

        const [frarStart, frarEnd] = this.getTimes(frAddRoundKey.y - finalSegmentY, svg.info.segments.five.length, finalRoundDuration)  
        tl.to(frAddRoundKey.background,{pixi: {tint: this.COLORS.LABEL_BG_GREEN_HIGHLIGHT },duration: .001}, `finalRound+=${frarStart}`)
        tl.to(frAddRoundKey.background,{pixi: {tint: this.COLORS.LABEL_BG_GREEN },duration: .001}, `finalRound+=${frarEnd}`)

        
     
        

        return tl;
    }

    
    getTimes = (relY, height, duration) => {
        const tOffset = .05;
        const percent = relY / height
        return [duration * (percent - tOffset), duration * (percent + tOffset) ]
    }




    getMainRoundTL(svgData){
        const {runner, svg,mrSubBytes, mrShiftRows, mrMixColumns, mrAddRoundKey} = this.getGlobalComponents();

 

        const mainRoundDuration = this.getMotionPathDuration(svg.info.segments.two.progress, svg.info.segments.three.progress)

        const tl = gsap.timeline()
        
        tl.set(runner, {pixi: {x: runner.x, y: runner.y}})
        tl.to(runner, {motionPath: {
            path: svgData,  
            start: svg.info.segments.two.progress,
            end: svg.info.segments.three.progress,
        }, duration: mainRoundDuration,  ease: "none",}, "mainRound")

        const [mrsbStart, mrsbEnd] = this.getTimes(mrSubBytes.y - svg.y - svg.info.segments.two.y, svg.info.segments.two.length, mainRoundDuration)  
        tl.to(mrSubBytes.background,{pixi: {tint: this.COLORS.LABEL_BG_BLUE_HIGHLIGHT },duration: .001}, `mainRound+=${mrsbStart}`)
        tl.to(mrSubBytes.background,{pixi: {tint: this.COLORS.LABEL_BG_BLUE },duration: .001}, `mainRound+=${mrsbEnd}`)

        const [mrsrStart, mrsrEnd] = this.getTimes(mrShiftRows.y -  svg.y -svg.info.segments.two.y, svg.info.segments.two.length, mainRoundDuration)  
        tl.to(mrShiftRows.background,{pixi: {tint: this.COLORS.LABEL_BG_RED_HIGHLIGHT },duration: .001}, `mainRound+=${mrsrStart}`)
        tl.to(mrShiftRows.background,{pixi: {tint: this.COLORS.LABEL_BG_RED },duration: .001}, `mainRound+=${mrsrEnd}`)

        const [mrmcStart, mrcmEnd] = this.getTimes(mrMixColumns.y -  svg.y -svg.info.segments.two.y, svg.info.segments.two.length, mainRoundDuration)  
        tl.to(mrMixColumns.background,{pixi: {tint: this.COLORS.LABEL_BG_YELLOW_HIGHLIGHT},duration: .001}, `mainRound+=${mrmcStart}`)
        tl.to(mrMixColumns.background,{pixi: {tint: this.COLORS.LABEL_BG_YELLOW },duration: .001}, `mainRound+=${mrcmEnd}`)

        // color, element, label, segmentY, segmentHeight, segmentDuration
        const [mrarStart, mrarEnd] = this.getTimes(mrAddRoundKey.y -  svg.y -svg.info.segments.two.y, svg.info.segments.two.length, mainRoundDuration)  
        tl.to(mrAddRoundKey.background,{pixi: {tint: this.COLORS.LABEL_BG_GREEN_HIGHLIGHT },duration: .001}, `mainRound+=${mrarStart}`)
        tl.to(mrAddRoundKey.background,{pixi: {tint: this.COLORS.LABEL_BG_GREEN },duration: .001}, `mainRound+=${mrarEnd}`)

        return tl;
    }
  

    createBlink(element,  blinkColor, duration){
        const ogColor = element.background.tint;
        const tl = gsap.timeline()
        tl.to(element.background,{pixi: {tint: blinkColor },duration: .001})
        tl.to(element.background,{pixi: {tint: ogColor },duration: .001, delay: duration})
        return tl;
    }



  
}

export default Page6DefaultResponsives