<?php
include './conect.php';
$un = $_REQUEST['un'];
$numStr = $_REQUEST['num'];
// 第一步建立数据库连接
// $conn = mysqli_connect('localhost','root','root','taobao');
// 第二步sql
// 查询语句，查询该用户所有的购物信息
// $row = mysqli_fetch_assoc($res);
/* $num1 = $row['num'];
$num2 = $row['num2'];
$num3 = $row['num3']; */
$sql = "UPDATE `gwc` SET `$numStr`='0' WHERE `username`='$un'";
$result = mysqli_query($conn,$sql);

if($result){
	echo json_encode(array("code"=>1));
}else{
	echo json_encode(array("code"=>0));
}
?>