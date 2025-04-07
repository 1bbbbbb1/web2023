let userID = null

//存储所有菜单信息
let menuData = [
    // {
//     dishID: 1,
//     dishImg: "./static/images/1.jpg",
//     dishName: "腊肉",
//     dishPrice: "30",
//     dishCategory: "肉类食品",
//     dishNum: 0,
//     description: "我是美味的腊肉",
//     salt:0,
//     oil:0,
//     milk:0,
//     nut:0,
//     animal:0,
//     vege:0,
//     fruit:0,
//     cereal:0,
//     potato:0
// },
// {
//     dishID: 2,
//     dishImg: "./static/images/2.jpg",
//     dishName: "水煮肉片",
//     dishPrice: "45",
//     dishCategory: "肉类食品",
//     dishNum: 0,
//     description: "我是美味的水煮肉片",
//     salt:0,
//     oil:10,
//     milk:20,
//     nut:30,
//     animal:0,
//     vege:0,
//     fruit:0,
//     cereal:0,
//     potato:0
// },
// {
//     dishID: 3,
//     dishImg: "./static/images/3.jpg",
//     dishName: "烧鸡爪",
//     dishPrice: "35",
//     dishCategory: "肉类食品",
//     dishNum: 0,
//     description: "我是美味的烧鸡爪hahahahahhahahah",
//     salt:10,
//     oil:10,
//     milk:10,
//     nut:10,
//     animal:20,
//     vege:0,
//     fruit:40,
//     cereal:50,
//     potato:0
// },
// {
//     dishID: 4,
//     dishImg: "./static/images/4.jpg",
//     dishName: "麻辣兔丁",
//     dishPrice: "50",
//     dishCategory: "肉类食品",
//     dishNum: 0,
//     description: "我是美味的麻辣兔丁",
//     salt:0,
//     oil:0,
//     milk:0,
//     nut:0,
//     animal:0,
//     vege:0,
//     fruit:0,
//     cereal:0,
//     potato:0
// },
// {
//     dishID: 5,
//     dishImg: "./static/images/5.jpg",
//     dishName: "泡菜",
//     dishPrice: "20",
//     dishCategory: "蔬菜类食品",
//     dishNum: 0,
//     description: "我是美味的泡菜",
//     salt:0,
//     oil:0,
//     milk:0,
//     nut:0,
//     animal:0,
//     vege:0,
//     fruit:0,
//     cereal:0,
//     potato:0
// }
]

//推荐菜单
let commendMenuData = [
    // {
//     dishID: 1,
//     dishImg: "./static/images/1.jpg",
//     dishName: "腊肉",
//     dishPrice: "30",
//     dishCategory: "肉类食品",
//     dishNum: 0,
//     description: "我是美味的腊肉",
//     salt:0,
//     oil:0,
//     milk:0,
//     nut:0,
//     animal:0,
//     vege:0,
//     fruit:0,
//     cereal:0,
//     potato:0
// },
// {
//     dishID: 2,
//     dishImg: "./static/images/2.jpg",
//     dishName: "水煮肉片",
//     dishPrice: "45",
//     dishCategory: "肉类食品",
//     dishNum: 0,
//     description: "我是美味的水煮肉片",
//     salt:0,
//     oil:10,
//     milk:20,
//     nut:30,
//     animal:0,
//     vege:0,
//     fruit:0,
//     cereal:0,
//     potato:0
// },
// {
//     dishID: 3,
//     dishImg: "./static/images/3.jpg",
//     dishName: "烧鸡爪",
//     dishPrice: "35",
//     dishCategory: "肉类食品",
//     dishNum: 0,
//     description: "我是美味的烧鸡爪",
//     salt:0,
//     oil:0,
//     milk:0,
//     nut:0,
//     animal:0,
//     vege:0,
//     fruit:0,
//     cereal:0,
//     potato:0
// },
]

//存储用户点餐的菜单
let finishMenuData = [

]
//发送给后端的点菜数组
//对象数组
/*
{
    dishID:
    dishNum:
}
*/
let sendOrderedData = [

]
let feedBackData = [{
    bestLike: 0,
    comments: ""
}]

//用户是否完成点单 false表示没有，true表示有
let isOrder = false;

//用户总共花费
let totalPrice = 0;

//表示到底是哪一端登录，0表示用户端，1表示管理端
let pattern =1

//管理端订单数据
let orderData = [
// {
//     orderID: 1,
//     userName: "111",
//     dishes: "红烧肉 泡菜",
//     price: "190",
//     state: "正在制作"
// },
]
