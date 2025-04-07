<?php
//初始化返回值
$code = 0;
$msg = ["查询失败", "查询成功"];
$data = [];
//从前端获取信号
// $signal = $_POST['signal'];

// $signal = "1";

//判断信号是否为空
// if ($signal == "") die("0");

//连接数据库
include("conn.php");
include("functions.php");

//查询orders表中所有的订单

$sql = "SELECT * FROM orders";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
 //如果有订单，遍历每一条记录
 $code = 1;
 while ($row = mysqli_fetch_assoc($result)) {
  //获取订单的id，用户id和状态
  $order_id = $row['order_id'];
  $user_id = $row['user_id'];
  $status = $row['status'];

  //根据用户id在users表中获取用户名
  $sql = "SELECT user_name FROM users WHERE user_id = ?";
  $stmt = mysqli_prepare($conn, $sql);
  mysqli_stmt_bind_param($stmt, 'i', $user_id);
  mysqli_stmt_execute($stmt);
  $result2 = mysqli_stmt_get_result($stmt);
  $user_name = mysqli_fetch_assoc($result2)['user_name'];

  //根据订单id在ordered_foods表中获取菜品id和数量
  $sql = "SELECT food_id, food_nums FROM ordered_foods WHERE order_id = ?";
  $stmt = mysqli_prepare($conn, $sql);
  mysqli_stmt_bind_param($stmt, 'i', $order_id);
  mysqli_stmt_execute($stmt);
  $result3 = mysqli_stmt_get_result($stmt);

  //初始化菜品数组和总价
  $foods = [];
  $total_price = 0;

  //遍历每一条菜品记录
  while ($row2 = mysqli_fetch_assoc($result3)) {
   //获取菜品id和数量
   $food_id = $row2['food_id'];
   $food_nums = $row2['food_nums'];

   //根据菜品id在foods表中获取菜名和单价
   $sql = "SELECT food_name, food_coast FROM foods WHERE food_id = ?";
   $stmt = mysqli_prepare($conn, $sql);
   mysqli_stmt_bind_param($stmt, 'i', $food_id);
   mysqli_stmt_execute($stmt);
   $result4 = mysqli_stmt_get_result($stmt);
   $row3 = mysqli_fetch_assoc($result4);

   //获取菜名和单价
   $food_name = $row3['food_name'];
   $food_coast = $row3['food_coast'];

   //计算菜品的总价，并累加到总价中
   $food_price = $food_coast * $food_nums;
   $total_price += $food_price;

   //将菜品的信息存入数组中
   array_push($foods, ["food_name" => $food_name, "food_nums" => $food_nums, "food_price" => $food_price]);
  }

  //将订单的信息存入数组中
  array_push($data, ["order_id" => $order_id, "user_name" => $user_name, "foods" => $foods, "total_price" => $total_price, "status" => $status]);
 }
}

echo getApiResult($code, $data, $msg);

//关闭连接
mysqli_close($conn);
?>
