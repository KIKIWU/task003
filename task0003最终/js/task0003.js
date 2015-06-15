function addloadevent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function insertAfter(targetElement) {
	var span = document.createElement("span");
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(span);
	} else {
		parent.insertBefore(span, targetElement.nextSibling);
	}
}

function getElementsByClassName(className) {
	var ret = [];
	var dom = document.getElementsByTagName("*");
	for (var i = 0; i < dom.length; i++) {
		if (dom[i].className == className) {
			ret.push(dom[i]);
		}
	}
	return ret;
}
var EventUtil = {
	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	getEvent: function(event) {
		return event ? event : window.event;
	},
	getTarget: function(event) {
		return event.target || event.srcElement;
	},

};

function additems() {
	var add = $("#Add");
	var addItem = $("#addItem");
	var addTasks = $("#addTasks");
	var addtask = $("#addtask");
	var Isub = $("#sub_item");
	var newitems = $("#newitems");
	var define = $("#define");
	var tasksub = $("#submit");
	var task_title = $("#task_title");
	var detail = $("#detail");
	var editicon = $("#edit");
	var okicon = $("#ok");
	var flag = 0; //新增分类使用的标志
	var newvalue = '';
	var index = 0;
	var arr = [];
	var bln = false;
	var sub = $("#sub_nav");
	var cancel = $("#cancel");
	var addtitle = $("#addtitle");
	var button = document.getElementsByTagName("button");
	for (var i = 0; i < button.length; i++) {
		EventUtil.addHandler(button[i], "click", btnclick);
	}

	function formCheck(targetElment, whetherNull, maxLen, whetherMax) {
		targetElment.onblur = function() {
			if (whetherNull == true && targetElment.value.length == 0) {
				insertAfter(targetElment);
				targetElment.nextSibling.innerHTML = "*不能为空";
			}
			if (whetherMax == true && targetElment.value.length > maxLen) {
				insertAfter(targetElment);
				targetElment.nextSibling.innerHTML = "*不能超过" + maxLen + "位数";
			}
		}
		targetElment.onfocus = function() {
			targetElment.nextSibling.innerHTML = "";
		}
	}

	function btnclick(event) {
		var btn = event.target;
		var ele = getElementsByClassName("now");
		for (var i = 0; i < ele.length; i++) {
			ele[i].style.backgroundColor = "#fff";
		}
		var ul = $("#detail");
		ul.innerHTML = '';
		btn.className = "now";
		btn.style.backgroundColor = '#7CCBD6';
		var value = flag.innerHTML;
		value = value.split('(')[0];
		(value == '默认分类') ? value = "define": value;
		if (btn.innerHTML == '完成') {
			var key = JSON.parse(localStorage.getItem('storage'));
			for (var j in key) {
				if (value == j) {
					for (var k in key[j]) {
						if (key[j][k].bln == true) {
							var li = document.createElement("li");
							var oul = document.createElement("ul");
							var oli = document.createElement("li");
							li.setAttribute("class", "dateItems");
							li.innerHTML = key[j][k].date;
							ul.appendChild(li);
							li.appendChild(oul);
							oul.appendChild(oli);
							oli.innerHTML = key[j][k].title;
						}
					}
				}
			}
		} else if (btn.innerHTML == '未完成') {
			var key = JSON.parse(localStorage.getItem('storage'));
			for (var j in key) {
				if (value == j) {
					for (var k in key[j]) {
						if (key[j][k].bln == false) {
							var li = document.createElement("li");
							var oul = document.createElement("ul");
							var oli = document.createElement("li");
							li.setAttribute("class", "dateItems");
							li.innerHTML = key[j][k].date;
							ul.appendChild(li);
							li.appendChild(oul);
							oul.appendChild(oli);
							oli.innerHTML = key[j][k].title;
						}
					}
				}
			}
		} else if (btn.innerHTML == '所有') {
			var key = JSON.parse(localStorage.getItem('storage'));
			for (var j in key) {
				if (value == j) {
					for (var k in key[j]) {
						var li = document.createElement("li");
						var oul = document.createElement("ul");
						var oli = document.createElement("li");
						li.setAttribute("class", "dateItems");
						li.innerHTML = key[j][k].date;
						ul.appendChild(li);
						li.appendChild(oul);
						oul.appendChild(oli);
						oli.innerHTML = key[j][k].title;
					}
				}
			}
		}
	}
	EventUtil.addHandler(okicon, "click", function(event) {
		var value = $("h4").innerHTML;
		var key = JSON.parse(localStorage.getItem('storage'));
		for (var j in key) {
			for (var k in key[j]) {
				if (k == value) {
					key[j][k].bln = true;
				}
			}
		}
		localStorage.setItem('storage', JSON.stringify(key));
	});

	function editask(event) {
		title = $("#addtitle").value;
		date = $("#adddate").value;
		content = $("#addcontent").value;
		var deul = $("#detail");
		var li = document.createElement("li");
		var oul = document.createElement("ul");
		var oli = document.createElement("li");
		li.setAttribute("class", "dateItems");
		li.innerHTML = date;
		deul.appendChild(li);
		li.appendChild(oul);
		oul.appendChild(oli);
		oli.innerHTML = title;

		if (flag == 0) {
			$("#define").innerHTML = $("#define").innerHTML + '<li>' + '<span class="imooc imooc_nav">&#xf016;</span>' + '<em>' + title + '</em>' + '</li>';
			storagenews('storage', 'define', title, {
				title, date, content, bln
			});
		} else {

			var a = flag.innerHTML.split('(')[0];
			if (a == '默认分类') {
				$("#define").innerHTML = $("#define").innerHTML + '<li>' + '<span class="imooc imooc_nav">&#xf016;</span>' + '<em>' + title + '</em>' + '</li>';
				storagenews('storage', 'define', title, {
					title, date, content, bln
				});
			}
			var key = JSON.parse(localStorage.getItem('storage'));
			console.log(flag.parentNode.childNodes);
			for (var j in key) {
				if (j == a) {
					if (!flag.parentNode.childNodes[3]) {
						var ul = document.createElement("ul");
						flag.parentNode.appendChild(ul);
					}
					if (flag.parentNode.childNodes[3]) {
						flag.parentNode.childNodes[3].innerHTML = flag.parentNode.childNodes[3].innerHTML + '<li>' + '<span class="imooc imooc_nav">' + '&#xf016;' + '</span>' + title + '</li>';
						storagenews('storage', j, title, {
							title, date, content, bln
						});
					}
				}
			}
		}

		$("#addtitle").value = '';
		$("#adddate").value = '';
		$("#addcontent").value = '';
		addtask.style.display = "none";
		task_title.style.display = "block";
	}

	//left list click function
	EventUtil.addHandler("sub_nav", "click", addfn);

	function addfn(event) {
		var index = event.target.parentNode.parentNode.children;
		var tag = []; //新增任务
		var time = [];
		var sp = 0;
		var p = event.target.parentNode;
		for (var i = 0; i < index.length; i++) {

			if (index[i] == p) {
				break;
			}
		}
		flag = event.target;

		if (flag.className == "imooc imooc_none") { //删除呀删除
			var node = flag.parentNode.childNodes[1];
			var parent = flag.parentNode.parentNode;
			parent.removeChild(flag.parentNode);
			for (var i = 0; i < localStorage.length; i++) {
				var key = JSON.parse(localStorage.getItem(localStorage.key(i)));
				for (var j in key) {
					if (j == node.innerHTML) {
						clearStorage(j);
					}
				}
			}
		}
		var ele = getElementsByClassName("visit");
		for (var i = 0; i < ele.length; i++) {
			ele[i].style.color = "#000";
		}

		flag.className = flag.className + "visit";
		flag.style.color = '#398E9B';
		var value = flag.innerHTML;
		value = value.split('(')[0];
		(value == '默认分类') ? value = "define": value;
		var ul = $("#detail");
		ul.innerHTML = '';
		var key = JSON.parse(localStorage.getItem('storage'));
		for (var j in key) {
			if (value == j) {
				tag[0] = key[j];
				tag[1] = j;
				for (var k in key[j]) {
					time.push(tag[0][k].date);
					time.sort();
				}
				for (var p = 0; p < time.length; p++) {
					for (var q = p + 1; q < time.length; q++) {
						if (time[p] == time[q]) {
							time.splice(q, 1);
							q--;
						}
					}
				}

				for (var i = 0; i < time.length; i++) {
					for (var k in key[j]) {

						if (time[i] == tag[0][k].date) {
							if (sp == tag[0][k].date) {
								oul.innerHTML = oul.innerHTML + '<li>' + tag[0][k].title + '</li>';
							} else {

								var li = document.createElement("li");
								var oul = document.createElement("ul");
								var oli = document.createElement("li");
								li.setAttribute("class", "dateItems");
								li.innerHTML = tag[0][k].date;
								ul.appendChild(li);
								li.appendChild(oul);
								oul.appendChild(oli);
								oli.innerHTML = tag[0][k].title;
								sp = tag[0][k].date;
							}
						}
					}
				}
			}
		}
	}
	//新增分类点击
	EventUtil.addHandler(addItem, "click", function() {
		add.style.display = 'block';
		add.children[0].style.display = 'block';

	});
	//显示纤细任务信息
	EventUtil.addHandler(detail, "click", function() {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var value = target.innerHTML;
		var arr = [];
		var mm = 0;
		for (var i = 0; i < localStorage.length; i++) {
			var key = JSON.parse(localStorage.getItem(localStorage.key(i)));
			for (var j in key) {
				for (var k in key[j]) {
					if (target.innerHTML == k) {
						task_title.children[1].innerHTML = k;
						for (var n in key[j][k]) {
							arr[mm] = key[j][k][n];
							mm++;
						}
						task_title.children[2].innerHTML = arr[1];
						task_title.children[3].innerHTML = arr[2];
					}
				}
			}
		}
	});

	//新增任务确认点击函数
	function addedit() {
		var title = '';
		var date = '';
		var content = '';
		addtask.style.display = "block";
		task_title.style.display = "none";

		//新增任务编辑按钮函数
		EventUtil.addHandler(tasksub, "click", editask);
		formCheck(addtitle, true);
		formCheck(addcontent, true, 500, true);
		datacheak(adddate);
	}

	function datacheak(element) {
		adddate.onblur = function() {
			var str = element.value;
			var reg = /^\d{4}-\d{1,2}-\d{1,2}$/;
			if (!reg.test(str)) {
				insertAfter(adddate);
				adddate.nextSibling.innerHTML = "日期格式为yyyy-mm-dd";
			}
		}
		adddate.onfocus = function() {
			adddate.nextSibling.innerHTML = "";
		}

	}
	EventUtil.addHandler(addTasks, "click", addedit);
	EventUtil.addHandler(cancel, "click", function() {
		addtask.style.display = "none";
		task_title.style.display = "block";
	});

	//编辑图标点击函数
	EventUtil.addHandler(edit, "click", addedit);
	//新增分类按钮函数
	EventUtil.addHandler(Isub, "click", function() {
		add.style.display = 'none';
		add.children[0].style.display = 'none';
		newvalue = newitems.value;
		storagenews('storage', newvalue);
		sub.innerHTML = sub.innerHTML + '<li>' + '<span class="imooc imooc_nav">&#xf07c;</span>' + '<em>' + newvalue + '</em>' + '</li>';
	});
	//小任务点击函数
	EventUtil.addHandler(sub, "click", function() {
		var tag = []; //新增任务
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var ul = $("#detail");
		ul.innerHTML = '';
		if (target.parentNode.className == 'nav') {
			addfn(event);
		} else {
			if (target.className == "imooc imooc_none") { //删除呀删除
				var node = target.parentNode.childNodes[1];
				var parent = target.parentNode.parentNode;
				parent.removeChild(target.parentNode);
				for (var i = 0; i < localStorage.length; i++) {
					var key = JSON.parse(localStorage.getItem(localStorage.key(i)));
					for (var j in key) {
						if (j == node.innerHTML) {
							clearStorage(j);
						}
						for (var k in key[j]) {
							if (k == node.innerHTML) {
								clearStorage(k);
							}
						}
					}
				}
			} else {
				for (var i = 0; i < localStorage.length; i++) {
					var key = JSON.parse(localStorage.getItem(localStorage.key(i)));
					for (var j in key) {
						for (var k in key[j]) {
							if (target.innerHTML == k) {
								tag[0] = key[j][k];
								tag[1] = k;
							}
						}
					}
				}
				var li = document.createElement("li");
				var oul = document.createElement("ul");
				var oli = document.createElement("li");
				li.setAttribute("class", "dateItems");
				li.innerHTML = tag[0].date;
				ul.appendChild(li);
				li.appendChild(oul);
				oul.appendChild(oli);
				oli.innerHTML = tag[0].title;
			}
		}
	});
	EventUtil.addHandler(window, "resize", findDimensions);
}

