window.onload = function(){
	//回顶部按钮
	var backtop = document.getElementById("backtop");
	var timer = null;  //定时器
	//滚动条距离顶部距离
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	//body高度
	var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
	
	//ie9以下支持classList
	supportIe9();
	
	//滚动条事件
	window.onscroll = function(){
		scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(!scrollTop){
			clearInterval(timer);
		}
		if(clientHeight <= scrollTop){
			backtop.classList.remove("none");
		}else{
			backtop.classList.add("none");
		}
	}
	
	//按钮点击事件
	addEventlistener(backtop,"click",function(){
		timer = setInterval(function(){
			scrollTop /= 5;
			if(document.documentElement.scrollTop){
				document.documentElement.scrollTop -= scrollTop;
			}else{
				document.body.scrollTop -= scrollTop;
			}	
		},30);
	});
	
}

//添加事件监听
function addEventlistener(obj,type,handle){
	if(obj.addEventListener){
		obj.addEventListener(type,handle,false);
	}else if(obj.attachEvent){
		obj.attachEvent("on" + type,handle);
	}else{
		obj["on" + type] = handle;
	}
}

//ie9以下支持classList
function supportIe9(){
	if (!("classList" in document.documentElement)) {  
        Object.defineProperty(HTMLElement.prototype, 'classList', {  
            get: function() {  
                var self = this;  
                function update(fn) {  
                    return function(value) {  
                        var classes = self.className.split(/\s+/g),  
                            index = classes.indexOf(value);  
                          
                        fn(classes, index, value);  
                        self.className = classes.join(" ");  
                    }  
                }  
                  
                return {                      
                    add: update(function(classes, index, value) {  
                        if (!~index) classes.push(value);  
                    }),  
                      
                    remove: update(function(classes, index) {  
                        if (~index) classes.splice(index, 1);  
                    }),  
                      
                    toggle: update(function(classes, index, value) {  
                        if (~index)  
                            classes.splice(index, 1);  
                        else  
                            classes.push(value);  
                    }),  
                      
                    contains: function(value) {  
                        return !!~self.className.split(/\s+/g).indexOf(value);  
                    },  
                      
                    item: function(i) {  
                        return self.className.split(/\s+/g)[i] || null;  
                    }  
                };  
            }  
        });  
    }  
}
