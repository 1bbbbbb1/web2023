<?php
//定义返回结果的格式
$code = 0; //状态码，0表示失败，1表示成功
$data = []; //数据数组
$msg = ["获取图表1数据失败","获取图表1数据成功"]; //消息数组

//引入连接数据库的文件
include("conn.php");
include("functions.php");

//定义SQL语句，使用左连接和分组函数来计算每种营养价值的总和
$sql = "select sum(f.salts * o.food_nums) as salts,
        sum(f.oil * o.food_nums) as oil,
        sum(f.Milk_products * o.food_nums) as Milk_products,
        sum(f.Soybeans_and_nuts * o.food_nums) as Soybeans_and_nuts,
        sum(f.Animal_food * o.food_nums) as Animal_food,
        sum(f.Vegetables * o.food_nums) as Vegetables,
        sum(f.Fruits * o.food_nums) as Fruits,
        sum(f.cereal * o.food_nums) as cereal,
        sum(f.Potato * o.food_nums) as Potato
        from ordered_foods as o left join foods as f on o.food_id = f.food_id";

//执行SQL语句，获取结果集
$rs = mysqli_query($conn,$sql);

//判断结果集是否为空
if($rs){
    //从结果集中获取一条记录
    $row = mysqli_fetch_array($rs);

    //把每种营养价值的总和存入数据数组中，按照给定的格式
    $data[] = ["value" => intval($row["salts"]), "name" => "盐"];
    $data[] = ["value" => intval($row["oil"]), "name" => "油"];
    $data[] = ["value" => intval($row["Milk_products"]), "name" => "奶及奶制品"];
    $data[] = ["value" => intval($row["Soybeans_and_nuts"]), "name" => "大豆及坚果类"];
    $data[] = ["value" => intval($row["Animal_food"]), "name" => "动物性食物"];
    $data[] = ["value" => intval($row["Vegetables"]), "name" => "蔬菜类"];
    $data[] = ["value" => intval($row["Fruits"]), "name" => "水果类"];
    $data[] = ["value" => intval($row["cereal"]), "name" => "谷类"];
    $data[] = ["value" => intval($row["Potato"]), "name" => "薯类"];
    //修改状态码为1，表示获取数据成功
    $code = 1;
    echo getApiResult($code, $data, $msg);
}else{
    echo getApiResult($code, $data, $msg);
}

?>