function master(name) {
	if (localStorage.getItem(name)) {
		return JSON.parse(localStorage.getItem(name));
	} else {
		return false;
	}

}

function seek(taskname) {
	var storage = window.localStorage;
	for (var i = 0; i < storage.length; i++) {
		var key = JSON.parse(storage.getItem(storage.key(i)));
		for (var j in key) {
			if (j == taskname) {
				return key[j];
			}
		}
	}
	return false;
}

function storagenews(index, message, type, obj) {
	if (!window.localStorage) {
		return
	}
	var e = JSON.parse(localStorage.getItem(index));
	if (type && obj) {
		if (!e[message]) {
			e[message] = {};
		}
		e[message][type] = obj;
		localStorage.setItem(index, JSON.stringify(e));
	} else if (e) {
		e[message] = {};
		localStorage.setItem(index, JSON.stringify(e));
	} else if (!e) {
		o = {};
		o[message] = {};
		localStorage.setItem(index, JSON.stringify(o));
	}
}

function clearStorage(task) {
	var storage = window.localStorage;
	for (var i = 0; i < storage.length; i++) {
		var key = JSON.parse(localStorage.getItem(storage.key(i)));
		for (var j in key) {
			if (j == task) {
				delete key[j];
			}
			for (var k in key[j]) {
				if (k == task) {
					delete key[j][k];
				}
			}
		}
	}
	localStorage.setItem('storage', JSON.stringify(key));
}

