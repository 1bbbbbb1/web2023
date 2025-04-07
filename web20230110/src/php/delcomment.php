<?php
//初始化返回值
$code = 0;
$msg = ["删除评论失败", "删除评论成功"];
$data = [];

//从前端获取评论id
$comment_id = $_GET['comment_id'];
// $comment_id = 1;

//判断评论id是否为空
if ($comment_id == "") die("0");

//连接数据库
include("conn.php");
include("functions.php");

//删除评论表中对应的记录
$sql = "DELETE FROM comment WHERE comment_id = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 'i', $comment_id);
mysqli_stmt_execute($stmt);

if (mysqli_stmt_affected_rows($stmt) > 0) {
 $code = 1;
}

//返回JSON格式的结果
echo getApiResult($code, $data, $msg);

//关闭连接
mysqli_close($conn);
?>
