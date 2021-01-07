// 随机产生一个min到max之间的随机整数
function rand(min,max){            
    return parseInt(Math.random()*(max-min+1))+min;
}

// 封装一个生成随机颜色的函数
function getColor(){
    var color = "#"
    for(var i=0;i<6;i++){
        color+=rand(0,15).toString(16)
    };
    return color;
}

// 根据id返回给id对应的元素标签
function $id(id){
    return document.getElementById(id);
}

// 封装一个方法用来获取页面滚动的距离
function getScroll(){
    if(window.pageYOffset){
        return {
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }else if(document.documentElement.scrollTop){
        return {
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }else{
        return {
            top:document.body.scrollTop,
            left:document.body.scrollLeft
        }
    }
}

// 封装一个函数来返回指定元素的指定样式
function getStyle(dom,attr){
    if(window.getComputedStyle){
        // 如果能进这里，非IE，说明window.getComputedStyle存在
        return window.getComputedStyle(dom,null)[attr]
    }else{
        // 如果进这里，IE浏览器
        return dom.currentStyle[attr]

    }
}

// 判断arr里面是否含有num
function has(arr,num){
    for(var i=0;i<arr.length;i++){
        if(arr[i]==num){
            return true;
        }
    }
    return false;
}

// 随机产生一个包含n个字母或数字的字符串
function randChar(n){
    var str = "";//用来记录随机字符串集合
    for(var i=0;i<n;i++){	
        // 所以先随机产生一个48-122之间的随机整数
        var code = rand(48,122)
        if((code>57&&code<65)||(code>90&&code<97)){
            // 如果产生的编码不是数字或字符，本次作废
            i--; 
        }else{
            // 如果产生的编码是数字或字符，可以
            var char = String.fromCharCode(code);
            str+=char;
        }
    }
    return str;
}

// 可以去除字符串两端的空格
function trim(str){
    return str.replace(/(^\s+)|(\s+$)/g,"")
}

/* 
    封装一个animate函数，可以实现指定元素的指定属性运动到指定的目标
        ==>dom:传入要运动的dom节点
        ==>json:所有属性要运动到的目标的集合对象
        ==>fn:定时完成以后执行的函数(回调函数)
*/
function animate(dom,json,fn){
    clearInterval(dom.timer)
    // 每隔20毫秒，每隔属性都缓动一小段距离
    dom.timer = setInterval(function(){
        // flag是一个变量，记录本次运动完了一个后，是否能停止定时器
        var flag = true;
        // json里面有几个键值对，就要运动几次
        for(var attr in json){
            
            // 1 获取当前位置
            if(attr=="opacity"){
                var current = parseInt(getStyle(dom,attr)*100)
            }else{
                var current = parseInt(getStyle(dom,attr))
            }
            // 2 计算速度
            var speed = (json[attr]-current)/10
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            // 3 计算下一个位置
            var next = current+speed;
            if(attr=="zIndex"){
                next = json[attr];
            }
            // 4 有条件的定位元素
            if(next!=json[attr]){
                flag = false;
            }
            if(attr=="opacity"){
                dom.style.opacity = next/100;
                dom.style.filter = "alpha(opacity="+next+")";
            }else if(attr=="zIndex"){
                dom.style.zIndex = next;
            }else{
                dom.style[attr] = next+"px";
            }
            
        }

        if(flag==true){
            clearInterval(dom.timer);
            if(fn){
                fn()
            }
        }
    },20)
}