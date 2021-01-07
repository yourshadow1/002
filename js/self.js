var re = getCookie('re')
var un = getCookie('un')
if(re){
    var data = $.ajax({
        url:'./php/index/indexSec.php',
        method:'post',
        dataType:'json',
        data:{'un':un},
        success:function(){
            setCookie('re',true,1)
            // console.log(data.responseJSON[0])
            arr = data.responseJSON[0]
            // 这里用来接收数据
            $('.main-form-ul-span01').text(arr[5])
            $('.nav-ul1-li1').text(arr[5])
            $('.main-form-ul-span01').val(arr[5])
            $('.input-text01').attr('value',arr[5])
            $('.input-text03').attr('value',arr[6])
            console.log(arr)
        //    console.log(arr)
        },
        error:function(){
            // $('.theme-content-right-top001').css('display','none')
        }
    })
}

// console.log()
// 给编辑与保存按钮添加点击事件
$('.button1').click(function(e){
    e.preventDefault()
    // console.log(1)
    // console.log( $('.main-form-ul>li>input'))
    // $('.main-form-ul>li>input').attr('disabled','')
    $('.main-form-ul>li>input').removeAttr('disabled')
})

$('.button2').click(function(e){
    $('.main-form-ul>li>input').attr('disabled','')
    // console.log(111)
    console.log($('.input-text03').val())
    console.log($('.input-text01').val())
    e.preventDefault()
    // var arr = ["13", "1572180305", "12345678", null, "./images/urseimf/11.jpg", "你的武器", "不是吧，air，看看淘宝也犯法？", null]
    $.ajax({
        url:'./php/self.php',
        method:'get',
        dataType:'json',
        data:{
            'un':un,
            // pw:arr[2],
            // shang:arr[3],
            // img:arr[4],
            'gxqm':$('.input-text03').val(),
            'wangming':$('.input-text01').val(),
        },
        success:function(data){
            console.log(data.code)
            alert('保存成功')
        }
    })  
})

// 退出登录
$('#last').click(function(){
    $('#aler').css('display','block')
    $('#aler>button').eq(0).click(function(){
        console.log('已经退出了')
        removeCookie('un')
        window.location.href = '../project/index.html'
    })
    $('#aler>button').eq(1).click(function(){
        $('#aler').css('display','none')
    })
})

