jQuery(document).ready(function()
{
  var nav_links =
  {
    "#android-tour" : "nav_androidtour.html",
    "#programa" : "nav_programa.html",
    "#speaker" : "nav_speaker.html",
    "#sponsor" : "nav_sponsor.html",
    "#team" : "nav_team.html"
  };

  function loadURL(key)
  {
    if(key.length > 0 && nav_links[key] != undefined)
    {
      jQuery("#page-container").html("<img src='assets/img/loader.gif'>")
      jQuery("#page-container").load(nav_links[key]);
    }
  }

  jQuery("ul.nav li a").click(function()
  {
    var key = jQuery(this).attr("href");
    console.log("navigation ","key ",key);
    loadURL(key);
  });

  var currentURL = String(document.location).split("#");
  var key = jQuery.trim(currentURL[currentURL.length -1]);

  if(key.length > 0)
    key = "#"+key;

  
  if(currentURL.length > 1)
    loadURL(key);

});