/**
 * Created by JetBrains WebStorm.
 * User: emedinaa
 * Date: 02/03/13
 * Time: 02:43 PM
 * To change this template use File | Settings | File Templates.
 */

//CANVAS ------------------------------
var stage;
var canvas;
//TIMER -------------------------------
var _current=0;
var _timerTweet;
//DATA --------------------------------
var _arrLine=[];
var tweetData=[];
var _arrLEFT=[];
var _arrRIGTH=[];

//POSITION ----------------------------
var _posXLEFT=0;
var _posXRIGTH=0;
var _posXCircle=0;
var _center=0;
//-------------------------
var _stateActive=false;
var _factor=0.005;

var SocialApp=function()
{
    this.tweets=tweetData;
    this.init=function()
    {
        //console.log("init");
        _arrLine=[];
        _posXLEFT=0;//100
        _posXRIGTH=0;//Config.STAGEWIDTH-100-40;

        JQUERY4U.WIDGETS.TWITTER.setAux(this.showData);
    }
    this.showData=function(data)
    {
       // console.log("showdata");
        $(data.results).each(function(i,v)
        {
           var obj=new Object();
          // console.log("user >>>>",this.from_user," id ",this.id, " img ",this.profile_image_url+ " txt ",this.text);
           obj.id=this.id;
           obj.user=this.from_user;
           obj.url=this.profile_image_url;
           obj.txt=this.text;
           tweetData.push(obj);
        });

       // console.log("tweet ",tweetData.length);
        initTweet();
    }
    //base ------------------------------------------
    this.app=function()
    {
       // console.log("app");
        JQUERY4U.WIDGETS.TWITTER.init();
        _arrLEFT=[];
        _arrRIGTH=[];
        //canvas.style.width=window.innerWidth+'px';
        stage=new createjs.Stage(canvas);
        createjs.Touch.enable(stage);
        stage.enableMouseOver();

        drawCircles();

        createjs.Ticker.setFPS(40);
        createjs.Ticker.addEventListener("tick", tick);
    }

    this.destroy=function()
    {

    }

    this.active=function()
    {
        if(_stateActive==false)
        {
            initTweet();
        }
    }
    this.inactive=function()
    {
        _stateActive=false;
        if(_timerTweet){clearInterval(_timerTweet)};
    }
    this.removeLine=function(_obj)
    {
       stage.removeChild(_obj);
    }

    //resize screen ---------------------
    this.resize=function ()
    {
        _center=$("#canvasapp").width()*0.5;
        _posXCircle=_center-60;

        circle1.x=_posXCircle;
        circle1.y=140;

        circle2.x=_posXCircle+170;
        circle2.y=120;

        circle3.x=_posXCircle+140;
        circle3.y=260;

        _posXLEFT=0;
        _posXRIGTH=$("#canvasapp").width();

        _arrRIGTH.forEach(function(el)
        {
            el.x=_posXRIGTH-20;
        })
    }
    //base ------------------------------------------
    //function --------------------------------------

    function handleMouseOut(evt)
    {
        var scale=evt.target.aux;
        TweenLite.to(evt.target,0.5,{scaleX:scale,scaleY:scale, ease:Back.easeOut});
    }
    function handleMouseOver(evt)
    {
        var scale=evt.target.aux;
        TweenLite.to(evt.target,0.5,{scaleX:scale+0.1,scaleY:scale+0.1, ease:Back.easeOut});
    }

    function drawCircles()
    {
        //draw circle
        circle1=new CircleAndroid(Config.HASHTAG_ATP,"#C5423A",150,"androidtourperu");
        circle2=new CircleAndroid(Config.HASHTAG_GDGAREQUIPA,"#0A9853",150,"gdgarequipa");//("GDGArequipa","#0FF");
        circle3=new CircleAndroid(Config.HASHTAG_GDGLIMA,"#F8C63F",150,"gaglima");//("AndroidTour","#0FF");
        stage.addChild(circle1);
        stage.addChild(circle2);
        stage.addChild(circle3);

        _posXCircle=_center*0.5-80;
        circle1.x=_posXCircle;
        circle1.y=140;
        circle2.x=_posXCircle+180;
        circle2.y=120;
        circle3.x=_posXCircle+140;
        circle3.y=260;

        circle1.scaleX=0;
        circle1.scaleY=0;
        circle2.scaleX=0;
        circle2.scaleY=0;
        circle3.scaleX=0;
        circle3.scaleY=0;

        circle1.aux=Config.SCALECIRCLEMIN//0.7;
        circle2.aux=Config.SCALECIRCLEMIN//0.5;
        circle3.aux=Config.SCALECIRCLEMIN//0.6;
        var aux=Config.SCALECIRCLEMIN;

        TweenLite.to(circle1, 0.6, {alpha:1,scaleX:aux,scaleY:aux,delay:1});
        TweenLite.to(circle2, 0.6, {alpha:1,scaleX:aux,scaleY:aux,delay:1.3});
        TweenLite.to(circle3, 0.6, {alpha:1,scaleX:aux,scaleY:aux,delay:1.6});

        //events
        circle1.addEventListener("mouseover", handleMouseOver);
        circle1.addEventListener("mouseout", handleMouseOut);
        circle2.addEventListener("mouseover", handleMouseOver);
        circle2.addEventListener("mouseout", handleMouseOut);
        circle3.addEventListener("mouseover", handleMouseOver);
        circle3.addEventListener("mouseout", handleMouseOut);
    }

    function addTweet()
    {
        if(_current>=tweetData.length)
        {
            _current=0;
            return;
        }
        //console.log(">>>> add Tweet ");
        var img = new Image();
        img.src = tweetData[_current].url;//"assets/daisy.png";
        img.onload = handleImageLoad;
        img.aux=_current;
        img.hashtag="gdglima";
    }
    function handleImageLoad(event)
    {
        var indice=event.target.aux;
        var hashtag=event.target.hashtag;

        if(indice>tweetData.length)return;
        var posX=0;
        var posY=0;
        var image = event.target;
        var user=new UserImg(tweetData[indice],image,hashtag);
        user.regX=30;
        user.regY=30;
        stage.addChild(user);
        user.alpha=0;
        user.scaleX=0;
        user.scaleY=0;
       // TweenLite.to(user, 0.4, {alpha:1,scaleX:1,scaleY:1,delay:(1+0.15*i)});
        TweenLite.to(user, 0.2, {alpha:1,scaleX:1,scaleY:1,
                onComplete:completeUser,
                onCompleteParams:[user,indice]});
        var rd=Utils.randomByRange(1,3);
        //console.log("pX ",rd);
        var pX=0;
        if(rd<2)
        {
            pX=_posXLEFT+100;
            user.posX=0;
        }else
        {
            pX=_posXRIGTH-100;
            user.posX=1;
        }
        user.x=Utils.randomByRange(pX,pX+50);
        user.y=Utils.randomByRange(50,300);
    }
    function completeUser(_user, _indice)
    {
        //_user.alpha=0;
        TweenLite.to(_user, 0.2, {alpha:0,delay:0.6});
        TweenLite.to(_user, 0.2, {alpha:1,delay:0.8,onComplete:completeUserOrder,
                                    onCompleteParams:[_user,_indice]});
    }
    function completeUserOrder(_user, _indice)
    {
        //draw Line
        //console.log("user hashtag ",_user.hashtag, "circle ",circle1.hashtag);
        var auxCircle=null;
        var color="#ff";
 
        if(_user.hashtag==circle1.hashtag)
        {
            //console.log("hastag  1",_user.hashtag);
            auxCircle=circle1;
            color=circle1.color;
        }else if(_user.hashtag==circle2.hashtag)
        {
            //console.log("hastag  2",_user.hashtag);
            auxCircle=circle2;
            color=circle2.color;
        }else
        {
            //console.log("hastag  3",_user.hashtag);
            auxCircle=circle3;
            color=circle3.color;
        }
        //console.log("circle ",auxCircle);

        //text-----------------------------
        var line=new JoinLine(this,color,_user.x,_user.y,auxCircle.x,auxCircle.y,_user.posX );
        stage.addChild(line);
        _arrLine.push(line);
        TweenLite.to(line, 0.8, {alpha:0.2,onComplete:completeLine,
            onCompleteParams:[line,_user,auxCircle]});


    }
    function completeLine(_line,_user,_auxCircle)
    {
        _line.state=0;
        //text-----------------------------
        var txt=createText(_user.info.txt,_user.x,_user.y,_user.posX)
        stage.addChild(txt);
        //var auxY=_user.y-200;
       // console.log("txt ",_user.info.txt);
        TweenLite.to(txt, 2, {alpha:0.3,onComplete:completeTxt,
            onCompleteParams:[txt]});

        reorderElement(_user);

        var aux=_auxCircle.aux+_factor;
        if(aux>Config.SCALECIRCLEMAX)return;
        _auxCircle.scaleX=aux;
        _auxCircle.scaleY=aux;
        _auxCircle.aux=aux;
    }
    function completeTxt(_txt)
    {
        if(_txt!=null)
        {
            stage.removeChild(_txt);
        }
    }
    /* reordenar elementos */
    function reorderElement(_user)
    {
        var aux=0;
        if(_user.posX==0)
        {
            aux=_posXLEFT+40;
        }else
        {
            aux=_posXRIGTH-20;
        }
        TweenLite.to(_user,0.2,{x:aux,onComplete:completeOrder,
            onCompleteParams:[_user]})

    }
    function completeOrder(_user)
    {
        var aux=0;
        if(_user.posX==0){
            _arrLEFT.push(_user);
        }else{
            _arrRIGTH.push(_user);
            }
    }

    function updateData()
    {

    }
    function tick()
    {
        if(_stateActive)
        {
            moveCircles();
            clearLine();
            validateArrLeft();
            validateArrRigth();
            stage.update();
        }
    }
    //reorder user ---------------------------------------
    function validateArrLeft()
    {
        if(_arrLEFT.length>6)
        {
            //stage.removeChild(_arrLEFT[_arrLEFT.length-1]);
            stage.removeChild(_arrLEFT[0]);
            _arrLEFT.splice(0, 1);
        }
        orderArr(_arrLEFT);
    }
    function validateArrRigth()
    {
        if(_arrRIGTH.length>6)
        {
            stage.removeChild(_arrRIGTH[0]);
            _arrRIGTH.splice(0, 1);
        }
        orderArr(_arrRIGTH);
    }
    function orderArr(_arr)
    {
        _arr.forEach(function(el)
        {
            //el.y=50+_arr.indexOf(el)*60;
            var auxY=50+_arr.indexOf(el)*60;
            TweenLite.to(el,0.2,{y:auxY});
        })
    }

    //create text
    function createText(_txt,_posX,_posY,_align)
    {
        var text = new createjs.Text(_txt , Config.FONTMIN ,"#000000");// "14px bold Verdana"
        text.textBaseline = "top";
        if(_align==0)
        {
            text.textAlign = "left";
            text.x = _posX +20;
        }else{
            text.textAlign = "right";
            text.x = _posX -30;
        }
        //-width*0.5;
        text.y =_posY-10;// -height*0.5;

        return text;
    }
    //functions common -----------------------------------
    function moveCircles()
    {
        var date=new Date();
        var tm=date.getTime();
        circle1.y=135+Math.cos(tm*0.002)*2;
        circle1.x=_posXCircle+Math.cos(tm*0.003)*2;
        circle2.y=115+Math.cos(tm*0.003)*2;
        circle2.x=_posXCircle+180+Math.cos(tm*0.0025)*2;

        circle3.y=255+Math.cos(tm*0.0025)*2;
        circle3.x=_posXCircle+140+Math.cos(tm*0.002)*2;
    }
    function clearLine()
    {
        _arrLine.forEach(function remove(el)
        {
           if(el.state==0) {stage.removeChild(el)}
        })
    }
    //tweet ----------------------------------------------
    function updateTweet()
    {
        addTweet();
        _current++;
    }

    function initTweet()
    {
        _stateActive=true;
       //_timerTweet=Utils.createTimer(0,updateTweet,Config.TIMEUPDATETWEET);// setInterval(updateTweet,TIMEUPDATETWEET);
       _timerTweet=Utils.createTimer(0,updateTweet,2000);// setInterval(updateTweet,TIMEUPDATETWEET);
       //_timerTweet.start();
    }
    //--------------------------

    this.init();
}
//--------------------------
