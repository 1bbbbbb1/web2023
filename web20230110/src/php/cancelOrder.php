<?php
//初始化返回值
$code = 0;
$msg = ["订单取消失败！","订单取消成功！"];
$data = [];

//从前端获取用户编号
$user_id = $_POST['user_id'];
// $user_id = 4;

//判断用户编号是否为空
if ($user_id == "") die("0");

//连接数据库
include("conn.php");
include("functions.php");

//查询orders表中用户编号为该值的订单编号最大的记录
$sql = "SELECT MAX(order_id) AS max_order_id FROM orders WHERE user_id = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 'i', $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

//如果查询成功，获取最大的订单编号
if (mysqli_num_rows($result) == 1) {
 $row = mysqli_fetch_assoc($result);
 $max_order_id = $row['max_order_id'];

 //更新orders表中该订单编号的状态为1
 $sql = "UPDATE orders SET status = 1 WHERE order_id = ?";
 $stmt = mysqli_prepare($conn, $sql);
 mysqli_stmt_bind_param($stmt, 'i', $max_order_id);
 mysqli_stmt_execute($stmt);

 //如果更新成功，返回成功的信息
 if (mysqli_stmt_affected_rows($stmt) == 1) {
  $code = 1;
  echo getApiResult($code, $data, $msg);
 } else {
 //如果更新失败，返回失败的信息
  echo getApiResult($code, $data, $msg);
 }
} else {
 //如果查询失败，返回失败的信息
 echo getApiResult($code, $data, $msg);
}

//关闭连接
mysqli_close($conn);
?>
