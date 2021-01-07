<?php
//获取前端的参数
$un = $_REQUEST['ursename'];//商品ursename
$pw = $_REQUEST['password'];//商品password
    // 2 把用户名和密码存储在数据库里面
    // 2.1 连接数据库
    // $conn = mysqli_connect('localhost','root','root','taobao');
    include './conect.php';
    // 2.2 执行sql语句
    $sql = "INSERT INTO `yh` (`username`,`password`,`wangming`,`gxqm`) VALUES ('$un','$pw','小淘','这人很懒，什么也没留下')";
    $sql2 = "INSERT INTO `gwc` (`username`) VALUES ('$un')";
    $res = mysqli_query($conn,$sql);
    $res2 = mysqli_query($conn,$sql2);
    // 2.3 插入的结果是布尔值,不需要解析
    // 2.4 断开链接
    mysqli_close($conn);
    if($res){
        echo json_encode(array("code"=>1));
    }else{
        echo json_encode(array("code"=>0));
    }
    // 3 把存储成功或者失败的信息发送给前端
    // var_dump($res);
?>