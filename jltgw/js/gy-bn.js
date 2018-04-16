$(function(){
	navLiWidth();
})

//获取bannerLi的宽度
function navLiWidth(){
	var nums = $(".jlt-nav .ul1").children().length;
	$(".jlt-nav .li1 .a1").width(1100/nums);
	$(".jlt-nav .ul-hv li a").width(1100/nums);
}