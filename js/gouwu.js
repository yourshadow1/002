// 到此页面，第一步通过cookie获取用户所有购物信息
var un = getCookie('un')
console.log(un)
    var data =  $.ajax({
        url:"./php/gouwu.php",
        data:{
            'un':un,
        },
        type:'get',
        dataType:'json',
        success:function(data){
            var arr = data[0]
            // var arr = 
            // 将arr变成一个二维数组，以便于循环添加
            // 以数量，名称，价格，图片的顺序添加
            arr = [[arr[4],arr[3],arr[2],arr[11]],[arr[7],arr[6],arr[5],arr[12]],[arr[9],arr[10],arr[8],arr[13]]]
            var num = [arr[4],arr[7],arr[9]]
            // var thing = []
            // console.log(arr)
            arr.forEach(function(item,index){
                // console.log(item[0])
                if(item[0]>0){
                    $('.main-box').append(`
                    <div class="box-con">
                    <div class="con-img">
                        <img src="./images/gouwu/gouwu_17.jpg" alt="">
                        <img src="./images/gouwu/gouwu_13.jpg" alt="">
                    </div>
                    <div class="con-text">
                        <div>
                            <input type="checkbox" name="reading" class="check">
                            <img src="${arr[index][3]}" alt="">
                            <p>${arr[index][1]}</p>
                        </div>
                        <div>￥${arr[index][2]}</div>
                        <div  class="con-text-inp">
                            <button class="btn1">-</button>
                            <input type="text" value="${arr[index][0]}">
                            <button class="btn2">+</button>
                        </div>

                        <div class="con-text-moy">￥${arr[index][0]*arr[index][2]}</div>
                        <div class="del">删除</div>
                    </div>
                </div>   
                    `)
                }
            })
        return num
        }
    })


// 下一步给每一个加减按钮添加点击事件
// 先判断购物车里是否有东西，如果没有则告诉用户快去购物吧


$('.main-box').on('click','.btn2',function(){
    // console.log($(this).parent().prev().text()) 
    var str = $(this).parent().prev().text()
    var num = ''
    if(str=='￥69.00'){
        num = 'num1'
    }else if(str=='￥59.00'){
        num = 'num2'
    }else{
        num = 'num3'
    }
    var that = $(this);
    $.ajax({
        url:"./php/gouwu_up.php",
        data:{
            un:un,
            type:'add',
            num:num,
        },
        dataType:"json",
        success:function(res){
            if(res.code==1){
                // that.next().html(parseInt(that.next().html())+1)
                
                let num = +that.prev().val()+1
                that.prev().val(num)
                let str = that.parent().prev().text()
                str = str.substr(1)
                console.log(str)
                that.parent().next().text('￥'+num*parseInt(str))
            }
        }
    })


})


// 减按钮
$('.main-box').on('click','.btn1',function(){
    var str = $(this).parent().prev().text()
    var num = ''
    if(str=='￥69.00'){
        num = 'num1'
    }else if(str=='￥59.00'){
        num = 'num2'
    }else{
        num = 'num3'
    }
    var that = $(this);
    $.ajax({
        url:"./php/gouwu_up.php",
        data:{
            un:un,
            type:'cut',
            num:num,
        },
        dataType:"json",
        success:function(res){
            if(res.code==1){
                // that.next().html(parseInt(that.next().html())+1)
                let num = that.next().val()-1
                if(num<1){
                    num = 0;
                    that.parent().parent().parent().css('display','none')
                    return
                }
                that.next().val(num)
                let str = that.parent().prev().text()
                str = str.substr(1)
                // console.log(str)
                that.parent().next().text('￥'+num*parseInt(str))
            }
        }
    })


})



// 复选按钮是否按下
$('.main-box').on('click','.check',function(){
    // console.log($(this).prop('checked'))
    var che = $(this).prop('checked')
    // console.log(che)
    let num = $(this).parent().next().next().next().text()
    num = parseInt(num.substr(1))
    // console.log(num)
    if(che){
        $('.moyAll').text(num+parseInt($('.moyAll').text()))
    }else{
        $('.moyAll').text(parseInt($('.moyAll').text())-num)
    }
})


// 操作时点击删除按钮，可以删除整个物件
$('.main-box').on('click','.del',function(){
    var str = $(this).prev().prev().prev().text()
    var that = $(this)
    var num = ''
    if(str=='￥69.00'){
        num = 'num'
    }else if(str=='￥59.00'){
        num = 'num2'
    }else{
        num = 'num3'
    }
    $.ajax({
        url:'./php/gouwu_del.php',
        data:{
            un:un,
            num:num,
        },
        dataType:"json",
        success:function(){
            that.parent().parent().css('display','none')
        }
    })
})


// 全选按钮
$('.bottom-che').click(function(){
    var che = $(this).prop('checked')
    if(che){
        $('.check').prop('checked','checked')
        // $('.moyAll').text(num+parseInt($('.moyAll').text()))
    }else{
        $('.check').prop('checked','')
    }

    
})


// 回到主页按钮
$('.nav-bottom>img').eq(0).click(function(){
    window.location.href = './index.html'
})