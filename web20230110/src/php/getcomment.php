<?php
//初始化返回值
$code = 0;
$msg = ["获取评论失败", "获取评论成功"];
$data = [];

//连接数据库
include("conn.php");
include("functions.php");

//查询评论表和用户表，根据用户id关联，获取评论内容和用户名
$sql = "SELECT comment_id, comment, user_name FROM comment INNER JOIN users ON comment.user_id = users.user_id";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
 //如果有结果，将每一条评论和用户名放入$data数组中
 while ($row = mysqli_fetch_assoc($result)) {
 $data[] = $row;
 }
 $code = 1;
}

//返回JSON格式的结果
echo getApiResult($code, $data, $msg);

//关闭连接
mysqli_close($conn);
?>
