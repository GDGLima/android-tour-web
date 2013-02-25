/**
 * Created by JetBrains WebStorm.
 * User: emedinaa
 * Date: 24/02/13
 * Time: 08:42 PM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function()
{
    console.log("NO SEAN SAPOS" , "HOLA PIÑAN");
    console.log("ready ...",window.innerWidth);
   // JQUERY4U.WIDGETS.TWITTER.init();
    var canvas = document.getElementById("canvas");
    canvas.style.width=window.innerWidth+'px';
    stage=new createjs.Stage(canvas);
    createjs.Touch.enable(stage);
    stage.enableMouseOver();
});
