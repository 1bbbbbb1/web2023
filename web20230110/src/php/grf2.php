<?php
//定义返回结果的格式
$code = 0; //状态码，0表示失败，1表示成功
$data = []; //数据数组
$msg = ["获取数据失败","获取数据成功"]; //消息数组

//引入连接数据库的文件
include("conn.php");
include("functions.php");

//从前端获取user_id
// $user_id = $_GET["user_id"];

$user_id = 1;

//定义SQL语句，根据user_id查询一条记录
$sql = "select * from historical_nutrition where user_id = $user_id";

//执行SQL语句，获取结果集
$rs = mysqli_query($conn,$sql);

//判断结果集是否为空
if($rs){
    //从结果集中获取一条记录
    $row = mysqli_fetch_array($rs);

    //把每种营养价值的值存入数据数组中，按照给定的顺序
    $data[] = intval($row["salts"]);
    $data[] = intval($row["oil"]);
    $data[] = intval($row["Milk_products"]);
    $data[] = intval($row["Soybeans_and_nuts"]);
    $data[] = intval($row["Animal_food"]);
    $data[] = intval($row["Vegetables"]);
    $data[] = intval($row["Fruits"]);
    $data[] = intval($row["cereal"]);
    $data[] = intval($row["Potato"]);

    //修改状态码为1，表示获取数据成功
    $code = 1;
    echo getApiResult($code, $data, $msg);
}else{
    echo getApiResult($code, $data, $msg);
}

?>
