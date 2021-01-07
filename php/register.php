<?php
//获取前端的参数
$un = $_REQUEST['un'];//商品ursename
$pw = $_REQUEST['pw'];//商品password
    // 2 把用户名和密码存储在数据库里面
    // 2.1 连接数据库
    // $conn = mysqli_connect('localhost','root','root','taobao');
    include './conect.php';
    // 2.2 执行sql语句
    $sql = "SELECT * FROM `yh` WHERE `username`='$un' AND `password`='$pw'";
    $res = mysqli_query($conn,$sql);
    // 3 解析查询结果
    $data = mysqli_fetch_all($res);
    if($data){
        // echo "登录成功";
        // 直接返回数据给前端
        $arr = array('code'=>1);
        echo json_encode($arr);
        // 跳转页面——页面重定向
        // header('location:./08购物车.html');
    }else{
        // echo "登录失败";
        // 直接返回数据给前端
        $arr = array('code'=>0);
        echo json_encode($arr);
        // 跳转页面——页面重定向
        // header('location:./08login.html');
    }
    // 4 断开连接
    mysqli_close($conn);

?>