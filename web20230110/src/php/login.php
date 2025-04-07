<?php
//初始化返回值
$code = 0;
$msg = ["未找到用户名！","登录失败，密码错误！", "登录成功！"];
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
$sql = "SELECT user_id, user_password FROM users WHERE user_name = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 's', $user_name);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

//如果不存在，返回“没有对应的用户名”
if (mysqli_num_rows($result) == 0) {
  echo getApiResult($code, $data, $msg);
} else {
  //如果存在，获取用户的密码
  $row = mysqli_fetch_assoc($result);
  $db_password = $row['user_password'];

  //比较密码是否一致
  if ($user_password == $db_password) {
    //如果一致，返回true
    $code = 2;
    $data = $row['user_id'];
    echo getApiResult($code, $data, $msg);
  } else {
    //如果不一致，返回false
    $code = 1;
    echo getApiResult($code, $data, $msg);
  }
}

//关闭连接
mysqli_close($conn);
?>
