// 放大镜

// 获取相关元素
var smallBox = $id('small');//小盒子
var bigBox = $id('big');//大盒子
var mask = $id('mask');//遮罩层
var box = document.querySelector('.main-left');//总容器
var bigImg = $id('bigImg');//大图片
// 1 鼠标移入small,big显示,mask显示
smallBox.onmouseenter = function(){
    bigBox.style.display = "block";
    mask.style.display = "block";
}
// 2 mask跟着鼠标移动，鼠标在mask中心位置
smallBox.onmousemove = function(e){
    e = e||window.event;
    // 求出鼠标距离small的距离
    var left = e.clientX+getScroll().left - box.offsetLeft;
    var top = e.clientY+getScroll().top-box.offsetTop;
    // 鼠标在mask中心，减去mask宽高的一半
    left = left-mask.offsetWidth/2
    top = top-mask.offsetHeight/2
    // 边界监测
    if(left<0){
        left=0
    }
    if(left>smallBox.offsetWidth-mask.offsetWidth){
        left=smallBox.offsetWidth-mask.offsetWidth
    }
    if(top<0){
        top = 0;
    }
    if(top>smallBox.offsetHeight-mask.offsetHeight){
        top = smallBox.offsetHeight-mask.offsetHeight
    }
    // 定位mask
    mask.style.left = left +"px";
    mask.style.top = top +"px";
    // 3 mask对应的大图位置显示
    // left/350 = 大图左移的距离/800
    // top/350 = 大图上移的距离/800
    var x = left/smallBox.offsetWidth*bigImg.offsetWidth;
    var y = top/smallBox.offsetHeight*bigImg.offsetHeight;
    
    bigImg.style.marginLeft = -x+"px";
    bigImg.style.marginTop = -y+"px";

}

// 4 鼠标移出small,big隐藏,mask隐藏
smallBox.onmouseleave = function(){
    bigBox.style.display = "none";
    mask.style.display = "none";
}





// 中间sml选择
$('.center-03>span').hover(
    function(){
        // $('.center-03>span').attr()
        $('.center-03>span').attr('id','')
        $('.center-03>span').children().css('display','none')
        $(this).attr('id','on')
        $(this).children().css('display','block')
    },
    function(){
        // $(this).attr('id','')
        // $(this).children().css('display','none')
    }
)
$('.center-03>span').click(function(){
    $(this).attr('id','on')
    $(this).children().css('display','block')
})

$('.numAdd').click(function(){
    var a = $('#num').val()
    a = +a
    a++;
    $('#num').val(a)
})
$('.numWit').click(function(){
    var b = $('#num').val()
    if(b<=1){
        return
    }
    b = +b
    b--;
    $('#num').val(b)
})


// 抛物线购物车
var obj = {}
var speedX = 10
var speedY = 8
// console.log($('.move').off)

$('.center-05').click(function(){
    $('.move').css('display','block')
    clearInterval(obj.timer)
    obj.timer = setInterval(function(){
         // 1 获取当前位置
         var currentX = parseInt($('.move').css('left'));
         var currentY =  parseInt($('.move').css('bottom'));
        //  console.log(currentX,currentY)
         // 2 计算速度
         // 2 计算下一个位置
         var nextX = currentX+speedX;
         var nextY = currentY+speedY;
        //  console.log(nextX,nextY)
         // 边界检测
         speedX++ 
         if(nextX>=720){
            nextX = -20; 
            nextY = -60 
            clearInterval(obj.timer)
            speedX = 10
            speedY = 8
            $('.move').css('display','none')
         }
         
         if(nextY>=320){
             nextY=320
             speedY = - speedY;
         }  
         // 4 定位元素
         $('.move').css('left',nextX)
         $('.move').css('bottom',nextY)
    },20)
})
// 获取cookie
var un = getCookie('un')
//将数据传给后端
$('.center-05').on('click',async function(){
    var data = await $.ajax({
        url:"./php/xiangqing/03.php",
        type:'get',
        data:{
            'un':un,
            'price':$('.price').text(),
            'thing':$('.center-01>p').text(),
            'num':$('#num').val(),
            'img':$('#small>img').attr('src')
        }
    
    })
})

$('.taobao').click(function(){
    // console.log(1)
    window.location.href = './shop.html'
})