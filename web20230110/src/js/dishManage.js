class dishManage {
    /**
     * 路由器的构造器
     * @param 
     */
    constructor() {

    }

    //一次只会有一个修改菜单，因此可以使用静态变量
    static updateDishInfo = {
        updateDishName: "",
        updateDishPrice: 0,
        // 盐
        updateSalt: 0,
        // 油
        updateOil: 0,
        // 奶制品
        updateMilk: 0,
        // 坚果类
        updateNuts: 0,
        // 动物性食品
        updateAnimal: 0,
        // 蔬菜
        updateVege: 0,
        // 水果
        updateFrutis: 0,
        // 谷类
        updateCereals: 0,
        // 薯类
        updatePotatoes: 0,
        updateDes: ""
    }

    static router = null
    //储存添加菜品的信息
    // static addDishInfo = {
    //     addDishName: "",
    //     addDishPrice: null,
    //     addDishDes: "",
    //     // 盐
    //     addSalt: null,
    //     // 油
    //     addOil: null,
    //     // 奶制品
    //     addMilk: null,
    //     // 坚果类
    //     addNuts: null,
    //     // 动物性食品
    //     addAnimal: null,
    //     // 蔬菜
    //     addVege: null,
    //     // 水果
    //     addFrutis: null,
    //     // 谷类
    //     addCereals: null,
    //     // 薯类
    //     addPotatoes: null,
    // }

    //刷新表格数据
    static refreshPage() {
        getMenuData()
        clear()
        dishManage.router.appendRouterAndContent()
        dishManage.router.getDOMEleAddEve()
        dishManage.getDOMEleAddEve()
    }

    static getDOMEleAddEve() {
        let upDishBtns = $(".upDishBtnMan")
        let deleteDishBtns = document.getElementsByClassName("deleteDishBtnMan")
        // 获取关闭按钮、遮罩层和弹窗元素
        const closeBtn = document.getElementById('closePopup-btn');
        const comfirmBtn = document.getElementById('confirmPopup-btn');
        const overlay = document.getElementById('overlay');
        const popup = document.getElementById('popup');
        const updateDishForm = $("#updateDishForm")
        let foodID = null

        //为delete按钮绑定事件
        for (let i = 0; i < menuData.length; i++) {
            deleteDishBtns[i].addEventListener("click", function () {
                //获取这一行的元素
                let dishInfotr = $(this).parent().parent()
                let deleteID = dishInfotr.attr("data-no")
                console.log("删除的菜单ID", deleteID);
                $.post(URL.delFood, {
                    food_id: deleteID
                }, (res) => {
                    res = JSON.parse(res)[0]
                    if (res.code == 1) {
                        dishManage.refreshPage()
                    }
                    alert(res.msg)

                })
            })

        }

        //为update按钮绑定事件
        for (let i = 0; i < menuData.length; i++) {
            // 点击打开按钮显示遮罩层和弹窗
            upDishBtns[i].addEventListener("click", function () {
                //获取这一行的元素
                let dishInfotr = $(this).parent().parent()
                //给静态变量赋值
                dishManage.updateDishInfo.updateDishName = dishInfotr.children().eq(0).text()
                dishManage.updateDishInfo.updateSalt = dishInfotr.children().eq(1).text()
                dishManage.updateDishInfo.updateOil = dishInfotr.children().eq(2).text()
                dishManage.updateDishInfo.updateMilk = dishInfotr.children().eq(3).text()
                dishManage.updateDishInfo.updateNuts = dishInfotr.children().eq(4).text()
                dishManage.updateDishInfo.updateAnimal = dishInfotr.children().eq(5).text()
                dishManage.updateDishInfo.updateVege = dishInfotr.children().eq(6).text()
                dishManage.updateDishInfo.updateFrutis = dishInfotr.children().eq(7).text()
                dishManage.updateDishInfo.updateCereals = dishInfotr.children().eq(8).text()
                dishManage.updateDishInfo.updatePotatoes = dishInfotr.children().eq(9).text()
                dishManage.updateDishInfo.updateDes = dishInfotr.children().eq(10).text()
                dishManage.updateDishInfo.updateDishPrice = dishInfotr.children().eq(11).text()
                foodID = dishInfotr.attr("data-no")
                console.log(dishManage.updateDishInfo);
                overlay.style.display = 'block';
                popup.style.display = 'block';
                //给弹窗里的输入框赋初值(默认值)
                updateDishForm.children().eq(0).val(dishManage.updateDishInfo.updateDishName)
                updateDishForm.children().eq(1).val(dishManage.updateDishInfo.updateSalt)
                updateDishForm.children().eq(2).val(dishManage.updateDishInfo.updateOil)
                updateDishForm.children().eq(3).val(dishManage.updateDishInfo.updateMilk)
                updateDishForm.children().eq(4).val(dishManage.updateDishInfo.updateNuts)
                updateDishForm.children().eq(5).val(dishManage.updateDishInfo.updateAnimal)
                updateDishForm.children().eq(6).val(dishManage.updateDishInfo.updateVege)
                updateDishForm.children().eq(7).val(dishManage.updateDishInfo.updateFrutis)
                updateDishForm.children().eq(8).val(dishManage.updateDishInfo.updateCereals)
                updateDishForm.children().eq(9).val(dishManage.updateDishInfo.updatePotatoes)
                updateDishForm.children().eq(10).val(dishManage.updateDishInfo.updateDishPrice)
                updateDishForm.children().eq(11).val(dishManage.updateDishInfo.updateDes)

            })
        }

        // 点击关闭按钮或遮罩层隐藏弹窗
        closeBtn.addEventListener('click', function () {
            overlay.style.display = 'none';
            popup.style.display = 'none';
        });

        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                overlay.style.display = 'none';
                popup.style.display = 'none';
            }
        });

        //弹窗中点击确认修改
        comfirmBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
            popup.style.display = 'none';
            //this指向类而不是实例
            this.updateDishInfo.updateDishName = updateDishForm.children().eq(0).val()
            this.updateDishInfo.updateSalt = updateDishForm.children().eq(1).val()
            this.updateDishInfo.updateOil = updateDishForm.children().eq(2).val()
            this.updateDishInfo.updateMilk = updateDishForm.children().eq(3).val()
            this.updateDishInfo.updateNuts = updateDishForm.children().eq(4).val()
            this.updateDishInfo.updateAnimal = updateDishForm.children().eq(5).val()
            this.updateDishInfo.updateVege = updateDishForm.children().eq(6).val()
            this.updateDishInfo.updateFrutis = updateDishForm.children().eq(7).val()
            this.updateDishInfo.updateCereals = updateDishForm.children().eq(8).val()
            this.updateDishInfo.updatePotatoes = updateDishForm.children().eq(9).val()
            this.updateDishInfo.updateDishPrice = updateDishForm.children().eq(10).val()
            this.updateDishInfo.updateDes = updateDishForm.children().eq(11).val()

            //发起修改菜单的请求
            $.post(URL.updateFood, {
                food_id: foodID,
                array: JSON.stringify(this.updateDishInfo)
            }, (res) => {
                res = JSON.parse(res)[0]
                if (res.code == 1) {
                    console.log("修改后的菜单信息", this.updateDishInfo);
                    alert(res.msg)
                    dishManage.refreshPage()
                } else {
                    alert(res.msg)
                }
            })
        })

        //添加菜 已废弃
        // const closeBtnAdd = document.getElementById('closePopup-btnAdd');
        // const comfirmBtnAdd = document.getElementById('confirmPopup-btnAdd');
        // const overlayAdd = document.getElementById('overlayAdd');
        // const popupAdd = document.getElementById('popupAdd');
        // let addDishManage = $("#addDishManage")
        // addDishManage.on("click", () => {
        //     overlayAdd.style.display = 'block';
        //     popupAdd.style.display = 'block';
        // })

        // // 点击关闭按钮隐藏弹窗
        // closeBtnAdd.addEventListener('click', function () {
        //     overlayAdd.style.display = 'none';
        //     popupAdd.style.display = 'none';
        // });

        //添加菜单按钮 已废弃
        // comfirmBtnAdd.addEventListener('click', () => {
        //     overlayAdd.style.display = 'none';
        //     popupAdd.style.display = 'none';
        //     let addDishForm = $("#addDishForm")
        //     this.addDishInfo.addDishName = addDishForm.children().eq(0).val()
        //     this.addDishInfo.addSalt = addDishForm.children().eq(1).val()
        //     this.addDishInfo.addOil = addDishForm.children().eq(2).val()
        //     this.addDishInfo.addMilk = addDishForm.children().eq(3).val()
        //     this.addDishInfo.addNuts = addDishForm.children().eq(4).val()
        //     this.addDishInfo.addAnimal = addDishForm.children().eq(5).val()
        //     this.addDishInfo.addVege = addDishForm.children().eq(6).val()
        //     this.addDishInfo.addFrutis = addDishForm.children().eq(7).val()
        //     this.addDishInfo.addCereals = addDishForm.children().eq(8).val()
        //     this.addDishInfo.addPotatoes = addDishForm.children().eq(9).val()
        //     this.addDishInfo.addDishPrice = addDishForm.children().eq(10).val()
        //     this.addDishInfo.addDishDes = addDishForm.children().eq(11).val()
        //     //发起添加菜品的请求




        //     //
        //     console.log("添加菜品的信息", this.addDishInfo);
        //     alert("添加成功")


        // })

        //点击遮罩层隐藏弹窗 添加菜 已废弃
        // overlayAdd.addEventListener('click', function (event) {
        //     if (event.target === overlayAdd) {
        //         overlayAdd.style.display = 'none';
        //         popupAdd.style.display = 'none';
        //     }
        // });
    }

    appendDishManage() {
        let str = ""
        str += "<div class=\"dishesManCon\">" //<!-- 菜单管理的大容器 -->  
        str += "<h2>这是当前的菜单</h2>"

        //添加菜品， 已废弃
        // str += "<div id=\"overlayAdd\">" //<!-- 弹窗的容器 -->
        // str += "<div id=\"popupAdd\">"
        // str += "<h2>添加菜品</h2>"
        // str += "<form id=\"addDishForm\">"
        // str += "<input type=\"text\" placeholder=\"请输入新的菜品名\" value=" + dishManage.addDishInfo.addDishName + ">"
        // str += "<input type=\"number\" placeholder=\"菜品盐含量\"  min=\"0\" value=" + dishManage.addDishInfo.addSalt + ">"
        // str += "<input type=\"number\" placeholder=\"菜品油含量\" min=\"0\" value=" + dishManage.addDishInfo.addOil + ">"
        // str += "<input type=\"number\" placeholder=\"菜品奶制品含量\" min=\"0\" value=" + dishManage.addDishInfo.addMilk + ">"
        // str += "<input type=\"number\" placeholder=\"菜品坚果类含量\" min=\"0\" value=" + dishManage.addDishInfo.addNuts + ">"
        // str += "<input type=\"number\" placeholder=\"菜品动物性食物含量\" value=" + dishManage.addDishInfo.addAnimal + ">"
        // str += "<input type=\"number\" placeholder=\"菜品蔬菜含量\" min=\"0\" value=" + dishManage.addDishInfo.addVege + ">"
        // str += "<input type=\"number\" placeholder=\"菜品水果含量\" min=\"0\" value=" + dishManage.addDishInfo.addFrutis + ">"
        // str += "<input type=\"number\" placeholder=\"菜品谷类含量\" min=\"0\" value=" + dishManage.addDishInfo.addCereals + ">"
        // str += "<input type=\"number\" placeholder=\"菜品薯类含量\" min=\"0\" value=" + dishManage.addDishInfo.addPotatoes + ">"
        // str += "<input type=\"number\" placeholder=\"请输入新的菜品价格\" min=\"0\" value=" + dishManage.addDishInfo.addDishPrice + ">"
        // str += "<textarea placeholder=\"请输入菜品描述\">" + dishManage.addDishInfo.addDishDes + "</textarea>"
        // str += "</form>"
        // str += "<button id=\"closePopup-btnAdd\">关闭</button>"
        // str += "<button id=\"confirmPopup-btnAdd\">确认</button>"
        // str += "</div>"
        // str += "</div>" //<!--  弹窗的容器 end -->  


        str += "<div id=\"overlay\">" //<!-- 弹窗的容器 -->
        str += "<div id=\"popup\">"
        str += "<h2>修改菜品信息</h2>"
        str += "<form id=\"updateDishForm\">"

        str += "<input type=\"text\" placeholder=\"请输入新的菜品名\" value=" + dishManage.updateDishInfo.updateDishName + ">"
        str += "<input type=\"number\" placeholder=\"菜品盐含量\"  min=\"0\" value=" + dishManage.updateDishInfo.updateSalt + ">"
        str += "<input type=\"number\" placeholder=\"菜品油含量\" min=\"0\" value=" + dishManage.updateDishInfo.updateOil + ">"
        str += "<input type=\"number\" placeholder=\"菜品奶制品含量\" min=\"0\" value=" + dishManage.updateDishInfo.updateMilk + ">"
        str += "<input type=\"number\" placeholder=\"菜品坚果类含量\" min=\"0\" value=" + dishManage.updateDishInfo.updateNuts + ">"
        str += "<input type=\"number\" placeholder=\"菜品动物性食物含量\" value=" + dishManage.updateDishInfo.updateAnimal + ">"
        str += "<input type=\"number\" placeholder=\"菜品蔬菜含量\" min=\"0\" value=" + dishManage.updateDishInfo.updateVege + ">"
        str += "<input type=\"number\" placeholder=\"菜品水果含量\" min=\"0\" value=" + dishManage.updateDishInfo.updateFrutis + ">"
        str += "<input type=\"number\" placeholder=\"菜品谷类含量\" min=\"0\" value=" + dishManage.updateDishInfo.updateCereals + ">"
        str += "<input type=\"number\" placeholder=\"菜品薯类含量\" min=\"0\" value=" + dishManage.updateDishInfo.updatePotatoes + ">"
        str += "<input type=\"number\" placeholder=\"请输入新的菜品价格\" min=\"0\" value=" + dishManage.updateDishInfo.updateDishPrice + ">"
        str += "<textarea placeholder=\"请输入菜品描述\">" + dishManage.updateDishInfo.updateDes + "</textarea>"
        str += "</form>"
        str += "<button id=\"closePopup-btn\">关闭</button>"
        str += "<button id=\"confirmPopup-btn\">确认</button>"
        str += "</div>"
        str += "</div>" //<!--  弹窗的容器 end -->  
        str += "<table class=\"table\">" //<!-- table -->
        str += "<colgroup>"
        str += "<col style=\"width:10%;\">"
        str += "<col style=\"width:5%;\">"
        str += "<col style=\"width:5%;\">"
        str += "<col style=\"width:5%;\">"
        str += "<col style=\"width:5%;\">"
        str += "<col style=\"width:5%;\">"
        str += "<col style=\"width:5%;\">"
        str += "<col style=\"width:5%;\">"
        str += "<col style=\"width:5%;\">"
        str += "<col style=\"width:5%;\">"
        str += "<col style=\"width:20%;\">"
        str += "<col style=\"width:10%;\">"
        str += "<col style=\"width:10%;\">"
        str += "</colgroup>"
        str += "<th>菜名</th>"
        str += "<th>盐</th>"
        str += "<th>油</th>"
        str += "<th>奶制品</th>"
        str += "<th>坚果</th>"
        str += "<th>动物性食物</th>"
        str += "<th>蔬菜</th>"
        str += "<th>水果</th>"
        str += "<th>谷类</th>"
        str += "<th>薯类</th>"
        str += "<th>描述</th>"
        str += "<th>价格</th>"
        str += "<th>operations</th>"
        for (let i = 0; i < menuData.length; i++) {
            str += "<tr data-no=" + menuData[i].food_id + ">"
            str += "<td>" + menuData[i].food_name + "</td>"
            // if (menuData[i].salt != 0)
            str += "<td>" + menuData[i].salts + "</td>"
            // if (menuData[i].oil != 0)
            str += "<td>" + menuData[i].oil + "</td>"
            // if (menuData[i].milk != 0)
            str += "<td>" + menuData[i].Milk_products + "</td>"
            // if (menuData[i].nut != 0)
            str += "<td>" + menuData[i].Soybeans_and_nuts + "</td>"
            // if (menuData[i].animal != 0)
            str += "<td>" + menuData[i].Animal_food + "</td>"
            // if (menuData[i].vege != 0)
            str += "<td>" + menuData[i].Vegetables + "</td>"
            // if (menuData[i].fruit != 0)
            str += "<td>" + menuData[i].Fruits + "</td>"
            // if (menuData[i].cereal != 0)
            str += "<td>" + menuData[i].cereal + "</td>"
            // if (menuData[i].potato != 0)
            str += "<td>" + menuData[i].Potato + "</td>"
            str += "<td>" + menuData[i].food_details + "</td>"
            str += "<td>" + menuData[i].food_coast + "</td>"
            str += "<td><div class=\"deleteDishBtnMan\">delete</div><div class=\"upDishBtnMan\">update</div></td>"
            str += "</tr>"
        }
        str += "</table>" //<!-- table end -->
        // str += "<button id=\"addDishManage\">添加菜品</button>"
        str += "</div>" //<!-- 菜单管理的大容器 end -->

        return str
    }
}