/**
 * @author Mehmet Seven [mehmetseven0@gmail.com]
 *
 *	Beleş ekmek with Javascript
 * 
 */

"use strict";


/* PREPARE */

var winWidth  = window.innerWidth;
var winHeight = window.innerHeight;
var obj_top;
var obj_left;

function prepare(){
	winWidth  = window.innerWidth;
	winHeight = window.innerHeight;

	var circle_top  = winHeight / 2 - $('.circle').height()  / 2;
	var circle_left = winWidth / 2  - $('.circle').width() / 2;

	obj_top  = winHeight / 2 - 20
	obj_left = winWidth / 2 - 20

	$('.loader').css({"left": obj_left- $(".loader").width()/2 + 20 })
	$('.circle').css({"top": circle_top +"px", "left": circle_left +"px" });
}

prepare();
window.addEventListener("resize", prepare);

var showable = true;
window.onload = function(){
    $.ajax({
        url: $("source").attr("src"),
        success: function() {
            audio[0].play();

		    setTimeout(function(){
		        init();
		    },5400);
        },
        beforeSend: function(){
            setTimeout(function(){
                if (showable) $(".loader").show();
            },600);
        },
        complete: function(){
            $(".loader").hide();
            showable = false;
        }
    });

}



var speed  		= 4000,
    audio 		= $('#sound audio');

var words = ["mehmet","alper","alp","ahmet","erdem","murat","hasan","necip","can","kerim","burak","cemil","ömer","ali","selim","kenan","fatih",'yavuz'];


function random_distance(val){
	if(val == 1 || val ==3)
	    return Math.floor(Math.random()*window.innerWidth);
	else
	    return Math.floor(Math.random()*window.innerHeight);
}

function direction(val){
	if(val == 1)		return ["top",   "left", random_distance(val)];
	else if (val == 2)	return ["right", "top",  random_distance(val)];
	else if (val == 3)	return ["bottom","left", random_distance(val)];
	else 			    return ["left",  "top",  random_distance(val)];
}





var val = 0;


var random_dr,random_left,random_id,random_name;
/**
 * Initializing to hücüm!
 * @param  {int} hiz text marquee speed
 * @return {@template}
 */
function init(){

	/**
	 * @random_dr
	 * 1 : Top
	 * 2 : Right
	 * 3 : Bottom
	 * 4 : Left
	 * @type {[int]}
	 */
	
	random_dr  = direction(Math.floor(Math.random()*4) +1);
	random_left = Math.floor(Math.random()*440);
	random_id   = Math.floor(Math.random()*9999999999999);
	random_name = Math.floor(Math.random()*words.length);


	$("body").append("<div class='asker norm' id='asker_"+random_id+"' style=' "+random_dr[0]+":0; "+random_dr[1]+":"+random_dr[2]+"px' title='"+words[random_name]+"'>"+words[random_name]+"</div>");
	
	$("#asker_"+random_id+"").velocity({"top":""+obj_top+"px", "left":""+obj_left+"px" },{ 
		duration:speed,
		complete: function(){
			$(this).remove();
		}
	});

	
	val++;
	if (val == 200 || val == 500) $( ".circle" ).effect( "shake" );

	if(val < 3000) requestAnimationFrame(init);
	
}





