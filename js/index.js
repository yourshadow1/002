// 如果是从登录页面跳转过来的先获取cookie
var un = getCookie('un')
var data = $.ajax({
    url:'./php/index/indexSec.php',
    method:'get',
    dataType:'json',
    data:{'un':un},
    success:function(){
        setCookie('re',true,1)
        console.log(data.responseJSON[0])
        arr = data.responseJSON[0]
        // console.log(arr)
        $('.theme-content-right-top001').css('display','block')
        $('#theme-p01').text('欢迎回来:'+arr[5])
        $('#theme-p02').text('个性签名:'+arr[6])
        // console.log(arr[4])
        // $('#theme-img01').attr('src',arr[4]+'')
    },
    error:function(){
        $('.theme-content-right-top001').css('display','none')
    }
})



// 导航栏鼠标滑过



// console.log(arr)

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
    if(un){
        window.location.href = './shop.html'
    }else{
        alert('请先登录')
    } 
})
// 
$('.rigis').click(function(){
    if(un){
        
    }else{
        window.location.href = './register.html'
    }
})

// 秒杀功能
function timeDiff(a,b){
    var timeArr = []
    var diff = parseInt(Math.abs(a-b) / 1000)  //把两个时间差计算出来，再以此计算多久
    var day = parseInt(diff/(24*60*60))
    var hours = parseInt((diff-day*24*60*60)/3600)
    var minute = parseInt((diff-day*24*60*60-hours*60*60)/60)
    var second = parseInt(diff-day*24*60*60-hours*60*60-minute*60)
    // console.log(day,hours,minute,second)
    timeArr = [day,hours,minute,second]
    return timeArr
}
var timeID = setInterval(function(){
    var nowTime = new Date()
    var diffTime = new Date(2021,1,11,0)
    var arrTime = timeDiff(nowTime,diffTime)
    $('.every-div01-p>span').eq(0).text(arrTime[0])
    $('.every-div01-p>span').eq(1).text(arrTime[1])
    $('.every-div01-p>span').eq(2).text(arrTime[2])
    $('.every-div01-p>span').eq(3).text(arrTime[3])
        
},1000)


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



// 登录事件
$('.nav_u1>li:nth-child(2)').click(function(){
    window.location.href = './register.html'
})
$('.nav_u1>li:nth-child(3)').click(function(){
    window.location.href = './login.html'
})



// 搜索框事件
$('.topSerchTop>p').on('click',function(){
    $(this).addClass('topSerchHig').siblings().removeClass('topSerchHig')
    console.log($(this).index())
    if($(this).index()==0){
        $('.topSerchUl').css('display','block')
        $('.topSerchInp :nth-child(1)').attr('placeholder','打底衫新款2020爆款')
    }
    if($(this).index()==1){
        $('.topSerchUl').css('display','none')
        $('.topSerchInp :nth-child(1)').attr('placeholder','天猫，我还能折')
    }
    if($(this).index()==2){
        $('.topSerchUl').css('display','block')
        $('.topSerchInp :nth-child(1)').attr('placeholder','精品店铺搜素关键字')
    }
})
// 搜索点击事件
$('.topSerchInpText').on('input',async function(){
    var num111
    if($('.topSerchInp-ul01').text()){
        console.log(1)
        $('.topSerchInp-ul01').css('display','none')
    }
    $('.topSerchInp-ul01').css('display','block')
    num111 = await $.ajax({
        url:'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1608778754036_954&callback=jsonp955&k=1&area=c2c&bucketid=15',
        data:{
            q:$('.topSerchInpText').val()
        },
        dataType:'jsonp',
    })
    var arr = num111.result
    $('.topSerchInp-ul01').empty()
    // console.log(arr)
    arr.forEach(function(index,item){
        $('.topSerchInp-ul01').append(`<li>${index[0]}</li>`)
    })
})
$('.topSerchInpText').on('blur',function(){
    $('.topSerchInp-ul01').css('display','none')
})




// 主题市场
// 左边导航事件
$('.theme-content-left>li').mouseenter(function(){
    $('.theme-content-left-div').css('display','none')
    $('.theme-content-left-div-all>div').eq($(this).index()).css('display','block')
})
$('.theme-content-left-div').mouseleave(function(){
    $('.theme-content-left-div').css('display','none')
})
$('.theme-content-left').mouseleave(function(){
    $('.theme-content-left-div').css('display','none')
})

// 中间轮播图
// 上面大轮播图
var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,
    },
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay:true,
    // 如果需要滚动条
   /*  scrollbar: {
      el: '.swiper-scrollbar',
    }, */
  })    

//   右边的块
// 中间文字区域
$('.theme-content-right-mid li').mouseenter(function(){
    $('.theme-content-right-mid li span').remove()
    // $(this).css('color','red')
    $(this).append('<span><span>')
    let span = $(this).index()
    if(span==0){
        $('.theme-content-right-mid-text').text('关于开展打击网络"有偿删帖"和"软色情"专项')
    }else if(span==1){
        $('.theme-content-right-mid-text').text('新增《淘宝网汽配行业》淘宝网区域零售服务')
    }else if(span==2){
        $('.theme-content-right-mid-text').text('淘宝618大促报名     金牌卖家志愿者招募')
    }else if(span==3){
        $('.theme-content-right-mid-text').text('魔豆妈妈公益项目     让母爱永不打炸!')
    }else if(span==4){
        $('.theme-content-right-mid-text').text('淘宝公益平台正式更名益起来商家招蔡即将截')
    }
})
// 选项卡区域
$('.theme-content-right-bot>a').mouseenter(function(e){
    e.preventDefault()
    console.log($(this).index())
    // eq($('this').index())
    $('.theme-content-right-bot>a').removeClass()
    $(this).addClass('on')
    
    $('.theme-content-right-bot>div').css('display','none')
    $('.theme-content-right-bot>div').eq($(this).index()).css('display','block')
})
$('.guessLike-box-li').mouseenter(function(){
    
    console.log(this)
})


// 只有在登录的时候才能进入个人中心以及购物车
