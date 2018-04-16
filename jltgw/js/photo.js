//在全局和所有元素类型的父类型的原型中，封装相同的$方法
//专用于在各种情况下用选择器查询元素对象
//接收一个字符串格式的选择器作为参数
//返回找到的一个元素对象或多个元素对象的数组
window.$=HTMLElement.prototype.$=function(selector){
	//如果在全局直接调$，就在document范围内查询
	//否则，就在当前元素范围内查询
	var elems=
	(this==window?document:this).querySelectorAll(selector);
	if(!elems){//如果没找到结果
		return null;
	}else if(elems.length==1){//如果只找到一个结果
		return elems[0];
	}else{//否则
		return elems;
	}
}
window.onload=function(){
	

	/*在ul下每个li下的a中手动定义属性data-i为0,1,2,-1,3*/
	picture.init();//window.onload中初始化picture对象
	console.log(picture);
}
var picture={//封装放大图功能的对象
	LIWIDTH:62,//每个小图片li的固定宽度
	LEFT:20,//ul的起始left值
	ul:null,//包含小图片li的ul，是移动的主体
	aback:null, //左侧按钮-->右移一个li
	afor:null, //右侧按钮-->左移一个li
	moved:0,//记录ul左移的次数，每左移一次+1,右移-1
	liCount:0,//记录li的总数

	maskH:0,//mask的高
	maskW:0,//mask的宽
	maxTop:0,//mask可用的最大top值
	maxLeft:0,//mask可用的最大left值

	//如果liCount-moved==5，就禁用afor
	//如果moved==0，就禁用aback
	init:function(){
		var self=this;//留住this在self变量中
		//找到id为icon_list的ul，保存在ul属性中
		self.ul=$("#icon_list");
		//找到id为icon_list下的所有li，获得length属性，保存在liCount属性中
		self.liCount=$("#icon_list>li").length;
		//找到id为preview下h1下第一个a，保存在aback中
		self.aback=$("#preview>h1>a:first-child");
		self.afor=$("#preview>h1>a:first-child+a");
		//为aback和afor绑定相同单击事件处理函数

		self.aback.onclick=self.afor.onclick=function(){
			//	this-->a    self-->picture对象
			//如果当前a元素的className属性中不包含_disabled
			if(this.className.indexOf("_disabled")==-1){
			//如果当前a元素的className等于forward
			//	为moved属性+1,否则就-1 
			  self.moved+=this.className=="forward"?1:-1;
			//设置ul的left属性为-moved*LIWIDTH+20+px
				self.ul.style.left=
				 -self.moved*self.LIWIDTH+self.LEFT+"px";
				if(self.moved==0){//如果moved等于0
			//设置aback的className，加等于_disabled
					self.aback.className+="_disabled";
				}else if(self.liCount-self.moved==5){
				//否则，如果liCount-moved==5
				//设置afor的className，加等于_disabled
					self.afor.className+="_disabled";
				}else{//否则
					//设置aback的className为backward
					self.aback.className="backward";
					//设置afor的className为forward
					self.afor.className="forward";
				}
			}
		}

		//为ul绑定onmouseover事件鼠标移入显示对应图片
		self.ul.addEventListener("mouseover",function(){
			//	获得事件对象e
			var e=window.event||arguments[0];
			//  获得目标对象target
			var target=e.srcElement||e.target;
			if(target.nodeName=="IMG"){//如果target是img
				//获得target的src属性，保存在变量src中
				var src=target.src;
				//在src中找最后一个.的位置，保存在变量i中
				var i=src.lastIndexOf(".");
		//		拼接src开始位置~i之前的子字符串+-m+i~结尾的子字符串，将结果字符串设置到id为mImg的元素的src属性上
				$("#mImg").src=
					src.slice(0,i)+src.slice(i);
			}
		},false);
	}
}