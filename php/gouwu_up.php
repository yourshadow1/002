<?php
// require('./model/_connect.php');
$un = $_REQUEST['un'];
$numStr = $_REQUEST['num'];
$type = $_REQUEST['type'];

// 第一步建立数据库连接
// $conn = mysqli_connect('localhost','root','root','taobao');
include './conect.php';
// 第二步sql
// 查询语句，查询该用户所有的购物信息
$sql = "SELECT * FROM `gwc` WHERE `username`='$un'";
$res = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($res);
$num1 = $row['num'];
$num2 = $row['num2'];
$num3 = $row['num3'];

if($type=='add'){	
    if($numStr=='num1'){
        // 当为69块钱的时候，是第一个num
        $num1 = $num1 + 1;
        $sql2 = "UPDATE `gwc` SET `num`='$num1' WHERE `username`='$un'";
    }else if($numStr=='num2'){
        $num2 = $num2 + 1;
        $sql2 = "UPDATE `gwc` SET `num2`='$num2' WHERE `username`='$un'";
    }else{
        $num3 = $num3 + 1;
        $sql2 = "UPDATE `gwc` SET `num3`='$num3' WHERE `username`='$un'";
    }
}else{
	if($numStr=='num1'){
        // 当为69块钱的时候，是第一个num
        $num1 = $num1 - 1;
        $sql2 = "UPDATE `gwc` SET `num`='$num1' WHERE `username`='$un'";
    }else if($numStr=='num2'){
        $num2 = $num2 - 1;
        $sql2 = "UPDATE `gwc` SET `num`='$num2' WHERE `username`='$un'";
    }else{
        $num3 = $num3 - 1;
        $sql2 = "UPDATE `gwc` SET `num`='$num3' WHERE `username`='$un'";
    }
}


$result = mysqli_query($conn,$sql2);

if($result){
	echo json_encode(array("code"=>1));
}else{
	echo json_encode(array("code"=>0));
}
?>