/**
 * Created by JetBrains WebStorm.
 * @autor: emedinaa
 * Date: 17/02/13
 * Time: 10:56 AM
 * To change this template use File | Settings | File Templates.
 */
(function()
{
    var Circle=function (label, color,_hashtag)
    {
        this.initialize(label,color);
    }
    var p = Circle.prototype = new createjs.Container(); // inherit from Container
    p.label;
    p.background;
    p.count = 0;
    p.aux=1;
    p.hashtag=_hashtag;

    p.Container_initialize = p.initialize;
    p.initialize = function(label,color,_hashtag)
    {
        this.Container_initialize();
        // add custom setup logic here.

        this.label = label;
        this.hashtag=_hashtag;
        if (!color) { color = "#CCC"; }
        var text = new createjs.Text(label, "15px Arial", "#F3F3F3");
        text.textBaseline = "top";
        text.textAlign = "center";

        var width = text.getMeasuredWidth()+30;
        var height = text.getMeasuredHeight()+20;

        //circle
        /*var g = new Graphics();
            g.setStrokeStyle(1);
            g.beginStroke(Graphics.getRGB(0,0,0));
            g.beginFill(Graphics.getRGB(255,0,0));
            g.drawCircle(0,0,3);*/
        this.background = new createjs.Shape();
       /* this.background.graphics.beginFill("#B73325");//F0F0F0 #7C8CC7 424242
        this.background.graphics.drawCircle(0,0,76);
        this.background.graphics.endFill()*/

        this.background.graphics.beginFill("#B73325");//F0F0F0 #7C8CC7 424242
        this.background.graphics.drawCircle(0,0,74);
        this.background.graphics.endFill()

       // this.background = new createjs.Shape();
        this.background.graphics.beginFill("#F3F3F3");//#B73325
        this.background.graphics.drawCircle(0,0,70);
        this.background.graphics.endFill()
        //this.background.graphics.beginFill(color).drawCircle(0,0,width,height,10);
        this.background.graphics.beginFill("#B73325");
        this.background.graphics.drawCircle(0,0,50);
        this.background.graphics.endFill()



        text.x =0; //-width*0.5;
        text.y =-10;// -height*0.5;

        this.addChild(this.background,text);
    }

    window.Circle = Circle;
}());
