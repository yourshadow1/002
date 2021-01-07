// nav专栏
// <中国大陆>地址选择触发
// 鼠标入事件
$('#nav-firstLi').hover(function(){
    $('.nav-first').stop().slideDown()
},function(){
    $('.nav-first').stop().slideUp()
})
// 鼠标移出事件
$('.nav-first').mouseleave(function(){
    $('.nav-first').stop().slideUp()
})
// 鼠标点击子元素内容事件
$('.nav-first>li').click(function(){
    $('.nav-first').slideUp()
    $('#nav-firstLi>span').text(this.innerText)
})


// 我的淘宝触发
$('.nav_u2-my').hover(function(){
    $('.nav_u2-my>ul').slideDown()
},function(){
    $('.nav_u2-my>ul').slideUp()
})
$('.nav_u2-my>ul').mouseleave(function(){
    $('.nav_u2-my>ul').slideUp()
})
// 购物车点击触发
$('.nav_u2-mai').click(function(){
    window.location.href = '../project/shop.html'
})

// 收藏夹事件
$('.nav_u2-collect').hover(function(){
    $('.nav_u2-collect>ul').slideDown()
},function(){
    $('.nav_u2-collect>ul').slideUp()
})
$('.nav_u2-collect>ul').mouseleave(function(){
    $('.nav_u2-collect>ul').slideUp()
})

// 网站导航触发
$('.nav_u2-main').mouseenter(function(){
    $('.nav_u2-main-boss').stop().slideDown()
})
$('.nav_u2-main-boss').mouseleave(function(){
    $('.nav_u2-main-boss').stop().slideUp()
})

// h1的地方
$('.h1').click(function(){
    window.location.href = '../project/index.html'
})



// 需求分析：
/* 
    一开始页面是一个注册页面，有账户密码两个选项框
    只有当两个选项框都满足正则时才可以点击按钮进行下一步
    当点击按钮时，执行一个函数，这个函数可以判断是否是否符合要求，如果是，就给对应的上方span加上高亮

    

*/
var inputReg1
var inputReg2
// var ursename;
// var password;
// 这是步骤一：判断第一个文本是否符合要求
$('.main-step-bigbox-one-inpu1').on('input',function(){
    inputReg1=false;
    var reg = /^\d{8,16}$/
    if(reg.test($('.main-step-bigbox-one-inpu1').val())){
        $('.main-step-bigbox-span1').css({
            'background':'green',
            'display':'block'
        })
        inputReg1 = true

        
        // if(inputReg1)
        
        $('.main-step-bigbox-span1').text('合格')
    }else{
        $('.main-step-bigbox-span1').css({
            'background':'red',
            'display':'block'
        })
        $('.main-step-bigbox-span1').text('不合格')
        inputReg1 = false
    }
})
// 判断第二个文本是否符合要求
$('.main-step-bigbox-one-inpu2').on('input',function(){
    inputReg2=false
    var reg = /^[a-z0-9_-]{6,18}$/
    if(reg.test($('.main-step-bigbox-one-inpu2').val())){
        $('.main-step-bigbox-span2').css({
            'background':'green',
            'display':'block'
        })
        inputReg2 = true
        $('.main-step-bigbox-span2').text('合格')
    }else{
        $('.main-step-bigbox-span2').css({
            'background':'red',
            'display':'block'
        })
        inputReg2 = false
        $('.main-step-bigbox-span2').text('不合格')
    }
})

// 按钮点击事件
$('.main-step-bigbox-for-bnt').click(async function(){
    // 当这两个参数为真的时候，才可以进行第二步
    if(inputReg1&&inputReg2){
        // 向下一个地方开始高亮
        var data001 = await $.post("./php/loginsec.php",{ursename:$('.main-step-bigbox-one-inpu1').val()})
        data001 = JSON.parse(data001)
        if(data001.code==1){
            $('.main-step-bigbox-span1').text('已存在该账号，请重新输入')
            inputReg1 = false
            $('.main-step-bigbox-span1').css({
                'background':'red',
                'display':'block'
            })
        }
        if(inputReg1&&inputReg2){
        // console.log(2)
        ursename = $('.main-step-bigbox-one-inpu1').val()
        password = $('.main-step-bigbox-one-inpu2').val()
        // 上面第二步高亮
        $('.main-step>li>i').eq('1').css({
            'background':'red',
            'color':'white', 
        })
        $('.main-step>li>em').eq('1').css({
            'color':'red', 
        })
        // 将第一次input里面的字制空
        $('.main-step-bigbox-one-inpu1').val(' ')
        $('.main-step-bigbox-one-inpu2').val(' ')
        // 将两个span制空
        $('.main-step-bigbox-span1').css('display','none')
        $('.main-step-bigbox-span2').css('display','none')
        // 此时可以进入第三步
            $('.main-step-bigbox-two-span').click(function(){
                $('.main-step>li>i').eq('2').css({
                    'background':'red',
                    'color':'white', 
                })
                $('.main-step>li>em').eq('2').css({
                    'color':'red', 
                })
                $('.main-step-bigbox-two').css('display','none')
                $('.main-step-bigbox-thr').css('display','block')
                // 此时进行第四步
                $('.main-step-bigbox-for-bnt').off('click') //这里先清除点击的第一次事件
                $('.main-step-bigbox-for-bnt').on('click',function(){
                    $('.main-step>li>i').eq('3').css({
                        'background':'red',
                        'color':'white', 
                    })
                    $('.main-step>li>em').eq('3').css({
                        'color':'red', 
                    })
                    
                    $('.main-step-bigbox-for-bnt').val('完成注册')
                    $('.main-step-bigbox-for-bnt').off('click') //这里先清除点击的第二次事件
                    // 最后，需要清除btn前面的所有事件，添加点击发送ajax事件
                    $('.main-step-bigbox-for-bnt').click(async function(){
                            var data = await $.ajax({
                                url:'./php/login.php',
                                type:'post',
                                dataType:'json',
                                data:{
                                    'ursename':ursename,
                                    'password':password
                                },
                                success:function(data){
                                    if(data.code){
                                        
                                    }else{
                                        alert('服务器出错')
                                    }
                                }
                            })
                            window.location.href = '../project/register.html'
                            
                    })
                    $('.main-step-bigbox-thr').css('display','none')
                    $('.main-step-bigbox-fore').css('display','block')
                    $('.main-step-bigbox-for-bnt').css({
                        'width':'230px',
                        'height': '30px',
                        'background':'red',
                        'color':'white'
                    })


                })
            })
        $('.main-step-bigbox-one').css('display','none')
        $('.main-step-bigbox-two').css('display','block')
        }
        



    }
})


$(window).ajaxStart(function () {
    $('.blinking').css('display','block')

})
$(window).ajaxStop(function () {
    $('.blinking').css('display','none')
})