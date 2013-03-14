/**
 * Created by JetBrains WebStorm.
 * @autor: emedinaa
 * Date: 17/02/13
 * Time: 10:56 AM
 * To change this template use File | Settings | File Templates.
 */
(function()
{
    var Circle=function (label, color, radio)
    {
        this.initialize(label,color, radio);
    }
    var p = Circle.prototype = new createjs.Container(); // inherit from Container
    p.label;
    p.background;
    p.count = 0;
    p.aux=1;
    p.radio=0;

    p.Container_initialize = p.initialize;
    p.initialize = function(label,color,radio)
    {
        this.Container_initialize();
        // add custom setup logic here.

        this.label = label;
        if (!color) { color = "#CCC"; }
        this.radio=radio;
       // var text = new createjs.Text(label, "20px Arial", "#454545");
        var text = new createjs.Text(label, "15px Arial", "#F3F3F3");
        text.textBaseline = "top";
        text.textAlign = "center";
      //  text.bold(true);
       // text.

        var width = text.getMeasuredWidth()+30;
        var height = text.getMeasuredHeight()+20;

        //circle
        this.background = new createjs.Shape();

        var angStart=5;
        var angEnd=85;
        var stroke=30;

        var ang1=Utils.toRad(angStart);
        var ang11=Utils.toRad(angEnd);

        var ang2=Utils.toRad(angStart+90);
        var ang21=Utils.toRad(angEnd+90);

        var ang3=Utils.toRad(angStart+90+90);
        var ang31=Utils.toRad(angEnd+90+90);

        var ang4=Utils.toRad(angStart+90+90+90);
        var ang41=Utils.toRad(angEnd+90+90+90);

        //this.background.graphics.beginFill("#B73325");//F0F0F0 #7C8CC7 424242
        //circle background #F8F8F8
        this.background.graphics.setStrokeStyle(stroke);
        this.background.graphics.beginStroke("#F8F8F8");//4D8CF6
        //this.background.graphics.beginRadialGradientStroke(["#000","#F8F8F8"],[1,0],100,100,0,100,100,radio*2);
        this.background.graphics.arc(0,0,radio,0, Math.PI*2);
        this.background.graphics.endStroke()

        this.background.graphics.setStrokeStyle(stroke);
        this.background.graphics.beginStroke(color);
        //this.background.graphics.beginLinearGradientStroke(["#000",color], [0, 1], 100, 0,100,0.1);
        //this.background.graphics.beginRadialGradientStroke(["#000",color],[1,0],0,50,0,50,100,radio*2);
        this.background.graphics.arc(0,0,radio,ang1, ang11);
        this.background.graphics.endStroke()

        this.background.graphics.setStrokeStyle(stroke);
        this.background.graphics.beginStroke(color); //"#C5423A"
        //this.background.graphics.beginRadialGradientStroke(["#000",color],[1,0],0,50,0,50,100,radio*2);
        this.background.graphics.arc(0,0,radio,ang2, ang21);
        this.background.graphics.endStroke()

        this.background.graphics.setStrokeStyle(stroke);
        this.background.graphics.beginStroke(color);
        //this.background.graphics.beginRadialGradientStroke(["#000",color],[1,0],2,0,0,0,0,radio*2);
        this.background.graphics.arc(0,0,radio,ang3, ang31);
        this.background.graphics.endStroke()

        this.background.graphics.setStrokeStyle(stroke);
        this.background.graphics.beginStroke(color);
       // this.background.graphics.beginRadialGradientStroke(["#000",color],[1,0],0,0,0,250,0,radio*2);
        this.background.graphics.arc(0,0,radio,ang4, ang41);
        this.background.graphics.endStroke()


        this.android=new createjs.Bitmap("assets/images/android.png");
        this.android.x=-99;
        this.android.y=25;
        text.x =0; //-width*0.5;
        text.y =-10;// -height*0.5;
        this.addChild(this.android);
        this.addChild(this.background);
       // this.addChild(this.background,text);
    }

    window.Circle = Circle;
}());
