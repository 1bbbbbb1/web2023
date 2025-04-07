<?php
//初始化返回值
$code = 0;
$msg = ["注册失败，该用户名已存在", "注册成功"];
$data = [];

//从前端获取用户名和密码
$user_name = $_POST['user_name'];
$user_password = $_POST['user_password'];

// $user_name = "yjs";
// $user_password = "7758258";

//判断用户名和密码是否为空
if ($user_name == "" || $user_password == "") die("0");

//连接数据库
include("conn.php");
include("functions.php");

//查询用户名是否存在

$sql = "SELECT user_id FROM users WHERE user_name = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 's', $user_name);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);


if (mysqli_num_rows($result) > 0) {
  $rmp = mysqli_num_rows($result);
  echo getApiResult($code, $data, $msg);
} else {
  //如果不存在，插入新的用户记录，并返回true
  $sql = "INSERT INTO users (user_name, user_password) VALUES (?, ?)";
  $stmt = mysqli_prepare($conn, $sql);
  mysqli_stmt_bind_param($stmt, 'ss', $user_name, $user_password);
  mysqli_stmt_execute($stmt);

  if (mysqli_stmt_affected_rows($stmt) > 0) {
    $code = 1;
  }
  
  echo getApiResult($code, $data, $msg);
}

//关闭连接
mysqli_close($conn);
?>
