/*
    Utilitarios
 */
function Utils()
{

}
Utils.toRad=function(_angle)
{
	return _angle*Math.PI/180;
}
Utils.randomByRange=function (_min, _max)
{
    return _min+ Math.random()*(_max-_min);
}

Utils.createTimer=function(_id,_function,_time)
{
    return  setInterval(_function,_time);
}