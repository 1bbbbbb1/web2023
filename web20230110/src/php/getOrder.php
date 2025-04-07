<?php
//初始化返回值
$code = 0;
$msg = ["操作失败", "操作成功"];
$data = [];

//从前端获取user_id
$user_id = $_POST['user_id'];


// $user_id = 4;

//判断user_id是否为空
if ($user_id == "") die("0");

//连接数据库
include("conn.php");
include("functions.php");

//查询orders表中对应的user_id的订单编号最大的状态是0或2的记录的订单编号
$sql = "SELECT order_id FROM orders WHERE user_id = ? AND status IN (0,2) ORDER BY order_id DESC LIMIT 1";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 'i', $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
if (mysqli_num_rows($result) > 0) {
    //如果存在，获取order_id
    $row = mysqli_fetch_assoc($result);
    $order_id = $row['order_id'];
    //查询ordered_foods表中所有订单编号为上述值的记录的food_id
    $sql = "SELECT food_id FROM ordered_foods WHERE order_id = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, 'i', $order_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    if (mysqli_num_rows($result) > 0) {
        //如果存在，把food_id放入数组中
        $food_ids = [];
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($food_ids, $row['food_id']);
        }
        //返回成功信息和数组
        $data['food_ids'] = $food_ids;
        echo getApiResult(1,$data,$msg);
    } else {
        //如果不存在，返回失败信息
        echo getApiResult(0,$data,$msg);
    }
} else {
    //如果不存在，返回失败信息
    echo getApiResult(0,$data,$msg);
}

//关闭连接
mysqli_close($conn);

?>

