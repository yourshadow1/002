<?php
header('content-type:text/html;charset=utf-8;');
$un = $_REQUEST['un'];//商品ursename
$gxqm = $_REQUEST['gxqm'];//个性签名
$wangming = $_REQUEST['wangming'];//网上昵称
    // 2 把用户修改的数据存储在数据库里面
    // 2.1 连接数据库
    // $conn = mysqli_connect('localhost','root','root','taobao');
    include './conect.php';
    // 2.2 执行sql语句
    $sql = "UPDATE `yh` SET `wangming`='$wangming', `gxqm`='$gxqm' WHERE `username`='$un'";
    // $sql = "INSERT INTO `yh` (`username`,`password`) VALUES ('$un','$pw')";
    $res = mysqli_query($conn,$sql);
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