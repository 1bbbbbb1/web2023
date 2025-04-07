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

//查询orders表中满足条件的记录
$sql = "SELECT order_id FROM orders WHERE user_id = ? AND status = 0 ORDER BY order_id DESC LIMIT 1";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 'i', $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
if (mysqli_num_rows($result) > 0) {
    //如果存在，获取order_id
    $row = mysqli_fetch_assoc($result);
    $order_id = $row['order_id'];
    //修改status为2
    $sql = "UPDATE orders SET status = 2 WHERE order_id = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, 'i', $order_id);
    mysqli_stmt_execute($stmt);
    if (mysqli_stmt_affected_rows($stmt) > 0) {
        //查询ordered_foods表中对应的菜品和数量
        $sql = "SELECT food_id, food_nums FROM ordered_foods WHERE order_id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, 'i', $order_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if (mysqli_num_rows($result) > 0) {
            //初始化营养数值数组
            $nutrition = array("salts" => 0, "oil" => 0, "Milk_products" => 0, "Soybeans_and_nuts" => 0, "Animal_food" => 0, "Vegetables" => 0, "Fruits" => 0, "cereal" => 0, "Potato" => 0);
            //遍历每个菜品和数量
            while ($row = mysqli_fetch_assoc($result)) {
                $food_id = $row['food_id'];
                $food_nums = $row['food_nums'];
                //查询foods表中对应的营养数值
                $sql = "SELECT salts, oil, Milk_products, Soybeans_and_nuts, Animal_food, Vegetables, Fruits, cereal, Potato FROM foods WHERE food_id = ?";
                $stmt = mysqli_prepare($conn, $sql);
                mysqli_stmt_bind_param($stmt, 'i', $food_id);
                mysqli_stmt_execute($stmt);
                $result2 = mysqli_stmt_get_result($stmt);
                if (mysqli_num_rows($result2) > 0) {
                    //获取营养数值并乘以数量，累加到数组中
                    $row2 = mysqli_fetch_assoc($result2);
                    foreach ($nutrition as $key => &$value) {
                        $value += ($row2[$key] * $food_nums);
                    }
                }
            }
            //查询historical_nutrition表中是否存在user_id对应的记录
            $sql = "SELECT * FROM historical_nutrition WHERE user_id= ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, 'i', $user_id);
            mysqli_stmt_execute($stmt);
            $result3 = mysqli_stmt_get_result($stmt);
            // echo "TTTTTT";
            // echo mysqli_num_rows($result3);
            if (mysqli_num_rows($result3) > 0) {
                //如果存在，更新每个营养数值为原来的值加上数组中的值
                foreach ($nutrition as $key => &$value) {
                    $sql = "UPDATE historical_nutrition SET {$key}= {$key}+ ? WHERE user_id= ?";
                    $stmt = mysqli_prepare($conn, $sql);
                    mysqli_stmt_bind_param($stmt, 'ii', $value, $user_id);
                    mysqli_stmt_execute($stmt);
                }
            } else {
                //如果不存在，插入一条新的记录，每个营养数值为数组中的值
                array_unshift($nutrition,$user_id);//将user_id插入到数组开头，方便后续操作

                //构造插入语句和参数值字符串
                $sql_fields="";//字段名字符串
                $sql_values="";//参数值字符串

                foreach ($nutrition as $key => &$value) {
                    if ($sql_fields=="") {//第一个字段名不加逗号
                        $sql_fields.="user_id";
                    } else {
                        $sql_fields.=",{$key}";//其他字段名加逗号
                    }
                    if ($sql_values=="") {//第一个参数值不加逗号
                        $sql_values.=$value;
                    } else {
                        $sql_values.=",".$value;//其他参数值加逗号
                    }
                }
                // //拼接插入语句
                $sql = "INSERT INTO historical_nutrition (".$sql_fields.") VALUES (".$sql_values.")";

                //执行插入语句并返回结果
                if (mysqli_query($conn,$sql)) {
                    //返回成功信息
                    echo getApiResult(1,$data,$msg);
                } else {
                    //返回失败信息
                    echo getApiResult(0,$data,$msg);
                }
            }
            //返回成功信息
            echo getApiResult(1,$data,$msg);
        } else {
            //如果没有对应的菜品和数量，返回失败信息
            echo getApiResult(0,$data,$msg);
        }
    } else {
        //如果修改status失败，返回失败信息
        echo getApiResult(0,$data,$msg);

    }
} else {
    //如果没有满足条件的记录，返回失败信息
    echo getApiResult(0,$data,$msg);

}
//关闭连接
mysqli_close($conn);

?>