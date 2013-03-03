/*================================================================
  Filename: xEyes-14.js
  Rev: 14
  By: A.R.Collins

  Description: Javascript implementation of xEyes.
  Kindly give credit to ARC and reference  <http://www.arc.id.au/>

  Date     Description                                       By
  --------|--------------------------------------------------|----
  08Jul08  Removed all resize stuff, browsers use zoom        ARC
  13Jul08  Rewritten in object oriented style                 ARC
  14Jul08  renamed xEyesDali-10 to xEyes-11 one version now   ARC
  29Sep09  Support fluid layout by window resize event        ARC
  06Jul10  bugfix: csrX, Y updated for chrome browser         ARC
  07Jul12  bugfix: account for border widths in getPosition   ARC
 *================================================================*/

    /* function associateObjWithEvent(obj, methodName)
       A general function that associates an object instance with an event
       handler. The returned inner function is used as the event handler.
       The object instance is passed in as the - obj - parameter and the name
       of the method that is to be called on that object is passed as the -
       methodName - (string) parameter.
       This function has the effect of preserving the context of when it was called,
       so parameters from this original context are available so they
       can be passed as parameters from that context to the handler method.
       Some special ones are:
         obj - the JS object instance, 'this' in the original context.
       When the handler is actually called (on event) outside this original context
       the JS object method (which is the actual event handler) will have its original
       context restored, i.e. 'this' will refer to the JS object instance.
       If obj was passed to it, since obj preserves a copy of the original JS object instance,
       it can be further passed on by the event handler and used to
       set further event handlers on the particular object (or a new copy of 'this' will be the same object).
         ref: <http://jibbering.com/faq/faq_notes/closures.html#clObjI>
    */
    function associateObjWithEvent(obj, methodName)
    {
      return (function(e)
              {
                if (!e)
                  e = window.event;
                return obj[methodName](e);
              });
    }

    function Xeyes(faceId, e1Id, e1Lft, e1Tp, e1Rad, e2Id, e2Lft, e2Tp, e2Rad)
    {
      this.faceObj = document.getElementById(faceId);
      this.eye1Obj = document.getElementById(e1Id);
      this.eye2Obj = document.getElementById(e2Id);
      this.e1Lft = e1Lft;
      this.e1Top = e1Tp;
      this.e1Radius = e1Rad;
      this.e2Lft = e2Lft;
      this.e2Top = e2Tp;
      this.e2Radius = e2Rad;
      this.e1x;
      this.e1y;    // eye centre relative to top left of doc
      this.r1;
      this.e1xLoc;
      this.e1yLoc;   // eye top left relative to top left of parent
      this.e2x;
      this.e2y;
      this.r2;          // eye radii
      this.e2xLoc;
      this.e2yLoc;

      // setup initial eye locations
      this.eyesInit();

      // if the browser window is resized eye locations must be re-calculated
      window.onresize = associateObjWithEvent(this, "eyesInit");

      // setup the eyeMove event to be called when ever the cursor is moved
      document.onmousemove = associateObjWithEvent(this, "eyesMove");
   // for debug use     document.onclick = associateObjWithEvent(this, "eyesMove");
    }

    function getPosition(element)
    {
      var xPosition = 0;
      var yPosition = 0;

      while(element)
      {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
      }
      return { x: xPosition, y: yPosition };
    }

    Xeyes.prototype.eyesInit = function(e)
    {
      var faceWidth = this.faceObj.offsetWidth;
      var faceHeight = this.faceObj.offsetHeight;

      // get left,top of eyes relative to parent
      this.e1xLoc = 0.01*this.e1Lft*faceWidth - this.eye1Obj.offsetWidth/2;
      this.e1yLoc = 0.01*this.e1Top*faceHeight - this.eye1Obj.offsetHeight/2;
      this.e2xLoc = 0.01*this.e2Lft*faceWidth - this.eye2Obj.offsetWidth/2;
      this.e2yLoc = 0.01*this.e2Top*faceHeight - this.eye2Obj.offsetHeight/2;
      // get absolute position of centre of eyes wrt to top left of document body
      tmp = getPosition(this.faceObj);
      this.e1x= tmp.x+0.01*this.e1Lft*faceWidth;
      this.e1y= tmp.y+0.01*this.e1Top*faceHeight;
      this.e2x= tmp.x+0.01*this.e2Lft*faceWidth;
      this.e2y= tmp.y+0.01*this.e2Top*faceHeight;

      this.r1 = 0.01*this.e1Radius*faceWidth;
      this.r2 = 0.01*this.e2Radius*faceWidth;

      // now move the eyes to a less goggle-eye position until mouse moves
      this.eye1Obj.style.left = this.e1xLoc+"px";        // "12.4em";
      this.eye1Obj.style.top = this.e1yLoc+this.r1/1.5+"px";    // "16.3em";
      this.eye2Obj.style.left = this.e2xLoc+"px";        // "21.0em";
      this.eye2Obj.style.top = this.e2yLoc+this.r2/1.5+"px";    // "16.3em";
    }

    // Move eyes
    Xeyes.prototype.eyesMove = function(e)
    {
      var csrX, csrY;
      var x, y;
      var dx, dy;
      var R;
      var savThis = this;

      document.onmousemove = null;  // turn off mouseMove events
      if (e.pageX == null)
      {
        // IE case
        var d= (document.documentElement &&
                document.documentElement.scrollLeft != null) ?
               document.documentElement : document.body;
        csrX= e.clientX + d.scrollLeft;
        csrY= e.clientY + d.scrollTop;
      }
      else
      {
        // all other browsers
        csrX= e.pageX;
        csrY= e.pageY;
      }
      // eye 1 first
      dx = csrX - this.e1x;
      dy = csrY - this.e1y;
      R = Math.sqrt(dx*dx+dy*dy);     // distance from eye centre to csr
      x = (R < this.r1)? dx : dx*this.r1/R;
      y = (R < this.r1)? dy : dy*this.r1/R;
      this.eye1Obj.style.left = x + this.e1xLoc + "px";
      this.eye1Obj.style.top = y + this.e1yLoc + "px";
      // now for eye 2
      dx = csrX - this.e2x;
      dy = csrY - this.e2y;
      R = Math.sqrt(dx*dx+dy*dy);
      x = (R < this.r2)? dx : dx*this.r2/R;
      y = (R < this.r2)? dy : dy*this.r2/R;
      this.eye2Obj.style.left = x + this.e2xLoc + "px";
      this.eye2Obj.style.top = y + this.e2yLoc + "px";
      // set a timer to make a delayed call to setup mousemove event
      window.setTimeout(function(){document.onmousemove = associateObjWithEvent(savThis, "eyesMove")}, 100);
    }

