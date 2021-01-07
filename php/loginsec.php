<?php
    // 查询数据库中是否存在这个账号，如果存在，则返回code1，不存在返回code0
    $un = $_REQUEST['ursename'];//商品ursename
    // $conn = mysqli_connect('localhost','root','root','taobao');
    include './conect.php';
    // 2.2 执行sql语句
 // 2 执行sql语句
 $sql = "SELECT * FROM `yh` WHERE `username`='$un'";
 $res = mysqli_query($conn,$sql);// $res:sql语句出现错误，才是false
    // 3 解析查询结果
    $data = mysqli_fetch_all($res);
    // 4 断开链接
    mysqli_close($conn);
    if($data){
        echo json_encode(array("code"=>1));
    }else{
        echo json_encode(array("code"=>0));
    }

?>