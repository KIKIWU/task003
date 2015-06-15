# task003
##任务三记录
***5.17提交第一次***
[收获分享]：
1.本地存储
&nbsp;&nbsp;&nbsp;&nbsp;localStorage的使用
&nbsp;&nbsp;&nbsp;&nbsp;var storage = window.localStorage;
&nbsp;&nbsp;&nbsp;&nbsp;storage.setItem("a",5);           //存储一个键值对
&nbsp;&nbsp;&nbsp;&nbsp;storage.setItem('b',"running");   //修改一个键值
&nbsp;&nbsp;&nbsp;&nbsp;storage.removeItem("c");          //清除c的值

function showStorage(){           //循环显示localStorage里的键值对
    for(var i=0;i<storage.length;i++){
                                  //key(i)获得相应的键，再用getItem()方法获得对应的值
    document.write(storage.key(i)+ " : " + storage.getItem(storage.key(i)) + "<br>");
   }
}
//json转换
var person = {'name': 'rainman', 'age': 24};
localStorage.setItem("me", JSON.stringify(person));
console.log(JSON.parse(localStorage.getItem('me')).name);
2.事件代理
<ul id="myLinks">
    <li id="one">one</li>
    <li id="two">two</li>   
    <li id="hi">hello</li>
</ul>

var list = document.getElementById("myLinks");
EventUtil.addHandler(list, "click", function(event) {
    event.EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    switch(target.id) {
        case "one":
            document.title = "I changed the document's title";
            break;
        case "two":
            location.href = "http://www.wrox.com";
            break;  
        case "hi":
            alert("hi");
            break;   
    }
});
事件代理还是很有用滴~~
***6.13更新第一次  ***
鉴于提交的时候任务按照时间升序或降序排序没有实现
以及某次手抖发现了bug
特更新一次~~

