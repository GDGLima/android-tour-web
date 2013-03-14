/**
 * Created by JetBrains WebStorm.
 * User: emedinaa
 * Date: 03/03/13
 * Time: 12:33 AM
 * To change this template use File | Settings | File Templates.
 */
window.onload = function() {
	var drawPortion = function() {
	    context.strokeStyle = selectColor;

        context.beginPath();
	    context.arc(count,count,1,0,Math.PI*2,true);
	    context.closePath();
	    context.stroke();
	    count++;
	    if(count < steps) { setTimeout(drawPortion, 50)}else{
			if(colorA==selectColor)
			selectColor=colorB;
			else
			selectColor=colorA;
			count=0;
			drawPortion();
		};
	};
    var drawingCanvas = document.getElementById('canvas');
    if(drawingCanvas && drawingCanvas.getContext) {
        var context = drawingCanvas.getContext('2d');
	var steps = 200;
	var count = 0;

	var colorA="#000000";
	var colorB="#ffffff";
	var selectColor=colorA;
	drawPortion();

    }
}
