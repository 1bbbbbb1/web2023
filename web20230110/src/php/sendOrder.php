<?php
//初始化返回值
$code = 0;
$msg = ["订单创建失败！","订单创建成功！"];
$data = [];

//从前端获取用户编号和菜品数组
$user_id = $_POST['user_id'];
$json = $_POST['json'];

// $user_id = 4;

// $json = '[
//     {
//     "dishID" : 1,
//     "dishNum" : 10
//     },
//     {
//     "dishID" : 2,
//     "dishNum" : 12
//     },
//     {
//     "dishID" : 3,
//     "dishNum" : 10
//     }
// ]';

$array = json_decode($json, true);


//判断用户编号和菜品数组是否为空
if ($user_id == "" || $json == "") die("0");

//连接数据库
include("conn.php");
include("functions.php");

//在orders表中插入一条记录，设置状态为0
$sql = "INSERT INTO orders (user_id, status) VALUES (?, 0)";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 'i', $user_id);
mysqli_stmt_execute($stmt);

//如果插入成功，获取插入的订单编号
if (mysqli_stmt_affected_rows($stmt) == 1) {
 $order_id = mysqli_insert_id($conn);

 //遍历菜品数组，对每个菜品在ordered_foods表中插入一条记录，设置订单编号、菜品编号和菜品数量
 foreach ($array as $item) {
  $dishID = $item["dishID"];
  $dishNum = $item["dishNum"];
  $sql = "INSERT INTO ordered_foods (order_id, food_id, food_nums) VALUES (?, ?, ?)";
  $stmt = mysqli_prepare($conn, $sql);
  mysqli_stmt_bind_param($stmt, 'iii', $order_id, $dishID, $dishNum);
  mysqli_stmt_execute($stmt);
 }

 //返回成功的信息
 $code = 1;
 echo getApiResult($code, $data, $msg);
} else {
 //如果插入失败，返回失败的信息
 echo getApiResult($code, $data, $msg);
}

//关闭连接
mysqli_close($conn);
?>
