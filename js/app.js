/**
 * Created by JetBrains WebStorm.
 * User: emedinaa
 * Date: 24/02/13
 * Time: 08:42 PM
 * To change this template use File | Settings | File Templates.
 */
    const TOTALCIRCLE=10;
    const POSITIONR=900;
    const POSITIONL=50;
    const POSXCIRCLE=400;

    var stage;
    var pictures=new Array();
    var items=[];
    var current=0;
    var circle1;
    var circle2;
    var circle3;
    var content;
    var canvas;

$(document).ready(function()
{
    console.log("NO SEAN SAPOS" , "HOLA PIÑAN");
    console.log("ready ...",window.innerWidth);
    $('#pagecontent').hide();
    canvas=document.getElementById("canvas");
    content=document.getElementById("pagecontent");

    //header
        initHeader();
    //container
        initCanvas();
    //footer
        initFooter();
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
    hideCanvas(url);
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
       // canvas= document.getElementById("canvas");
        canvas.style.width=window.innerWidth+'px';
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

        circle1.addEventListener("mouseover", handleMouseOver);
        circle1.addEventListener("mouseout", handleMouseOut);
        circle2.addEventListener("mouseover", handleMouseOver);
        circle2.addEventListener("mouseout", handleMouseOut);
        circle3.addEventListener("mouseover", handleMouseOver);
        circle3.addEventListener("mouseout", handleMouseOut);

       // stage.addChild(btn1);
        JQUERY4U.WIDGETS.TWITTER.setAux(showData);
        JQUERY4U.WIDGETS.TWITTER.init();
        createjs.Ticker.addEventListener("tick", stage);
        $('#refresh-tweets').live('click', function(e)
        {
            reset();
            e.preventDefault();
            JQUERY4U.WIDGETS.TWITTER.setAux(showData);
            JQUERY4U.WIDGETS.TWITTER.init();
        });
        createjs.Ticker.setInterval(30);
        createjs.Ticker.setFPS(40);

        //Subscribe to the Tick class. This will call the tick
        //method at a set interval (similar to ENTER_FRAME with
        createjs.Ticker.addEventListener("tick", tick);
}
//footer  -------------------------------------------
function initFooter()
{

}
//canvas ----------------------------------------------
function changePage(url)
{
    console.log("change page ");
    //$('#canvas').hide();
    //$('#pagecontent').show();
    $('#pagecontent').load(url);
    $('#pagecontent').hide();
    $("#pagecontent").fadeIn(1500);
   // content.alpha=0;
   // TweenLite.to(content,0.8,{alpha:1});

}
function hideCanvas(url)
{
    $("#canvas").fadeOut(1200);
    //$("#pagecontent").fadeOut(500);
    changePage(url);
  //TweenLite.to(canvas,0.8,{css:{autoAlpha:0}});
  // TweenLite.to(canvas,0.8,{css:{alpha:0},onComplete:changePage,onCompleteParams:[url]})
}
function tick()
{
    var date=new Date();
    var tm=date.getTime();
    circle1.y=100+Math.cos(tm*0.002)*2;
    circle1.x=POSXCIRCLE+Math.cos(tm*0.003)*2;
    circle2.y=80+Math.cos(tm*0.003)*2;
    circle2.x=POSXCIRCLE+150+Math.cos(tm*0.0025)*2;

    circle3.y=220+Math.cos(tm*0.0025)*2;
    circle3.x=POSXCIRCLE+120+Math.cos(tm*0.002)*2;
    stage.update();
}
function handleMouseOut(evt)
{
    var scale=evt.target.aux;
    TweenLite.to(evt.target,0.5,{scaleX:scale,scaleY:scale, ease:Back.easeOut});
}
function handleMouseOver(evt)
{
    var scale=evt.target.aux;
    TweenLite.to(evt.target,0.5,{scaleX:scale+0.2,scaleY:scale+0.2, ease:Back.easeOut});
}

function reset()
{
    //stage.removeAllChildren();
    clearContent();
    stage.update();
    pictures=new Array();
    items=[];
    current=0;
}
function clearContent()
{
    if(!pictures)return;

    for(i=0;i<pictures.length;i++)
    {
       stage.removeChild(pictures[i]);
    }
}
function showData(data)
{

    //var count=0;
    $(data.results).each(function(i,v)
    {
       var obj=new Object();
       //console.log("user ",this.from_user," id ",this.id, " img ",this.profile_image_url+ " txt ",this.text);
       obj.id=this.id;
       obj.user=this.from_user;
       obj.url=this.profile_image_url;
       obj.txt=this.text;
       // item.push({id:this.id,user:this.from_user,url:this.profile_image_url});
        items.push(obj);
    });

    for(i=0;i<items.length;i++)
    {
        pictures[i] = new Image();
        pictures[i].src = items[i].url;//"assets/daisy.png";
        //pictures[i].crossOrigin = 'anonymous';
        pictures[i].onload = handleImageLoad;
   // pictures[count].data =150*count;
    }
}
function handleMouseOverTweet(evt)
{
   // console.log("txt >>> ",evt.target.aux);
}
function handleMouseOutTweet(evt)
{

}
function handleImageLoad(event)
{
    current++;
    if(current>=items.length)
    {
        var posX=0;
        var posY=0;
        for(i=0;i<pictures.length;i++)
        {
            var user=new UserImg(items[i],pictures[i]);
            user.regX=30;
            user.regY=30;
            stage.addChild(user);
            if(i<TOTALCIRCLE)
            {
                posX=POSITIONL
                posY=58*i+32;
            }else
            {
                posX=POSITIONR
                posY=58*(i-TOTALCIRCLE)+32;
            }
            user.x=posX;
            user.y=posY;
           /* bitmap.x = posX;
            bitmap.y = posY;
            bitmap.alpha=0;
            bitmap.scaleX=0.1;
            bitmap.scaleY=0.1;
            TweenLite.to(bitmap, 0.4, {alpha:1,scaleX:1,scaleY:1,delay:(1+0.15*i)});*/

            user.alpha=0;
            user.scaleX=0.1;
            user.scaleY=0.1;
            TweenLite.to(user, 0.4, {alpha:1,scaleX:1,scaleY:1,delay:(1+0.15*i)});
        }
        stage.update();
    }

}
