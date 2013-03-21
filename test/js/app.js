/**
* author : emedinaa
*/
var circle1;
var circle2;
var circle3;
var fpsLabel;

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

    //draw circle
    circle1=new Circle("GDGLima","#C5423A",150);
    stage.addChild(circle1);
    //circle1.scaleX=1.1;
    //circle1.scaleY=1.1;

    circle2=new Circle("GDGLima","#0A9853",150);
    stage.addChild(circle2);
    circle2.scaleX=0.8;
    circle2.scaleY=0.8;
    //#F8C63F
    circle3=new Circle("GDGLima","#F8C63F",150);
    stage.addChild(circle3);

    circle3.scaleX=0.6;
    circle3.scaleY=0.6;

    circle1.x=200;
    circle1.y=180;  
    circle2.x=530;
    circle2.y=180;    
    
    circle3.x=800;
    circle3.y=180;

    createjs.Ticker.setInterval(30);
    createjs.Ticker.setFPS(40);
	
	fpsLabel = new createjs.Text("-- fps","bold 18px Arial","#FF00FF");
	stage.addChild(fpsLabel);
	fpsLabel.x=10;
	fpsLabel.y=10;



    //Subscribe to the Tick class. This will call the tick
    //method at a set interval (similar to ENTER_FRAME with
    createjs.Ticker.addEventListener("tick", tick);
});
function tick()
{

    circle1.rotation+=1;
    circle2.rotation-=1;
    circle3.rotation+=1;

    fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS())+" fps";
    stage.update();
}