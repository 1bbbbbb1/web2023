class Menu {
    /**
     * 路由器的构造器
     * @param {Array} menuData储存菜单信息的数组
     * @param {Array} finishMenuData储存正在点菜的菜单信息
     */
    constructor(menuData) {
        this.menuData = menuData
    }

    // 是否还能取消订单 true表示可以 false表示不可以
    static isCancel = true;
    //订单是否可以点击完成按钮  false表示不可以点击，true表示可以点击
    static isChoosFinish = false;
    //订单是否已经完成  false表示未完成，true表示完成
    static isFinish = false;
    // 计时器 是否已完成
    static timerFinish;
    static router;

    /**
     * 获取DOM元素并绑定事件
     */
    static getDOMEleAddEve() {
        let _this = this
        let orderBtn = $("#orderBtn")
        console.log("isCancel:", this.isCancel);
        //下单或取消订单
        orderBtn.click(function () {
            if ($(this).text() == "下单") {
                let dishesCon = $(".dishesCon")

                //获取页面上的点餐信息
                for (let i = 0; i < menuData.length; i++) {
                    let dishInfo = dishesCon.children().eq(i).children().eq(1)
                    let dishNumEle = dishInfo.next().children().eq(1)
                    let dishNum = parseInt(dishNumEle.text())
                    let dishDescription = dishInfo.parent().children().eq(3)

                    // 获取点餐信息 然后放进对应的数组
                    if (dishNum != 0) {
                        //放进finishData里面
                        let obj = {
                            food_id: dishInfo.parent().attr("data-no"),
                            food_ava: dishInfo.prev().attr("src"),
                            food_name: dishInfo.children().eq(0).text(),
                            type: dishInfo.children().eq(1).children().eq(0).text(),
                            food_coast: dishInfo.children().eq(2).children().eq(0).text(),
                            dishNum: dishNum,
                            food_details: dishDescription.children().eq(0).text(),
                            salts: dishDescription.children().eq(1).text(),
                            oil: dishDescription.children().eq(2).text(),
                            Milk_products: dishDescription.children().eq(3).text(),
                            Soybeans_and_nuts: dishDescription.children().eq(4).text(),
                            Animal_food: dishDescription.children().eq(5).text(),
                            Vegetables: dishDescription.children().eq(6).text(),
                            Fruits: dishDescription.children().eq(7).text(),
                            cereal: dishDescription.children().eq(8).text(),
                            Potato: dishDescription.children().eq(9).text(),
                        }
                        //放在sendOrderData
                        let obj2 = {
                            dishID: dishInfo.parent().attr("data-no"),
                            dishNum: dishNum
                        }
                        finishMenuData.push(obj)
                        sendOrderedData.push(obj2)
                    }
                }
                // finishMenuData.push(totalPrice)
                console.log("finishData:", finishMenuData);
                console.log("sendOrderData:", sendOrderedData);

                //发送请求，传输finishMenuData   
                $.post(URL.sendOrderData, {
                    json: JSON.stringify(sendOrderedData),
                    user_id: userID
                }, (res) => {
                    let data = JSON.parse(res)[0]
                    alert("下单成功")

                    $(this).text("取消订单")
                    isOrder = true;
                    let time = (parseInt(Math.random() * 10) + 1) * 1000
                    console.log("取消订单time:", time);
                    // 开始取消订单计时
                    setTimeout(() => {
                        _this.isCancel = false
                    }, time)
                    // 开始完成订单的计时
                    _this.timerFinish = setTimeout(() => {
                        _this.isChoosFinish = true
                        $("#orderBtn").text("我已经收到餐了")
                    }, time + 4000)

                    //重绘
                    clear()
                    _this.router.appendRouterAndContent()
                    _this.router.getDOMEleAddEve()
                    Menu.getDOMEleAddEve()
                    Dish.getDOMEleAddEve()
                })


            } else if ($(this).text() == "取消订单") {
                //如果可以取消订单
                if (_this.isCancel) {
                    overlayUser.style.display = 'block';
                    popupUser.style.display = 'block';
                } else { //不能取消订单
                    alert("菜已经快要做好，无法取消订单")
                }
            } else {
                if (!_this.isFinish) {
                    //发请求  完成订单
                    $.post(URL.finishOrder, {
                        user_id: userID
                    }, (res) => {
                        _this.isFinish = true
                        res = JSON.parse(res)[0]
                        if (res.code == 1) {
                            alert("祝您用餐愉快")
                        } else {
                            alert(res.msg)
                        }
                    })
                }
            }
        })


        const closeBtnUser = document.getElementById('closePopup-btnUser');
        const comfirmBtnUser = document.getElementById('confirmPopup-btnUser');
        const overlayUser = document.getElementById('overlayUser');
        const popupUser = document.getElementById('popupUser');


        // 点击关闭按钮或遮罩层隐藏弹窗
        closeBtnUser.addEventListener('click', function () {
            overlayUser.style.display = 'none';
            popupUser.style.display = 'none';
        });

        overlayUser.addEventListener('click', function (event) {
            if (event.target === overlayUser) {
                overlayUser.style.display = 'none';
                popupUser.style.display = 'none';
            }
        });

        //弹窗中点击确认取消
        comfirmBtnUser.addEventListener('click', () => {
            // 取消是否已完成的计时器
            clearTimeout(_this.timerFinish)
            finishMenuData = []
            Menu.isFinish = false
            Menu.isChoosFinish = false
            isOrder = false
            totalPrice = 0
            overlayUser.style.display = 'none';
            popupUser.style.display = 'none';
            //发送请求  取消订单
            $.post(URL.cancelOrder, {
                user_id: userID
            }, (res) => {
                res = JSON.parse(res)[0]
                alert(res.msg)
            })
            //
            $("#orderBtn").text("下单")
            // $("#totalPrice").text(totalPrice)
            //重绘
            clear()
            _this.router.appendRouterAndContent()
            _this.router.getDOMEleAddEve()
            Menu.getDOMEleAddEve()
            Dish.getDOMEleAddEve()
        })
    }
    /**
     * 生成路由导航的html字符串
     * @returns 路由导航栏的字符串
     */
    appendMenu() {
        let str = ""
        str += "<div class=\"orderCon\">" //<!-- 点单的大容器 -->
        str += "<div id=\"overlayUser\">" //<!-- 弹窗的容器 -->
        str += "<div id=\"popupUser\">"
        str += "<h2>是否取消当前订单?</h2>"
        str += "<button id=\"closePopup-btnUser\">否</button>"
        str += "<button id=\"confirmPopup-btnUser\">是</button>"
        str += "</div>"
        str += "</div>" //<!--  弹窗的容器 end -->  
        str += "<div class=\"dishesCon\">" //<!-- 菜单的大容器 -->
        // 如果已经点餐，则显示点了菜的信息
        if (isOrder) {
            for (let i = 0; i < finishMenuData.length; i++) {
                let dish = new Dish(finishMenuData[i], false)
                str += dish.appendDish()
            }
        } else { //如果没有点餐，则显示菜单信息
            for (let i = 0; i < menuData.length; i++) {
                let dish = new Dish(menuData[i], true)
                str += dish.appendDish()
            }
        }
        str += "</div>" //<!-- 菜单的大容器 end -->
        str += "<div class = \"bottomCon\">" //<!-- 页面尾部的大容器 -->
        str += "<p>今日推荐菜品</p>"
        str += "<div class = \"recommendCon\">" //<!-- 推荐菜品的容器 -->
        for (let i = 0; i < commendMenuData.length; i++) {
            let dish = new Dish(commendMenuData[i], false)
            str += dish.appendDish()
        }
        str += "</div>" //<!-- 推荐菜品的容器 end -->
        str += "<div class=\"buyCon\">" //<!-- 下单容器 -->
        str += "<img src=./static/images/buy.svg> <span id=\"totalPrice\">花费:" + totalPrice + "</span>"
        if (isOrder) {
            if (Menu.isChoosFinish)
                str += "<button id=\"orderBtn\">我已经收到餐了</button>"
            else
                str += "<button id=\"orderBtn\">取消订单</button>"
        } else {
            str += "<button id=\"orderBtn\">下单</button>"
        }
        str += "</div>" //<!-- 下单的容器 end -->
        str += "</div>" //<!-- 页面尾部的大容器 end -->
        str += "</div>" //<!-- 点单的大容器 end -->
        return str

    }
}