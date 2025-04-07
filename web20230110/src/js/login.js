class Login {
	/**
	 * 登陆组件的构造器
	 * @param {Router} Router的一个实例
	 */
	constructor(router) {
		this.router = router
	}

	/**
	 * 获取DOM元素绑定事件
	 */
	getDOMEleAddEve() {
		const signUpButton = document.getElementById('signUp');
		const signInButton = document.getElementById('signIn');
		const signIn = document.querySelector(".signIn")
		const signUp = document.querySelector(".signUp")
		const loginContainer = document.getElementsByClassName('loginContainer')[0];

		signUpButton.addEventListener('click', () => {
			loginContainer.classList.add("right-panel-active");
		});

		signInButton.addEventListener('click', () => {
			loginContainer.classList.remove("right-panel-active");
		});

		// 登录
		signIn.addEventListener("click", () => {
			//发起登录请求
			let loginName = $("#loginName").val()
			let loginPwd = $("#loginPwd").val()
			$.post(URL.loginUrl, {
				user_name: loginName,
				user_password: loginPwd
			},  (res)=> {
				let data = JSON.parse(res)[0]
				if (data.msg == "登录成功！") {
					userID = data.data
					clear()
					//如果密码和用户名均为root 则为管理端，pattern为1
					if(loginPwd == "root" && loginName == "root"){
						pattern = 1
					}else{//用户登录
						pattern = 0
					}
					//如果为用户端 0表示用户端
					if (pattern == 0) {
						this.router.appendRouterAndContent()
						this.router.getDOMEleAddEve()
						Menu.getDOMEleAddEve()
						Dish.getDOMEleAddEve()
						console.log("userId",userID);
					} else {
						this.router.appendRouterAndContent()
						this.router.getDOMEleAddEve()
						dishManage.getDOMEleAddEve()
					}
				} else {
					alert(data.msg)
				}
			})
		})

		// 注册
		signUp.addEventListener("click", () => {
			console.log("res");
			let resName = $("#resName").val()
			let resPwd = $("#resPwd").val()
			$.post(URL.resUrl, {
				user_name: resName,
				user_password: resPwd
			},  (res)=> {
				let data = JSON.parse(res)[0]
				if (data.msg == "注册成功") {
					userID = data.code
					clear()
					//如果为用户端 0表示用户端
					if (pattern == 0) {
						this.router.appendRouterAndContent()
						this.router.getDOMEleAddEve()
						Menu.getDOMEleAddEve()
						Dish.getDOMEleAddEve()
					} else {
						this.router.appendRouterAndContent()
						this.router.getDOMEleAddEve()
						dishManage.getDOMEleAddEve()
					}
				} else {
					alert(data.msg)
				}
			})
		})
	}

	/**
	 * 生成登陆界面的html字符串
	 * @returns 登录html字符串
	 */
	appendLogin() {
		let str = ""
		str += "<div class=\"loginContainer\">" //<!-- 登陆容器 -->
		str += "<div class = \"login-form-container sign-up-container\">" //<!-- 注册表单容器 -->
		str += "<form action=\"#\" id=\"signInForm\">" //<!-- 注册表单 -->
		str += "<h1>创建用户账号</h1>"
		str += "<input type=\"text\" placeholder=\"用户名\" id=\"resName\" />"
		str += "<input type=\"password\" placeholder=\"密码\" id=\"resPwd\"/>"
		str += "<input type=\"submit\" value=\"注册\" class=\"signUp\">"
		str += "</form>" //<!-- 注册表单 end -->
		str += "</div>" //<!-- 注册表单容器 end>
		str += "<div class=\"login-form-container sign-in-container\">" //<!-- 注册表单容器 -->
		str += "<form action=\"#\" id=\"signUpForm\">" //<!-- 注册表单 -->
		str += "<h1>登录</h1>"
		str += "<input type=\"text\" placeholder=\"用户\"  id=\"loginName\"/>"
		str += "<input type=\"password\" placeholder=\"密码\" id=\"loginPwd\"/>"
		str += "<input type=\"submit\" value=\"登录\" class=\"signIn\">"
		str += "</form>" //<!-- 注册表单 end -->
		str += "</div>" //<!-- 注册表单容器 end>
		str += "<div class=\"overlay-container\">" //<!-- 滑动容器 -->
		str += "<div class=\"overlay\">" //<!-- 滑动块 -->
		str += "<div class=\"overlay-panel overlay-left\">" //<!-- 登录滑动块 -->
		str += "<h1>欢迎回来</h1>"
		str += "<p>登录您的账号，让我们开始美食之旅！</p>"
		str += "<button class=\"ghost\" id=\"signIn\">登录</button>"
		str += "</div>" //<!-- 登录滑动块 end -->
		str += "<div class=\"overlay-panel overlay-right\">" //<!-- 注册滑动块 -->
		str += "<h1>Hello, Friend!</h1>"
		str += "<p>输入您的信息，加入我们这个大家庭吧！</p>"
		str += "<button class=\"ghost\" id=\"signUp\">注册</button>"
		str += "</div>" //<!-- 注册滑动块 end -->
		str += "</div>" //<!-- 滑动块 end -->
		str += "</div>" //<!-- 滑动容器 end -->
		str += "</div>" //<!-- 登录容器 end -->

		addHtmlIntoDoc(objContainer, str)
	}
}