/**
 * Created by JetBrains WebStorm.
 * @autor: emedinaa
 * Date: 17/02/13
 * Time: 10:56 AM
 * To change this template use File | Settings | File Templates.
 */
(function()
{
    var JoinLine=function ( _context,_color, p1X,p1Y,p2X,p2Y,_posX)
    {
        this.initialize(_context,_color, p1X,p1Y,p2X,p2Y,_posX);
    }
    var p = JoinLine.prototype = new createjs.Container(); // inherit from Container
    p.color;
    p.background;
    p.p1X = 0;
    p.p1Y=0;
    p.p2X=0;
    p.p2Y=0;
    p.posX=0;
    p.context;
    p.state=1;

    p.Container_initialize = p.initialize;
    p.initialize = function(_context,_color, _p1X,_p1Y,_p2X,_p2Y,_posX)
    {
        this.Container_initialize();
        // add custom setup logic here.
        this.p1X = _p1X;
        this.p1Y = _p1Y;
        this.p2X = _p2X;
        this.p2Y = _p2Y;
        this.posX = _posX;
        this.context=_context;
        this.state=1;
        this.color=_color;

        if (!this.color) { this.color = "#CCC"; }
       // var width = text.getMeasuredWidth()+30;
        //var height = text.getMeasuredHeight()+20;
        //circle
        this.background = new createjs.Shape();

        this.background.graphics.setStrokeStyle(3);
        this.background.graphics.beginStroke(this.color);//"#4D8CF6");//4D8CF6
        var aX=0;
        var aY=0;
        if(this.posX<=0)
        {
            aX=this.p1X+22;
            aY=this.p1Y;
        }else
        {
            aX=this.p1X-22;
            aY=this.p1Y;
        }
        this.background.graphics.moveTo(aX,aY);
        this.background.graphics.lineTo(this.p2X,this.p2Y);

        this.addChild(this.background);

       // init();
       // this.init();
    }
    p.init=function()
    {
        TweenLite.to(this, 0.8, {alpha:0,onComplete:this.completeLine});
        //this.parent.removeLine(this);
    }
    p.completeLine=function()
    {
       // this.context.removeLine(this);
        //console.log("context ",this.context);
        this.state=0;
    }

    window.JoinLine = JoinLine;



}());
