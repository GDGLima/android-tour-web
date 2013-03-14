/*
 * Created by JetBrains WebStorm.
 * User: emedinaa
 * Date: 24/02/13
 * Time: 08:42 PM
 * To change this template use File | Settings | File Templates.
 */
    const TOTALCIRCLE=10;
    //const POSITIONR=900;
    //const POSITIONL=50;
   // const POSXCIRCLE=400;
    const POSITIONR=1000;
    const POSITIONL=200;
    const POSXCIRCLE=530;

    var stage;
    var pictures=new Array();
    var items=[];
    var current=0;
    var circle1, circle2,circle3;
    var content;
    var canvas;
    var currentURL="";

    var socialapp;

$(document).ready(function()
{
    // console.log("NO SEAN SAPOS" , "HOLA PIÑAN");
    console.log("ready ...",window.innerWidth);
    $('#pagecontent').hide();
    canvas=document.getElementById("canvasapp");
    content=document.getElementById("pagecontent");

    //header
    initHeader();
    socialapp=new SocialApp();
    socialapp.app();
});

//header -------------------------------------------
function goHome(e)
{
    $("#pagecontent").fadeOut(1000);
    $("#canvas").fadeIn(1200);
   // $('#canvas').show();
    //$('#pagecontent').hide();
}
function navigationHandler(e)
{
    console.log("click ",e,e.target,e.target.id);
   // $('#canvas').hide();
   // $('#pagecontent').show();
    var url="#";
    switch(e.target.id)
    {
        case 'btnHome':
                console.log("click Home");
                url="assets/template/androidtour.html";
            break;
        case 'btnProgram':
                console.log("click Program");
            url="assets/template/program.html";
            break;
        case 'btnSpeaker':
                console.log("click Speaker");
            url="assets/template/speaker.html";
            break;
        case 'btnSponsor':
                console.log("click Sponsor");
            url="assets/template/sponsor.html";
            break;
        case 'btnTeam':
                console.log("click Team");
            url="assets/template/team.html";
            break;
    }
   // $('#pagecontent').load(url);
    currentURL=url;
    hideCanvas();
}

function initHeader()
{
    $('#btnHome').bind("click",navigationHandler);
    $('#btnProgram').bind("click",navigationHandler);
    $('#btnSpeaker').bind("click",navigationHandler);
    $('#btnSponsor').bind("click",navigationHandler);
    $('#btnTeam').bind("click",navigationHandler);
    $('#home').bind("click",goHome);
}
//container -------------------------------------------

function initCanvas()
{
    // JQUERY4U.WIDGETS.TWITTER.init();
        var canvas= document.getElementById("canvas");
        if(canvas == null)
            return;

        // canvas.style.width=window.innerWidth+'px';
        canvas.style.width = "100%";
        stage=new createjs.Stage(canvas);
        createjs.Touch.enable(stage);
        stage.enableMouseOver();

        //draw circle
        circle1=new Circle("GDGLima","#0FF");
        circle2=new Circle("GDGArequipa","#0FF");
        circle3=new Circle("AndroidTour","#0FF");
        stage.addChild(circle1);
        stage.addChild(circle2);
        stage.addChild(circle3);

        circle1.x=POSXCIRCLE;
        circle1.y=100;

        circle2.x=POSXCIRCLE+150;
        circle2.y=80;

        circle3.x=POSXCIRCLE+120;
        circle3.y=220;

        circle1.scaleX=0;
        circle1.scaleY=0;

        circle2.scaleX=0;
        circle2.scaleY=0;

        circle3.scaleX=0;
        circle3.scaleY=0;

        circle1.aux=1;
        circle2.aux=0.8;
        circle3.aux=0.9;

        TweenLite.to(circle1, 0.6, {alpha:1,scaleX:1,scaleY:1,delay:1});
        TweenLite.to(circle2, 0.6, {alpha:1,scaleX:0.8,scaleY:0.8,delay:1.3});
        TweenLite.to(circle3, 0.6, {alpha:1,scaleX:0.9,scaleY:0.9,delay:1.6});
        //events
}

//footer  -------------------------------------------
function initFooter()
{

}
//canvas ----------------------------------------------
function changePage()
{
    console.log("change page ");
    //$('#canvas').hide();
    //$('#pagecontent').show();
    $('#pagecontent').load(currentURL);
    $('#pagecontent').hide();
    $("#pagecontent").fadeIn(1500);
   // content.alpha=0;
   // TweenLite.to(content,0.8,{alpha:1});
}
function hideCanvas()
{
    $("#canvas").fadeOut(1200,changePage);
    //$("#pagecontent").fadeOut(500);
    //changePage(url);
  //TweenLite.to(canvas,0.8,{css:{autoAlpha:0}});
  // TweenLite.to(canvas,0.8,{css:{alpha:0},onComplete:changePage,onCompleteParams:[url]})
}

function reset()
{
    pictures=new Array();
   // items=[];
    current=0;
}


