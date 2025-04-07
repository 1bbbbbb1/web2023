class commentManage {
    /**
     * 路由器的构造器
     * @param 
     */
    constructor() {}

    static commentData = []
    static router;

    getCommentData() {
        $.ajax({
            url: URL.getCommentData,
            async: false,
            success: (res) => {
                res = JSON.parse(res)[0]
                commentManage.commentData = res.data
            }

        })
    }

    //刷新表格数据
    static refreshPage() {
        clear()
        commentManage.router.appendRouterAndContent()
        commentManage.router.getDOMEleAddEve()
        commentManage.getDOMEleAddEve()
    }

    static getDOMEleAddEve() {
        let deleteCommentBtns = document.getElementsByClassName("deleteCommentBtnMan")
        //为delete按钮绑定事件
        for (let i = 0; i < commentManage.commentData.length; i++) {
            deleteCommentBtns[i].addEventListener("click", function () {
                //获取这一行的元素
                let commentInfor = $(this).parent().parent()
                let deleteID = commentInfor.attr("data-no")
                console.log("删除的ID", deleteID);
                $.ajax({
                    url: URL.delCommentManage,
                    type: 'get',
                    data: {
                        comment_id: deleteID
                    },
                    success: function (res) {
                        res = JSON.parse(res)[0]
                        if (res.code == 1) {
                            commentManage.refreshPage()
                        }
                        alert(res.msg)
                    }
                });
            })

        }
    }

    appendCommentManage() {
        let str = ""
        str += "<div class=\"commentsManCon\">" //<!-- 评论管理的大容器 -->  
        str += "<h2>当前评价</h2>"
        str += "<table class=\"table\">" //<!-- table -->
        str += "<colgroup>"
        str += "<col style=\"width:30%;\">"
        str += "<col style=\"width:40%;\">"
        str += "<col style=\"width:30%;\">"
        str += "</colgroup>"
        str += "<th>用户</th>"
        str += "<th>内容</th>"
        str += "<th>operations</th>"
        for (let i = 0; i < commentManage.commentData.length; i++) {
            str += "<tr data-no=" + commentManage.commentData[i].comment_id + ">"
            str += "<td>" + commentManage.commentData[i].user_name + "</td>"
            str += "<td>" + commentManage.commentData[i].comment + "</td>"
            // str += "<td>" + commentManage.commentData[i].besiLike + "</td>"
            str += "<td><div class=\"deleteCommentBtnMan\">delete</div></td>"
            str += "</tr>"
        }
        str += "</table>" //<!-- table end -->
        str += "</div>" //<!-- 评论管理的大容器 end -->

        return str
    }
}