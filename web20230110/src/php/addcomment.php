<?php
$code=0;
$data=[];
$msg=["存入评论失败","存入评论成功"];

include("conn.php");
include("functions.php");

//获取前端POST的数据
$user_id=$_POST["user_id"];
$comment=$_POST["comment"];
$food_id=$_POST["food_id"];

// $user_id=1;
// $comment="真难吃";
// $food_id=1;

//插入数据表
$sql = "insert into comment (user_id,comment) values ($user_id,'$comment')";
$rs = mysqli_query($conn,$sql);


//判断是否成功
if($rs){
    $code=1;
    // $data["comment_id"]=mysqli_insert_id($conn); //返回插入的id
    //处理total_referrals表
    $sql="select * from total_referrals where food_id=$food_id";
    $rs=mysqli_query($conn,$sql);
    if(mysqli_num_rows($rs)>0){ //如果存在，就更新sum字段
        $sql="update total_referrals set sum=sum+1 where food_id=$food_id";
        mysqli_query($conn,$sql);
    }else{ //如果不存在，就插入一条新记录
        $sql="insert into total_referrals (food_id,sum) values ($food_id,1)";
        mysqli_query($conn,$sql);
    }
    echo getApiResult($code, $data, $msg);
}else{
    echo getApiResult($code, $data, $msg);
}

?>