function showStorage() {
	var sub_nav = $("#sub_nav");
	var myindex = [0, 0, 0, 0, 0];
	var tasksum = $("#left_nav").getElementsByTagName("em")[0];
	var sum = 0;
	var n = false;
	var m = 0;
	var size = 0;
	var number = [];
	var key = JSON.parse(localStorage.getItem('storage'));
	for (var j in key) {
		number[m] = 0;
		number[m + 1] = 0;
		if (j != 'define') {

			sub_nav.innerHTML = sub_nav.innerHTML + '<li class="nav">' + '<span class="imooc imooc_nav">&#xf07c;</span>' + '<em>' + j + '</em>' + '<span class="imooc imooc_none">&#xf00d;</span>' + '</li>';
		}
		for (var k in key[j]) {
			sum++;
			if (j == 'define') {
				number[0]++;
				$("#sub_nav").getElementsByTagName("em")[0].innerHTML = $("#sub_nav").getElementsByTagName("em")[0].innerHTML.split('(')[0];
				$("#sub_nav").getElementsByTagName("em")[0].innerHTML += '(' + number[0] + ')';
				$("#define").innerHTML = $("#define").innerHTML + '<li>' + '<span class="imooc imooc_nav">' + '&#xf016;' + '</span>' + '<em>' + k + '</em>' + '<span class="imooc imooc_none">&#xf00d;</span>' + '</li>';
			} else {

				if (n == false) {
					var chd = getElementsByClassName("nav")[size];
					var ul = document.createElement("ul");
					ul.setAttribute("class", "list" + m);
					ul.innerHTML = '<li>' + '<span class="imooc imooc_nav">' + '&#xf016;' + '</span>' + '<em>' + k + '</em>' + '<span class="imooc imooc_none">&#xf00d;</span>' + '</li>';
					chd.appendChild(ul);
					n = true;
					number[m]++;
				} else {
					var str = '.list' + m;
					$(str).innerHTML = $(str).innerHTML + '<li>' + '<span class="imooc imooc_nav">' + '&#xf016;' + '</span>' + '<em>' + k + '</em>' + '<span class="imooc imooc_none">&#xf00d;</span>' + '</li>';
					number[m]++;
				}
			}
			if (j != 'define') {
				chd.getElementsByTagName("em")[0].innerHTML = chd.getElementsByTagName("em")[0].innerHTML.split('(')[0];
				chd.getElementsByTagName("em")[0].innerHTML += '(' + number[m] + ')';
			}
		}
		m++;
		n = false;
		if (key.hasOwnProperty(j)) size++;
	}
	tasksum.innerHTML = '(' + sum + ')';
}

function findDimensions() //函数：高度适应浏览器
{
	var winHeight = 0;
	if (window.innerHeight)
		winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;
	//通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
		winHeight = document.documentElement.clientHeight;
	}
	var main = $("#main");
	var sub = $("#sub");
	var extra = $("#extra");
	var layout = $("#body_layout");
	layout.style.height = winHeight - 60 + 'px';
	main.style.height = winHeight - 60 + 'px';
	sub.style.height = winHeight - 60 + 'px';
	extra.style.height = winHeight - 60 + 'px';
}

addloadevent(showStorage);
addloadevent(additems);
addloadevent(findDimensions);