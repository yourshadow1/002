<?php
    $un = $_REQUEST['un'];//账号un
    // $conn = mysqli_connect('localhost','root','root','taobao');
    include '../conect.php';
    // 2.2 执行sql语句
    // 2 执行sql语句
    $sql = "SELECT * FROM `yh` WHERE `username`='$un'";
    $res = mysqli_query($conn,$sql);// $res:sql语句出现错误，才是false
    // 3 解析查询结果
    $data = mysqli_fetch_all($res);
    // 4 断开链接
    // echo($res);
    echo(json_encode($data));
    mysqli_close($conn);
    /* if($data){
        echo json_encode(array("code"=>1));
    }else{
        echo json_encode(array("code"=>0));
    } */

?>