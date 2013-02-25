/**
 * Created by JetBrains WebStorm.
 * @autor: emedinaa
 * Date: 17/02/13
 * Time: 10:56 AM
 * To change this template use File | Settings | File Templates.
 */
(function()
{
    var UserImg=function (info, image)
    {
        this.initialize(info,image);
    }
    var p = UserImg.prototype = new createjs.Container(); // inherit from Container
    p.info;
    p.background;
    p.count = 0;
    //p.aux=new Object();
    p.image;

    p.Container_initialize = p.initialize;
    p.initialize = function(info,image)
    {
        this.Container_initialize();
        // add custom setup logic here.
        this.info = info;
        this.image = image;
        //console.log("info ",info);
        //bitmap
        var bitmap = new createjs.Bitmap(image);
        bitmap.mouseEnabled=false;
            //bitmap.regX=30;
            //bitmap.regY=30;

        //background
        this.background = new createjs.Shape();
        this.background.graphics.beginFill("#FFFFFF");//F0F0F0 #7C8CC7 424242
        this.background.graphics.drawRect(0,0,52,52);
        this.background.graphics.endFill();
        this.addChild(this.background);
        //this.background.alpha=0.01;
        this.addChild(bitmap);
        this.background.x=-2;
        this.background.y=-2;

        this.background.addEventListener("mouseover", this.handleOver);
        this.background.addEventListener("mouseout", this.handleOut);
    }
    p.handleOver = function (event)
    {
        var target = event.target;
       // console.log("info >> ",target.parent.info.txt);
        stage.canvas.title = 'tweet '+target.parent.info.txt;
        TweenLite.to(target.parent,0.5,{scaleX:1.2,scaleY:1.2, ease:Back.easeOut});
    }
    p.handleOut = function (event)
    {
        var target = event.target;
       // console.log("info >> ",target.parent.info.txt);
       // stage.canvas.title = 'put your tooltip text here';
        stage.canvas.title = '';
        TweenLite.to(target.parent,0.5,{scaleX:1,scaleY:1, ease:Back.easeOut});
    }

    window.UserImg = UserImg;
}());
