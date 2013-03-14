/**
* author : emedinaa
*/
var circle1;
var circle2;
var circle3;
var fpsLabel;
var pos1;
var pos2;
var graphics;
var shape;
var posAux;
var t=0;
var arr=[];
var count=0;

$(document).ready(function()
{
    console.log("NO SEAN SAPOS" , "HOLA PIÑAN");
    console.log("ready ...",window.innerWidth);
    //$('#pagecontent').hide();
    canvas=document.getElementById("canvas");
    content=document.getElementById("pagecontent");

    //canvas

    canvas.style.width=window.innerWidth+'px';
    stage=new createjs.Stage(canvas);
    createjs.Touch.enable(stage);
    stage.enableMouseOver();

    // shape to draw vector data into:
	shape = new createjs.Shape();
	shape.x = 0;		//position in parent container
	graphics = shape.graphics;
    stage.addChild(shape);
    //drawline
    pos1={x:50,y:50};
    pos2={x:400,y:200};
    //createjs.graphics.setStrokeStyle(2);
    //createjs.graphics.moveTo(pos1.x,pos1.y);
    //createjs.graphics.lineTo(pos2.x,po2.y);

    createjs.Ticker.setInterval(30);
    createjs.Ticker.setFPS(40);
	
	fpsLabel = new createjs.Text("-- fps","bold 18px Arial","#FF00FF");
	stage.addChild(fpsLabel);
	fpsLabel.x=10;
	fpsLabel.y=10;

    t=pos1.x;
    graphics.moveTo(pos1.x,pos1.y);
    posAux=[pos1.x,pos1.y];
    graphics.setStrokeStyle(3).beginStroke(0xff00ff);
    var y1=0;
    for(i=0;i<200;i++)
    {
        //arr.push(posAux);
        y1=50 + 2*i+1;
        //posAux[0]=t;
        //posAux[1]=y1;
       // console.log(i,y1);
        arr.push({x:i, y:y1});
        //t++;
    }
    //Subscribe to the Tick class. This will call the tick
    //method at a set interval (similar to ENTER_FRAME with
    createjs.Ticker.addEventListener("tick", tick);
    graphics.moveTo(pos1.x,pos1.y);
    //rawLine();
    for(i=0;i<200;i++)
    {
        //graphics.moveTo(arr[count].x , arr[count].y);
        graphics.lineTo(arr[i].x, arr[i].y);
    }
    setInterval(drawLine,100);

    // start the line at the last position:

   /* // draw the line, and close the path:
    graphics.lineTo(pos2.x,pos2.y);*/
});
function drawLine()
{
    if(count>200)return;
    //graphics.clear();
    for(i=0;i<200;i++)
    {
        graphics.moveTo(arr[199-count].x , arr[199-count].y);
        graphics.lineTo(arr[i].x , arr[i].y);
    }
    count++;
}
function tick()
{
    fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS())+" fps";
   /* for(i=0;i<200;i++)
    {
        graphics.moveTo(arr[i][0],arr[i][1]);
        graphics.lineTo(arr[i][0]+1,arr[i][1]+1);
    }*/
    /*if(t<300)
    {
        //graphics.clear2100.();
        graphics.lineTo(posAux[0],posAux[1]);
        y1=pos1.x+2*t-1;
        posAux=[t,y1];
    }*/
    stage.update();
}