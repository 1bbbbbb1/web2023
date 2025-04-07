const URL = {
    loginUrl:"src/php/login.php",
    resUrl:"src/php/register.php",
    getMenuData:"src/php/getmenu.php",
    getRecommend:"src/php/bestdish.php",
    addComment:"src/php/addcomment.php",
    sendOrderData:"src/php/sendOrder.php",
    getGRF1:"src/php/grf1.php",
    getGRF2:"src/php/grf2.php",
    delCommentManage:"src/php/delcomment.php",
    getCommentData:"src/php/getcomment.php",
    cancelOrder:"src/php/cancelOrder.php",
    finishOrder:"src/php/finishOrder.php",
    getOrdersMan:"src/php/getallOrder.php",
    updateFood:"src/php/updateFood.php",
    delFood:"src/php/delFood.php",
    judgeHealth:"src/php/judgeHealthy.php"
}







//管理端评论数据
let commentData = [{
        commentID: 1,
        userName: "小红",
        content: "hahahha",
        besiLike: "红烧肉"
    },
    {
        commentID: 2,
        userName: "小张",
        content: "hahahha",
        besiLike: "红烧肉"
    },
    {
        commentID: 3,
        userName: "小李",
        content: "hahahha",
        besiLike: "红烧肉"
    }
]

// 首先从后端拿到menuData，然后传给menu实例，用menuData来进行渲染
//用户点单后，我们将finishMenuData传给后端,同时同步更新menuData里面的数据
//然后我们对menu实例进行渲染时，采用的仍然是menuData，此时的menuData已经对dishNum进行更改了


// 推荐菜   菜单
//个人中心 满足，推荐
//注册：用户名

//----------------登陆注册模块
// 注册，登录
//  post
//  参数：用户名，密码
//返回参数：true,false  表示登录/注册是否成功

//  -------------点单模块
//  获取菜单信息
//  get
//  不要参数
//返回菜单，格式参考menuData

//  显示推荐菜信息
//  get
//  不要参数
//返回推荐菜的数组(对象数组)
/*
[{
        dishID: 1,
        dishImg: "./static/images/1.jpg",
        dishName: "腊肉",
        dishPrice: "30",
        dishCategory: "肉类食品",
        dishNum: 0,
},
{
        dishID: 1,
        dishImg: "./static/images/1.jpg",
        dishName: "腊肉",
        dishPrice: "30",
        dishCategory: "肉类食品",
        dishNum: 0,
},
{
        dishID: 1,
        dishImg: "./static/images/1.jpg",
        dishName: "腊肉",
        dishPrice: "30",
        dishCategory: "肉类食品",
        dishNum: 0,
}]

*/

//  下单
//  post
//  参数：finishMenuData 用户id
//返回true,false,表示是否下单成功

//----------------评论模块
// 获取用户的点餐信息
// get
// 参数：用户id
// 返回推荐菜的数组(对象数组)

// 提交评论
// post
// 参数：feedBackData
//返回true,false,表示是否评论成功

//----------------膳食情况
// 是否满足标准 推荐菜
// get
// 参数：用户ID
//满足标准：返回true,不需要推荐菜   返回false,需要推荐菜

// 第一个图表数据
// get
// 参数：用户ID
//返回参考图表格式

// 第二个图表数据
// get
// 参数：用户ID
//返回参考图表格式