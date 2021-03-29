import Component from "./Component"
import * as PIXI from "pixi.js"

class Page5Path extends Component{
    constructor(){
        super();


        this.svg;
        this.path;
        this.points;

        this.info = {}
    }


    createPointsArray(steps=10){
        const points = this.path.points 
        const newPoints = []
        for(let i = 0; i < points.length; i+=2){

            const pointX = points[i]
            const pointY = points[i+1]
  
            if(i!=0){
                const startX = points[i-2]
                const startY = points[i-1]
                const xDist = pointX - startX;
                const yDist = pointY - startY;
                for(let i = 1; i < steps; i++){
                    const x = this.x + startX + xDist * (1/steps) * i;
                    const y = this.y + startY + yDist * (1/steps) * i;
                    newPoints.push({x, y})
                }
            }

            newPoints.push({x: this.x + points[i], y: this.y + points[i+1] })
        }
        return newPoints;
    }


    getPathPercent(element){
        

        const {width, height, segOne, segTwo, segThree, totalLength} = this.info;


        const bounds = element.getBounds();
        const yPos = bounds.y - this.y;
      

        

        if(yPos <= segOne){
            return yPos / totalLength;
        }else if(yPos <= segOne + segTwo){
            return yPos / totalLength;
        }

        return yPos + 2 * width + 2 * segTwo;




    }


    redraw(styles){
        this.removeChildren();

        const {width, height} = styles;

        const graphic = new PIXI.Graphics();


        const hSegments = [2,4,4];
        const yMul = height / hSegments.reduce((pv, cv) => pv + cv, 0);

        const yOne = yMul * hSegments[0];
        const yTwo = yOne + yMul * hSegments[1];


        const totalLength =  height + width * 2 + 2 * hSegments[1] * yMul;


        const getSegment = (y, length, prev) => {

            return {
                y,
                length,
                startDist: prev ? prev.startDist + prev.length : 0,
                progress: prev ? (prev.startDist + prev.length) / totalLength : 0,
            }
        }

        const segments = {}
        const one = getSegment(0, yMul * hSegments[0], null)
        const two = getSegment(yOne, yMul * hSegments[1], one)
        const three = getSegment(yTwo, yMul * hSegments[1] + width * 2, two)
        const four = getSegment(yOne, yMul * hSegments[1], three)
        const five = getSegment(yTwo, yMul * hSegments[2], four)
        

 


        this.info = {
            height: height,
            width: width,
            segments: {
                one,
                two,
                three,
                four,
                five
            },
            totalLength
        }


        graphic.lineStyle(2, 0x000000, 1, 0)
        graphic.moveTo(0,0)
        graphic.lineTo(0, yTwo)

        graphic.lineTo(width, yTwo)
        graphic.lineTo(width, yOne)
        graphic.lineTo(0, yOne)
        graphic.lineTo(0, height)
        

        this.svg = graphic;

        this.path = this.svg.currentPath;

        this.addChild(this.svg)

    }
}

export default Page5Path