<?php
//初始化返回值
$code = 0;
$msg = ["删除失败", "删除成功"];
$data = [];

//从前端获取菜品id
$food_id = $_POST['food_id'];

// $food_id = "1";

//判断菜品id是否为空
if ($food_id == "") die("0");

//连接数据库
include("conn.php");
include("functions.php");

//根据菜品id在foods表中删除对应的记录

$sql = "DELETE FROM foods WHERE food_id = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 'i', $food_id);
mysqli_stmt_execute($stmt);

if (mysqli_stmt_affected_rows($stmt) > 0) {
 //如果删除成功，返回true
 $code = 1;
}

echo getApiResult($code, $data, $msg);

//关闭连接
mysqli_close($conn);
?>
