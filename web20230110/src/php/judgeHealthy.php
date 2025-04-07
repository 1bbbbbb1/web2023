<?php

//初始化返回值
$code = 0;
$msg = ["饮食不合理，营养不健康不丰富", "饮食合理，营养健康和丰富"];
$data = [];

//从前端获取用户编号
// $user_id = $_POST['user_id'];
$user_id = 1;

//判断用户编号是否为空
if ($user_id == "")
    die("0");

//连接数据库
include("conn.php");
include("functions.php");

//查询用户最近的一单状态是2的订单
$sql = "SELECT order_id FROM orders WHERE user_id = ? AND status = 2 ORDER BY order_id DESC LIMIT 1";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 'i', $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
if (mysqli_num_rows($result) > 0) {
    //如果存在这样的订单，获取订单编号
    $order_id = mysqli_fetch_assoc($result)['order_id'];
    // $order_id  = 1;
    //查询订单中的菜品信息
    $sql = "SELECT f.* 
            FROM ordered_foods AS o 
            JOIN foods AS f 
            ON o.food_id = f.food_id 
            WHERE o.order_id = ?";
    $stmt = mysqli_prepare($conn, $sql);
    // var_dump($stmt);  // bool(false)

    mysqli_stmt_bind_param($stmt, 'i', $order_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    if (mysqli_num_rows($result) > 0) {
        //如果存在菜品信息，统计食物类型和盐油含量，以及蛋白质和维生素
        $food_types = [];
        $salt_sum = 0;
        $oil_sum = 0;
        $protein_sum = 0;
        $vitamin_sum = 0;
        while ($row = mysqli_fetch_assoc($result)) {
            //遍历每个菜品，获取其类型和盐油含量，以及蛋白质和维生素
            $food_type = $row['type'];
            $salt_amount = $row['salts'];
            $oil_amount = $row['oil'];
            //将类型加入到数组中，去重
            if (!in_array($food_type, $food_types)) {
                array_push($food_types, $food_type);
            }
            //累加盐油含量
            $salt_sum += $salt_amount;
            $oil_sum += $oil_amount;
            //根据食物类型，估算其蛋白质和维生素含量
            switch ($food_type) {
                case "Milk_products": //奶及奶制品，每100克含8克蛋白质，0.5毫克维生素B2
                    $protein_sum += 8;
                    $vitamin_sum += 0.5;
                    break;
                case "Soybeans_and_nuts": //大豆及坚果类，每100克含36克蛋白质，1.5毫克维生素E
                    $protein_sum += 36;
                    $vitamin_sum += 1.5;
                    break;
                case "Animal_food": //动物性食物，每100克含20克蛋白质，0.2毫克维生素B12
                    $protein_sum += 20;
                    $vitamin_sum += 0.2;
                    break;
                case "Vegetables": //蔬菜类，每100克含1.5克蛋白质，30毫克维生素C
                    $protein_sum += 1.5;
                    $vitamin_sum += 30;
                    break;
                case "Fruits": //水果类，每100克含0.5克蛋白质，10毫克维生素C
                    $protein_sum += 0.5;
                    $vitamin_sum += 10;
                    break;
                case "cereal": //谷类，每100克含10克蛋白质，0.1毫克维生素B1
                    $protein_sum += 10;
                    $vitamin_sum += 0.1;
                    break;
                case "Potato": //薯类，每100克含2克蛋白质，0.05毫克维生素B6
                    $protein_sum += 2;
                    $vitamin_sum += 0.05;
                    break;
                default: //其他类型，不计算蛋白质和维生素
                    break;
            }
        }
        //判断食物类型是否至少有五种，且盐油含量是否不超过10克，且蛋白质是否不少于50克，且维生素是否不少于100毫克
        if (count($food_types) >= 5 && $salt_sum <= 10 && $oil_sum <= 10 && $protein_sum >= 50 && $vitamin_sum >= 100) {
            //如果满足条件，返回true
            $code = 1;
        } else {
            //如果不满足条件，根据不足或超标的情况，给出建议
            $data['suggestion'] = "";
            if (count($food_types) < 5) {
                //如果食物类型不够多样，建议增加一些其他类型的食物
                $data['suggestion'] .= "你的饮食类型不够多样，建议增加一些。";
            }
            if ($salt_sum > 10) {
                //如果盐含量超标，建议减少盐分摄入
                $data['suggestion'] .= "你的盐分摄入超过了10克，建议减少一些咸味的食物。";
            }
            if ($oil_sum > 10) {
                //如果油含量超标，建议减少油脂摄入
                $data['suggestion'] .= "你的油脂摄入超过了10克，建议减少一些油炸或油煎的食物。";
            }
            if ($protein_sum < 50) {
                //如果蛋白质不足，建议增加蛋白质摄入
                $data['suggestion'] .= "你的蛋白质摄入不足50克，建议增加一些。";
            }
            if ($vitamin_sum < 100) {
                //如果维生素不足，建议增加维生素摄入
                $data['suggestion'] .= "你的维生素摄入不足100毫克，建议增加一些。";
            }
        }
    }
}
echo getApiResult($code, $data, $msg);

//关闭连接
mysqli_close($conn);
?>