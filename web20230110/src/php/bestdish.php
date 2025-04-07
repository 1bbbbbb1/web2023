<?php
$code=0;
$data=[];
$msg=["获取推荐菜品失败","获取推荐菜品成功"];

include("conn.php");
include("functions.php");

// $type=$_GET["type"];

//在total_referrals表中选出sum值最大的三条记录
$sql="select food_id from total_referrals order by sum desc limit 3";
$rs=mysqli_query($conn,$sql);

//存储food_id
$food_ids=[];
$i=0;
while($row=mysqli_fetch_array($rs)){
    $food_ids[$i]=$row["food_id"];
    $i++;
}

//在foods表中找到对应的记录
$sql="select * from foods where food_id in (".implode(",",$food_ids).")";
$rs=mysqli_query($conn,$sql);

//存储记录信息
$i=0;
while($row=mysqli_fetch_array($rs)){
    $data[$i]["food_id"]=$row["food_id"];
    $data[$i]["food_name"]=$row["food_name"];
    $data[$i]["food_details"]=$row["food_details"];
    $data[$i]["food_ava"]=$row["food_ava"];
    $data[$i]["food_coast"]=$row["food_coast"];
    $data[$i]["type"]=$row["type"];
    $data[$i]["salts"]=$row["salts"];
    $data[$i]["oil"]=$row["oil"];
    $data[$i]["Milk_products"]=$row["Milk_products"];
    $data[$i]["Soybeans_and_nuts"]=$row["Soybeans_and_nuts"];
    $data[$i]["Animal_food"]=$row["Animal_food"];
    $data[$i]["Vegetables"]=$row["Vegetables"];
    $data[$i]["Fruits"]=$row["Fruits"];
    $data[$i]["cereal"]=$row["cereal"];
    $data[$i]["Potato"]=$row["Potato"];
    $i++;
}

if(count($data)>0) {
    $code = 1;
    echo getApiResult($code, $data, $msg);
}else{
    echo getApiResult($code, $data, $msg);
}

?>
