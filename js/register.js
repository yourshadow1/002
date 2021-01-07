var passReg = document.querySelector('.passReg');//第一个切换块
var passReg2 = document.querySelector('.passReg2');//第二个切换块
var registerOne = document.querySelector('.registerOne');//点击切换文字的父级
var text1 = registerOne.children[0];//点击切换的文字1
var text2 = registerOne.children[1];//点击切换的文字2
var submit = document.querySelector('.passSub');//提交按钮
var passBottom = document.querySelector('.passBottom')


// text-decoration:underline
text1.onclick = function(){
    text1.style.textDecoration = 'underline'
    text2.style.textDecoration = 'none'
    passReg.style.display = 'block'
    passReg2.style.display = 'none'
}
text2.onclick = function(){
    text2.style.textDecoration = 'underline'
    text1.style.textDecoration = 'none'
    passReg2.style.display = 'block'
    passReg.style.display = 'none'
}
// 提交的时候，判断是否有这个用户，如果有，就登录进去，回到主页
$('.passSub').click(async function(event){
    event.preventDefault();
    var data = await $.ajax({
        url:'./php/register.php',
        type:'post',
        data:{
            'un':$('.number-input1').val(),
            'pw':$('.number-input2').val()
        },
        dataType:'json',
        success:function(data){
            // console.log(data)
            // console.log(1)
            if(data.code==0){
                alert('登录失败，请重试（可能是账号密码不对）')
                $('.number-input1').val('')
                $('.number-input2').val('')
            }else{
                // removeCookie('un')
                // removeCookie('pw')
                setCookie('un',$('.number-input1').val(),1)
                // setCookie('pw',$('.number-input2').val(),1)
                // console.log(123456)
                window.location.href = '../project/index.html'
            }
        }
    })
}) 

$('.passBottom-last').click(function(){
    window.location.href = '../project/login.html'
})


/* console.log(getCookie('ursename'))
console.log(getCookie('password')) */
// 等待特效
$(window).ajaxStart(function () {
    // console.log('有一个请求开始了')
    $('.blinking').css('display','block')

})
$(window).ajaxStop(function () {
    $('.blinking').css('display','none')
    // console.log('有一个请求结束了')
})