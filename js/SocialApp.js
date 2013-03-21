/**
 * Created by JetBrains WebStorm.
 * User: emedinaa
 * Date: 02/03/13
 * Time: 02:43 PM
 * To change this template use File | Settings | File Templates.
 */
//const TIMEUPDATETWEET=4000;
 //const POSXCIRCLE=320;

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

var SocialApp=function()
{
    this.tweets=tweetData;
    this.init=function()
    {
        console.log("init");
        _arrLine=[];
        _posXLEFT=100;
        _posXRIGTH=Config.STAGEWIDTH-100-40;

        JQUERY4U.WIDGETS.TWITTER.setAux(this.showData);
    }
    this.showData=function(data)
    {
        console.log("showdata");
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

        console.log("tweet ",tweetData.length);
        initTweet();
    }
    //base ------------------------------------------
    this.app=function()
    {
        console.log("app");
        JQUERY4U.WIDGETS.TWITTER.init();
        _arrLEFT=[];
        _arrRIGTH=[];
        //canvas.style.width=window.innerWidth+'px';
        stage=new createjs.Stage(canvas);
        createjs.Touch.enable(stage);
        stage.enableMouseOver();

        drawCircles();

       // createjs.Ticker.addEventListener("tick", stage);
       // createjs.Ticker.setInterval(30);
        createjs.Ticker.setFPS(40);
        createjs.Ticker.addEventListener("tick", tick);
    }

    this.destroy=function()
    {

    }

    this.active=function()
    {
        initTweet();
    }
    this.inactive=function()
    {
        if(_timerTweet){clearInterval(_timerTweet)};
    }
    this.removeLine=function(_obj)
    {
      // if(stage.chi)
       stage.removeChild(_obj);
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
      //  circle1=new CircleAndroid("GDGLima","#0FF");
        circle1=new CircleAndroid("GDGLima","#C5423A",150);
        circle2=new CircleAndroid("GDGLima","#0A9853",150);//("GDGArequipa","#0FF");
        circle3=new CircleAndroid("GDGLima","#F8C63F",150);//("AndroidTour","#0FF");
        stage.addChild(circle1);
        stage.addChild(circle2);
        stage.addChild(circle3);

        _posXCircle=Config.STAGEWIDTH*0.5-50;

        circle1.x=_posXCircle;
        circle1.y=140;

        circle2.x=_posXCircle+170;
        circle2.y=120;

        circle3.x=_posXCircle+140;
        circle3.y=260;

        circle1.scaleX=0;
        circle1.scaleY=0;

        circle2.scaleX=0;
        circle2.scaleY=0;

        circle3.scaleX=0;
        circle3.scaleY=0;

        circle1.aux=0.7;
        circle2.aux=0.5;
        circle3.aux=0.6;

        TweenLite.to(circle1, 0.6, {alpha:1,scaleX:0.7,scaleY:0.7,delay:1});
        TweenLite.to(circle2, 0.6, {alpha:1,scaleX:0.5,scaleY:0.5,delay:1.3});
        TweenLite.to(circle3, 0.6, {alpha:1,scaleX:0.6,scaleY:0.6,delay:1.6});
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
        console.log(">>>> add Tweet ");
        var img = new Image();
        img.src = tweetData[_current].url;//"assets/daisy.png";
        img.onload = handleImageLoad;
        img.aux=_current;
    }
    function handleImageLoad(event)
    {
        var indice=event.target.aux;
        if(indice>tweetData.length)return;
        //console.log("pos >>>> ",event.target.aux);
        var posX=0;
        var posY=0;
        var image = event.target;
        var user=new UserImg(tweetData[indice],image);
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
            pX=_posXLEFT;
            user.posX=0;
        }else
        {
            pX=_posXRIGTH;
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
        var line=new JoinLine(this,"#ff",_user.x,_user.y,circle1.x,circle1.y,_user.posX );
        stage.addChild(line);
        _arrLine.push(line);
        TweenLite.to(line, 0.8, {alpha:0.2,onComplete:completeLine,
            onCompleteParams:[line,_user]});
    }
    function completeLine(_line,_user)
    {
        _line.state=0;
        reorderElement(_user);
    }
    /* reordenar elementos */
    function reorderElement(_user)
    {
        var aux=0;
        if(_user.posX==0)
        {
            aux=_posXLEFT-50;
        }else
        {
            aux=_posXRIGTH+100;
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
        moveCircles();
        clearLine();
        validateArrLeft();
        validateArrRigth();
        stage.update();
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
       /* for(var i=_arr.length-1;i>0;i--)
        {
            _arr[i].y=50+i*60;
        }*/
        _arr.forEach(function(el)
        {
            //el.y=50+_arr.indexOf(el)*60;
            var auxY=50+_arr.indexOf(el)*60;
            TweenLite.to(el,0.2,{y:auxY});
        })
    }
    //functions common -----------------------------------
    function moveCircles()
    {
        var date=new Date();
        var tm=date.getTime();
        circle1.y=135+Math.cos(tm*0.002)*2;
        circle1.x=_posXCircle+Math.cos(tm*0.003)*2;
        circle2.y=115+Math.cos(tm*0.003)*2;
        circle2.x=_posXCircle+150+Math.cos(tm*0.0025)*2;

        circle3.y=255+Math.cos(tm*0.0025)*2;
        circle3.x=_posXCircle+120+Math.cos(tm*0.002)*2;
    }
    function clearLine()
    {
       /* foreach (el in _arrLine)
        {
            stage.removeChild(el);
        }*/
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
       //_timerTweet=Utils.createTimer(0,updateTweet,Config.TIMEUPDATETWEET);// setInterval(updateTweet,TIMEUPDATETWEET);
       _timerTweet=Utils.createTimer(0,updateTweet,2000);// setInterval(updateTweet,TIMEUPDATETWEET);
       //_timerTweet.start();
    }

    this.init();
    //init();
}
//--------------------------
