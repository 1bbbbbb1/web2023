class Comment {
    /**
     * 路由器的构造器
     * @param 
     */
    constructor(finishMenuData) {
        this.finishMenuData = finishMenuData
    }

    /**
     * 获取DOM元素并绑定事件
     */
    static getDOMEleAddEve() {
        let commentsRadios = document.getElementsByClassName("commentsRadios")
        for (let i = 0; i < commentsRadios.length; i++) {
            commentsRadios[i].addEventListener("click", function () {
                feedBackData[0].bestLike = $(this).val()
                console.log("radio",$(this));
            })
        }

        let comment = $(".comment textarea")
        comment.blur(function () {
            feedBackData[0].comments = comment.val()
            console.log(feedBackData);
        })

        $(".feedBackBtn").click(function () {
            if (feedBackData[0].comments == "") {
                alert("评论不能为空")
            } else {
                //发送请求  feedBackData
                $.post(URL.addComment, {
                    user_id: userID,
                    comment: feedBackData[0].comments,
                    food_id: feedBackData[0].bestLike
                }, (res) => {
                    let data = JSON.parse(res)[0]
                    console.log(data);
                })
                alert("提交成功")
            }
        })
    }


    /**
     * 生成路由导航的html字符串
     * @returns 路由导航栏的字符串
     */
    appendComment() {
        let str = ""
        str += "<div class=\"feedBackCon\">" //<!-- 反馈的大容器 -->
        if (this.finishMenuData.length == 0) {
            str += "<div class=\"nowDishes\" style=\"display:none\">" //<!-- 已经点过的菜的容器 -->
        } else {
            str += "<div class=\"nowDishes\">" //<!-- 已经点过的菜的容器 -->
        }
        for (let i = 0; i < finishMenuData.length; i++) {
            let dish = new Dish(finishMenuData[i], false)
            str += dish.appendDish()
        }
        str += "</div>" //<!-- 已经点过的菜的容器 end -->
        str += "<div class=\"commentsCon\">" //<!-- 反馈表单的容器 -->
        str += "<h2>请填写一份小问卷</h2>"
        str += "<div class=\"bestLike\">" //<!-- 最喜欢的菜容器 -->
        str += "<h3>请选择您最喜欢的一道菜</h3>"
        for (let i = 0; i < finishMenuData.length; i++) {
            str += " <input type=\"radio\" name=\"bestLike\" value=" + finishMenuData[i].food_id + " class=\"commentsRadios\">"
            str += "<label>" + finishMenuData[i].food_name + "</label>"
        }
        str += "</div>" //<!-- 最喜欢的菜容器 end -->
        str += "<div class=\"comment\">" //<!-- 评论的容器 -->
        str += "<h3>请给出您的评价</h3>"
        str += "<textarea name=\"\" id=\"\" cols=\"100\" rows=\"7\"></textarea>"
        str += "</div>" //<!-- 评论的容器 end -->
        str += "<button class=\"feedBackBtn\">提交</button>"
        str += "</div>" //<!-- 反馈表单的容器 end -->
        str += "</div>" //<!-- 反馈的大容器 end -->
        return str
    }
}