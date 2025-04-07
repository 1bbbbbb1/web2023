class Router {
    /**
     * 路由器的构造器
     * @param {Menu} Menu类的一个实例
     * @param {Comment} Comment类的一个实例
     * @param {int} funIndex表示点击了路由的第几个功能(默认为1，也就是点餐功能)
     */
    constructor(menu, comment, dataVis, dishMan, commentMan, orderMan, funIndex) {
        this.menu = menu
        this.comment = comment
        this.dataVis = dataVis
        this.funIndex = funIndex;
        this.dishMan = dishMan
        this.commentMan = commentMan
        this.orderMan = orderMan
    }

    /**
     * 获取DOM元素绑定事件
     */
    getDOMEleAddEve() {
        const choice1 = document.querySelector(".leftBar ul li:nth-child(2)")
        const choice2 = document.querySelector(".leftBar ul li:nth-child(3)")
        const choice3 = document.querySelector(".leftBar ul li:nth-child(4)")
        choice1.addEventListener('click', () => {
            console.log("第一个");
            this.funIndex = 1
            clear()
            this.appendRouterAndContent()
            if (pattern == 0) { //用户端
                Menu.getDOMEleAddEve()
                Dish.getDOMEleAddEve()
            } else { //管理端
                dishManage.getDOMEleAddEve()
            }
            this.getDOMEleAddEve()
        });
        choice2.addEventListener('click', () => {
            console.log("第二个");
            this.funIndex = 2
            clear()
            this.appendRouterAndContent()
            if (pattern == 0) {
                Comment.getDOMEleAddEve()
            } else {
                commentManage.getDOMEleAddEve()
            }
            this.getDOMEleAddEve()
        });
        choice3.addEventListener('click', () => {
            console.log("第三个");
            this.funIndex = 3
            clear()
            if (pattern == 0) {
                // 因为要先获取到judge内容，因此appendRouterAndContent放在后面
                this.dataVis.getJudge()
                this.appendRouterAndContent()
                this.dataVis.getGrf1()
                this.dataVis.getGrf2()
            } else {
                this.appendRouterAndContent()
            }
            this.getDOMEleAddEve()
        });

    }

    /**
     * 生成路由导航的html字符串
     * @returns 路由导航栏的字符串
     */
    appendRouterAndContent() {
        let str = ""
        str += "<div class=\"afterLoginCon\">" //<!-- 登录后的容器 -->
        str += "<div class=\"leftBar\">" //<!-- 左边的导航栏容器 -->
        //如果是用户端
        if (pattern == 0) {
            str += "<div class=\"title\">点餐系统</div>"
            str += "<ul>" //<!-- 列表 -->
            str += "<li class=\"slider\">haha</li>"
            str += "<li><span><img src=\"./static/images/menu.svg\">点单</span></li>"
            str += "<li><span><img src=\"./static/images/comment.svg\">评论</span></li>"
            str += "<li><span><img src=\"./static/images/info.svg\">我的膳食情况</span></li>"
            str += "</ul>" //<!-- 列表 end -->
        } else { //管理端
            str += "<div class=\"title\">管理端</div>"
            str += "<ul>" //<!-- 列表 -->
            str += "<li class=\"slider\">haha</li>"
            str += "<li><span><img src=\"./static/images/menu.svg\">菜单管理</span></li>"
            str += "<li><span><img src=\"./static/images/comment.svg\">评论管理</span></li>"
            str += "<li><span><img src=\"./static/images/order.svg\">订单管理</span></li>"
            str += "</ul>" //<!-- 列表 end -->
        }
        str += "</div>" //<!-- 左边的导航栏容器 end -->
        str += "<div class=\"content\">" //<!-- 右边的内容容器 -->
        if (pattern == 0) { //用户端添加不同页面的html
            if (this.funIndex == 1) {
                str += this.menu.appendMenu()
                console.log("menudata:", menuData);
            } else if (this.funIndex == 2) {
                console.log("finishData:", finishMenuData);
                str += this.comment.appendComment()
            } else {
                str += this.dataVis.appendDataVisible()
            }
        } else { //管理端添加不同页面的html
            if (this.funIndex == 1) {
                str += this.dishMan.appendDishManage()
            } else if (this.funIndex == 2) {
                this.commentMan.getCommentData()
                str += this.commentMan.appendCommentManage()
            } else {
                this.orderMan.getOrderManageData()
                str += this.orderMan.appendOrderManage()
            }
        }
        str += "</div>" //<!-- 右边的内容容器 end -->
        str += "</div>" //<!-- 登录后的容器 end -->
        addHtmlIntoDoc(objContainer, str)

    }
}