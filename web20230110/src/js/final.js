let objContainer = document.getElementsByClassName('container')[0]; //获取container容器

function init() {
    getMenuData()
    getRecommendData()
    //表示第几个功能
    let funIndex = 1
    let dishMan = new dishManage()
    let commentMan = new commentManage()
    let orderMan = new orderManage()
    let menu = new Menu(menuData)
    let comment = new Comment(finishMenuData)
    let dataVis = new DataVisible()
    let router = new Router(menu, comment, dataVis, dishMan, commentMan, orderMan, funIndex)
    Menu.router = router
    commentManage.router = router
    dishManage.router = router
    let login = new Login(router)
    login.appendLogin()
    login.getDOMEleAddEve()
}

//获取菜单
function getMenuData() {
    $.ajax({
        url: URL.getMenuData,
        async: false,
        success: (res) => {
            console.log("getMenudata");
            let data = JSON.parse(res)[0].data
            menuData = data
        }

    })
}

//获取推荐菜单
function getRecommendData() {
    $.get(URL.getRecommend, {}, (res) => {
        let data = JSON.parse(res)[0].data
        commendMenuData = data
    })
}


init()