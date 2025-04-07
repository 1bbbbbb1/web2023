<?php
//初始化返回值
$code = 0;
$msg = ["更新失败", "更新成功"];
$data = [];

//从前端获取对象数组

$food_id = $_POST['food_id'];
$array = $_POST['array'];


// $food_id = 3;
// $array = '{
//     "updateDishName": "haha",
//     "updateDishPrice": 0,
//     "updateSalt": 0,
//     "updateOil": 0,
//     "updateMilk": 0,
//     "updateNuts": 0,
//     "updateAnimal": 0,
//     "updateVege": 0,
//     "updateFrutis": 0,
//     "updateCereals": 0,
//     "updatePotatoes": 0,
//     "updateDes": "666"
// }';

if ($array == "") die("0");
//连接数据库
include("conn.php");
include("functions.php");

//解析对象数组为关联数组
$updateDishInfo = json_decode($array, true);

// echo $updateDishInfo["updateDes"];

//根据菜品id在foods表中查询对应的记录
// $sql = "SELECT food_ava, type FROM foods WHERE food_id = ?";
$sql = "SELECT food_ava, type FROM foods WHERE food_id = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 'i', $food_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) == 1) {

 $row = mysqli_fetch_assoc($result);
 $food_ava = $row['food_ava'];
 $type = $row['type'];
 
 //根据菜品id在foods表中更新对应的记录
  $sql2 = "UPDATE foods SET food_id=?, food_name=?, food_details=?, food_ava=?, food_coast=?, type=?, salts=?, oil=?, Milk_products=?, Soybeans_and_nuts=?, Animal_food=?, Vegetables=?, Fruits=?, cereal=?, Potato=? WHERE food_id=?";
  $stmt2= mysqli_prepare($conn, $sql2);
  
  mysqli_stmt_bind_param($stmt2, 'isssisiiiiiiiiii', 
      $food_id,
      $updateDishInfo["updateDishName"],
      $updateDishInfo["updateDes"],
      $food_ava,
      $updateDishInfo["updateDishPrice"],
      $type,
      $updateDishInfo["updateSalt"],
      $updateDishInfo["updateOil"],
      $updateDishInfo["updateMilk"],                                                                                                                                       
      $updateDishInfo["updateNuts"],
      $updateDishInfo["updateAnimal"],
      $updateDishInfo["updateVege"],
      $updateDishInfo["updateFrutis"],
      $updateDishInfo["updateCereals"],
      $updateDishInfo["updateDes"],
      $food_id);
      mysqli_stmt_execute($stmt2);
  if (mysqli_stmt_affected_rows($stmt2) > 0) {
   //如果更新成功，返回true
   	$code=1; 
   }
}

echo getApiResult($code, $data, $msg);

//关闭连接
mysqli_close($conn);
?>
