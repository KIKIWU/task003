
function add(num1, num2) {
	return num1 + num2;
}

function renderResult(result) {
	$("result").innerHTML = result;
}

function isArray(arr) {
	return Object.prototype.toString.call(arr) == "[object Array]";
}

function isFunction(Fn) {
	return Object.prototype.toString.call(Fn) == "[object Function]";
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
function cloneObject(src) {
	var obj = src.constructor === Array ? [] : {}; 
	for (var i in src) {
		if(src.hasOwnProperty(i)) {
            obj[i] = typeof src[i] === "object" ? arguments.callee(src[i]) : src[i];
        } 
	}
    return obj;

}
//对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
   for ( var i=0; i<arr.length; i++ ) {
	for ( var j=i+1; j<arr.length; j++ ) {
		if ( arr[i] == arr[j] ) {
			arr.splice( j, 1 );
			j--;
		}
	}
}
return arr;
}

function trim(str) {
	var a = '';
    for ( var i=0; i<str.length; i++ ) {
	if (str[i] !=' ') {
		a += str[i];
	}
}
    return a;
}

//对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str) {
	var a ='';
    for ( var i=0; i<str.length; i++ ) {
	if (str.charAt(i) !=' ' && str.charAt(i) !=' ') {
		a += str[i];
	}
}
    return a;
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
    	 fn(i, arr[i]);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var b = 0;
	for(var i in obj){
		if(obj.hasOwnProperty(i)){
           b++;
		}
	}
	return b;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var reg = /^([\w]+[_|\_|\.]?)*[\w]+@([\w]+[_|\_|\.]?)*[\w]+\.[\w]{2,3}$/;
    return emailStr.test(reg);
}

// 判断是否为手机号
function isMobilePhone(phone) {
     var reg = /^1(3[4-9]|5[0123789]|8[056789])\d{8}$/;
    return phone.test(reg);
}

// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var emt = document.createElement("element");
    emt.className = newClassName;
}

// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
		var reg = new RegExp('(\\s|^)' + oldClassName + '(\\s|$)');
		element.className = element.className.replace(reg, ' ');
}
// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if(element.parentNode == siblingNode.parentNode){
    	return true;
    }
    return false;
}

// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var left = element.offsetLeft;  
	var top = element.offsetTop; 
	if(element.offsetParent != null){
		left += element.offsetParent.offsetLeft;
		top += element.offsetParent.offsetTop;
	}
	var obj = {
		x: 0,
		y: 0
	};
	obj.x = left;
	obj.y = top;

	return obj;
}

function getElementByClassName(className) {
	var ret = [];
	var dom = document.getElementsByTagName("*");
	for (var i = 0; i < dom.length; i++) {
		if (dom[i].className == className) {
			ret.push(dom[i]);
		}
	}
	return ret[0];
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

function getElementsByProperty(oprototype, ovalue) {
	var ret = [];
	var dom = document.getElementsByTagName("*");
	for (var i = 0; i < dom.length; i++) {
		if (dom[i].nodeType == 1) {
			if (ovalue) {
				if (dom[i].getAttribute(oprototype) == ovalue) {
					ret.push(dom[i]);
				}
			} else {
				if (dom[i].getAttribute(oprototype)) {
					ret.push(dom[i]);
				}
			}
		}
	}
	return ret[0];
}
// 实现一个简单的Query
function $(selector) {
	this.selector = selector;
	var flag = 0;
	var reg = /^\#[\w]*[\w]+\s+\.[\w]*[\w]/;
	if (selector.match(reg)) {
		flag = 3;
	} else {
		for (var i = 0; i < selector.length; i++) {
			if (selector[i] == ' ') {
				flag = 1;
			} else
			if (selector[i] == '=') {
				flag = 2;
			}
		}
	}
	if (flag == 0) {
		switch (selector.charAt(0)) {
			case '#':
				var str = selector.slice(1);
				return document.getElementById(str);
				break;
			case '.':
				var str = selector.slice(1);
				return getElementByClassName(str);
				break;
			case '[':
				var str = selector.slice(1, selector.length - 1);
				return getElementsByProperty(str);
				break;
			default:
				return document.getElementsByTagName(selector)[0];
		}
	} else if (flag == 1) {
		var rex = selector.lastIndexOf(".");
		return getElementByClassName(selector.slice(rex + 1));
	} else if (flag == 2) {
		var rex = selector.lastIndexOf("=");
		
		var value = selector.slice(rex + 1, selector.length - 1)
		return getElementByProperty(selector.slice(1, rex), value);
	} else if(flag == 3) {
		var rex = selector.lastIndexOf(".");
		var arr = getElementsByClassName(selector.slice(rex + 1));
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].parentNode == document.getElementById(selector.slice(selector.lastIndexOf("#")+1, rex-1))) {
				return arr[i];
			}
		}
	}
}

 // 给一个dom绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
            element.addEventListener(event, listener, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, listener);
        } else {
            element["on" + event] = listener;
        }
}

// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
            element.removeEventListener(event, listener, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + event, listener);
        } else {
            element["on" + event] = null;
        }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
     if (element.addEventListener) {
            element.addEventListener("click", listener, false);
        } else if (element.attachEvent) {
            element.attachEvent("onclick", listener);
        } else {
            element["onclick"] = listener;
        }
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
	element["onkeydown"] = function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13) {
			listener();
		}
	};
}

$.on = function(selector, event, listener) {
	if (selector.addEventListener) {
		selector.addEventListener(event, listener, false);
	} else if (selector.attachEvent) {
		selector.attachEvent("on" + event, listener);
	} else {
		selector["on" + event] = listener;
	}
};

$.click = function(selector, listener) {
	if (selector.addEventListener) {
		selector.addEventListener("click", listener, false);
	} else if (selector.attachEvent) {
		selector.attachEvent("onclick", listener);
	} else {
		selector["onclick"] = listener;
	}
};

$.delegate = function(selector, tag, event, listener) {
	var str = document.getElementById(selector.slice(1)).getElementsByTagName(tag);
	for (var i = 0; i < str.length; i++) {
		if (str[i].addEventListener) {
			str[i].addEventListener(event, listener, false);
		} else if (str[i].attachEvent) {
			str[i].attachEvent("on" + event, listener);
		} else {
			str[i]["on" + event] = listener;
		}
	}
};

$.un = function(selector, event, listener) {
	if (selector.removeEventListener) {
		selector.removeEventListener(event, listener, false);
	} else if (selector.detachEvent) {
		selector.detachEvent("un" + event, listener);
	} else {
		selector["un" + event] = null;
	}
};

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
	if (document.all && window.ActiveXObject && !window.opera) {
		var brw = window.navigator.userAgent.toLowerCase();
		var ie = brw.match(/msie ([\d.]+)/)[1];
		return ie;
	} else return -1;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookietext = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue);
    if (expiredays instanceof Date) {
    	cookietext += "; expires=" + expires.toGWTString();
    }
    document.cookie = cookietext;
}

// 获取cookie值
function getCookie(cookieName) {

    var Name = encodeURIComponent(cookieName) + "=",
    cookieStart = document.cookie.indexOf(Name),
    cookieValue = null;
    if (cookieStart > -1) {
    	var cookieEnd = document.cookie.indexOf(";", cookieStart);

    	if (cookieEnd == -1) {
    		cookieEnd = document.cookie.length;
    	}
    	cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + Name.length, cookieEnd));
    }
    return cookieValue;
}

function ajax(url, options) {
	var xhr = new XMLHttpRequest();
	if (options.type == "get") {
		var theUrl = url + "?";
		for ( p in options.data) {
			theUrl += p + "=" + options.data[p] + "&";
		}
		theUrl.slice(0, theUrl.length - 1);
		xhr.open("get", theUrl, true);
		xhr.send();
		xhr.onreadyatatechange == function() {
			if (xhr.readyatate == 4) {
				// XHR对象的readyatate属性为4时完成。已经接受到全部响应数据，而且已经可以在客户端使用了。
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					// ststus:响应的HTTP状态。200成功。304没有被修改可以直接使用浏览器缓存
					options.onsuccess(xhr);
				} else {
					options.onfail(xhr);
				}
			}
		};
	} else if (options.type == "post") {
		var theData = "";
		for( p in options.data) {
			theData += p + "=" + options.data[p] + "&";
		}
		theData = theData.slice(0, theData.length - 1);
		xhr.open("post", url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(theData);
		xhr.onreadyatatechange == function() {
			if (xhr.readyatate == 4) {
				// XHR对象的readyatate属性为4时完成。已经接受到全部响应数据，而且已经可以在客户端使用了。
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					// ststus:响应的HTTP状态。200成功。304没有被修改可以直接使用浏览器缓存
					options.onsuccess(xhr);
				} else {
					options.onfail(xhr);
				}
			}
		};
	}
}

