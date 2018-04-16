window.onload=function(){
	foot();
}
$(window).resize(function() {
	foot();
});
 function foot(){
 	var m_height=$(".content").height();
 	var h=m_height+420;
 	$(".footer").css({'top':h});
 }

