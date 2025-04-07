class orderManage {
    /**
     * 路由器的构造器
     * @param 
     */
    constructor() {

    }


    static getDOMEleAddEve() {

    }

    getOrderManageData() {

        $.ajax({
            url: URL.getOrdersMan,
            async: false,
            success: (res) => {
                res = JSON.parse(res)[0]
                orderData = res.data
                console.log("orderData:", orderData);
            }
        })
    }

    appendOrderManage() {
        let str = ""
        str += "<div class=\"ordersManCon\">" //<!-- 订单管理的大容器 -->  
        str += "<h2>这是当前的订单</h2>"
        str += "<table class=\"table\">" //<!-- table -->
        str += "<colgroup>"
        str += "<col style=\"width:30%;\">"
        str += "<col style=\"width:40%;\">"
        str += "<col style=\"width:10%;\">"
        str += "<col style=\"width:20%;\">"
        str += "</colgroup>"
        str += "<th>用户</th>"
        str += "<th>菜品</th>"
        str += "<th>价格</th>"
        str += "<th>订单状态</th>"
        for (let i = 0; i < orderData.length; i++) {
            let foods = orderData[i].foods
            str += "<tr data-no=" + orderData[i].order_id + ">"
            str += "<td>" + orderData[i].user_name + "</td>"
            str += "<td>"
            for (let j = 0; j < foods.length; j++) {
                str += foods[j].food_name + " "
            }
            str += "</td>"
            str += "<td>" + orderData[i].total_price + "</td>"
            if (orderData[i].status == 0)
                str += "<td>正在制作</td>"
            else if (orderData[i].status == 1)
                str += "<td>已取消</td>"
            else
                str += "<td>已完成</td>"
            str += "</tr>"
        }
        str += "</table>" //<!-- table end -->
        str += "</div>" //<!-- 订单管理的大容器 end -->

        return str
    }
}