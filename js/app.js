 /* Created by JetBrains WebStorm.
 * User: emedinaa
 * Date: 24/02/13
 * Time: 08:42 PM
 * To change this template use File | Settings | File Templates.
 */
    const TOTALCIRCLE=10;
    const POSITIONR=1000;
    const POSITIONL=200;
    const POSXCIRCLE=530;

    var stage;
    var pictures=new Array();
    var items=[];
    var current=0;
    var circle1, circle2,circle3;
    var content;
    var canvas;
    var currentURL="";

    var socialapp;

$(document).ready(function()
{
    // console.log("NO SEAN SAPOS" , "HOLA PIÑAN");
    console.log("---------------------- VERSION 2.0 ---------------");
    $('#pagecontent').hide();
    canvas=document.getElementById("canvasapp");
    content=document.getElementById("pagecontent");

    //header
    initHeader();
    socialapp=new SocialApp();
    socialapp.app();

    //events
    $(window).resize(resize_handler);
    $(window).blur(blur_handler);
    $(window).focus(focus_handler);

    resize_handler();

});

function blur_handler(e)
{
    socialapp.inactive();
    console.log("blur");
}
function focus_handler(e)
{
    socialapp.active();
    console.log("focus");
}

function resize_handler(e) 
{
   var container = $("#canvasapp").parent();
   $("#canvasapp").attr('width',$(container).width());
   socialapp.resize();

}

//header -------------------------------------------
function goHome(e)
{
    $("#pagecontent").fadeOut(1000);
    $("#canvas").fadeIn(1200);
}
function navigationHandler(e)
{
    console.log("click ",e,e.target,e.target.id);
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
    currentURL=url;
    hideCanvas();
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



//footer  -------------------------------------------
function initFooter()
{

}
//canvas ----------------------------------------------
function changePage()
{
    console.log("change page ");
    $('#pagecontent').load(currentURL);
    $('#pagecontent').hide();
    $("#pagecontent").fadeIn(1500);
}
function hideCanvas()
{
    $("#canvas").fadeOut(1200,changePage);
}

function reset()
{
    pictures=new Array();
   // items=[];
    current=0;
}


