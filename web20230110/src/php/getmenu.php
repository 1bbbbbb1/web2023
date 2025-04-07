<?php
//定义返回结果的格式
$code = 0; //状态码，0表示失败，1表示成功
$data = []; //数据数组
$msg = ["获取菜单失败","获取菜单成功"]; //消息数组

//引入连接数据库的文件
include("conn.php");
include("functions.php");

//定义SQL语句，查询所有的记录
$sql = "select * from foods";

//执行SQL语句，获取结果集
$rs = mysqli_query($conn,$sql);

//遍历结果集，把每一条记录存入数据数组中
$i = 0;
while($row = mysqli_fetch_array($rs)){
    $data[$i]["food_id"] = $row["food_id"];
    $data[$i]["food_name"] = $row["food_name"];
    $data[$i]["food_details"] = $row["food_details"];
    $data[$i]["food_ava"] = $row["food_ava"];
    $data[$i]["food_coast"] = $row["food_coast"];
    $data[$i]["type"] = $row["type"];
    $data[$i]["salts"] = $row["salts"];
    $data[$i]["oil"] = $row["oil"];
    $data[$i]["Milk_products"] = $row["Milk_products"];
    $data[$i]["Soybeans_and_nuts"] = $row["Soybeans_and_nuts"];
    $data[$i]["Animal_food"] = $row["Animal_food"];
    $data[$i]["Vegetables"] = $row["Vegetables"];
    $data[$i]["Fruits"] = $row["Fruits"];
    $data[$i]["cereal"] = $row["cereal"];
    $data[$i]["Potato"] = $row["Potato"];
    $i++;
}

//如果数据数组不为空，说明获取数据成功，修改状态码为1
if(count($data) > 0) {
    $code = 1;
    echo getApiResult($code, $data, $msg);
}else{
    echo getApiResult($code, $data, $msg);
}
//设置响应头为json格式
//把状态码，数据数组和消息数组编码为json字符串，并输出给前端
?>
