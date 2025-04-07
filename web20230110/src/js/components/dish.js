class Dish {
    /**
     * 路由器的构造器
     * @param {Array} dishData menuData数组里的一个对象
     * @param {boolean} isShowOrder是否显示加菜的图标 true表示需要加菜 false不用 
     */
    constructor(dishData, isShowOrder) {
        this.dishData = dishData
        this.isShowOrder = isShowOrder
    }

    /**
     * 获取DOmain元素并绑定事件
     */
    static getDOMEleAddEve() {
        let addDishIcons = document.getElementsByClassName("addDishIcon")
        let deleteDishIcons = document.getElementsByClassName("deleteDishIcon")
        for (let i = 0; i < addDishIcons.length; i++) {
            addDishIcons[i].addEventListener('click', function () {
                //获取显示菜的数目的元素
                let dishNumberEle = $(this).prev()
                let dishNumber = parseInt(dishNumberEle.text())
                //获取显示菜的单价的元素
                let dishPriceEle = $(this).parent().prev().children().eq(2).children().eq(0)
                dishNumberEle.text(dishNumber + 1)
                if (!isOrder) { //如果用户没有点餐，那么就更新总价格和点餐量
                    totalPrice += parseInt(dishPriceEle.text())
                    $(".buyCon span").text(totalPrice)
                    menuData[parseInt($(this).parent().parent().attr("data-no") - 1)].dishNum = dishNumber + 1
                }
            });
        }
        for (let i = 0; i < deleteDishIcons.length; i++) {
            deleteDishIcons[i].addEventListener("click", function () {
                //获取显示菜的数目的元素
                let dishNumberEle = $(this).next()
                let dishNumber = parseInt(dishNumberEle.text())
                //获取显示菜的单价的元素
                let dishPriceEle = $(this).parent().prev().children().eq(2).children().eq(0)
                let deltaNum = 0
                //菜的数量不为负数
                if (dishNumber == 0) {
                    dishNumber = 0
                } else {
                    dishNumber -= 1
                    deltaNum = 1
                }
                dishNumberEle.text(dishNumber)
                if (!isOrder) { //如果用户没有点餐，那么就更新总价格和点餐量
                    totalPrice -= deltaNum * parseInt(dishPriceEle.text())
                    $(".buyCon span").text(totalPrice)
                    menuData[parseInt($(this).parent().parent().attr("data-no") - 1)].dishNum = dishNumber
                }
            })
        }
    }

    /**
     * 生成路由导航的html字符串
     * @returns 路由导航栏的字符串
     */
    appendDish() {
        let str = ""
        str += "<div class=\"dishCon\" data-no = " + this.dishData.food_id + ">" //<!-- 每一个菜单的容器 -->
        str += "<img src=" + this.dishData.food_ava + " alt=\"dish\" width=\"30%\">"
        str += "<div class=\"dishInfo\">" //<!-- 菜单的详细信息 -->
        str += "<p>" + this.dishData.food_name + "</p>"
        str += "<p>食物种类：<span>" + this.dishData.type + "</span></p>"
        str += "<p>售价：<span>" + this.dishData.food_coast + "</span>￥</p>"
        str += "</div>" //<!-- 菜单的详细信息 end -->
        if (this.isShowOrder) {
            str += "<div class=\"orderIcon\">" //<!-- 加菜图标的容器 -->
            str += "<img src=\"./static/images/delete.svg\" alt=\"\" width=\"50px\" class=\"deleteDishIcon\">"
            str += "<span>" + 0 + "</span>"
            str += "<img src=\"./static/images/add.svg\" alt=\"\" width=\"50px\" class=\"addDishIcon\">"
            str += "</div>" //<!-- 加菜图标的容器 end -->
        } else {
            str += "<div class=\"orderIcon\" style=\"visibility:hidden;\">" //<!-- 加菜图标的容器 -->
            str += "<img src=\"./static/images/delete.svg\" alt=\"\" width=\"50px\" class=\"deleteDishIcon\">"
            str += "<span>" + this.dishData.dishNum + "</span>"
            str += "<img src=\"./static/images/add.svg\" alt=\"\" width=\"50px\" class=\"addDishIcon\">"
            str += "</div>" //<!-- 加菜图标的容器 end -->
        }
        str += "<div class=\"descriptionCon\">" //<!-- 描述的容器 -->
        str += "<p>" + this.dishData.food_details + "</p>"
        if (this.dishData.salts != 0)
        str += "盐:<span>" + this.dishData.salts + "</span>"
        if (this.dishData.oil != 0)
        str += "水:<span>" + this.dishData.oil + "</span>"
        if (this.dishData.Milk_products != 0)
        str += "蛋白质:<span>" + this.dishData.Milk_products + "</span>"
        if (this.dishData.Soybeans_and_nuts != 0)
        str += "脂肪:<span>" + this.dishData.Soybeans_and_nuts + "</span>"
        if (this.dishData.Animal_food != 0)
        str += "膳食纤维:<span>" + this.dishData.Animal_food + "</span>"
        if (this.dishData.Vegetables != 0)
        str += "多种维生素:<span>" + this.dishData.Vegetables + "</span>"
        if (this.dishData.Fruits != 0)
        str += "碳水化合物:<span>" + this.dishData.Fruits + "</span>"
        if (this.dishData.cereal != 0)
        str += "矿物质:<span>" + this.dishData.cereal + "</span>"
        if (this.dishData.Potato != 0)
        str += "常量元素:<span>" + this.dishData.Potato + "</span>"
        str += "</div>" //<!-- 描述的容器 end -->
        str += "</div>" //<!-- 每一个菜单的容器 end -->
        return str

    }
}