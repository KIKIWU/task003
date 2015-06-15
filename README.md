# task003
###任务三记录
***5.17提交第一次***
  [收获分享]：
  </br>
  1.本地存储
  </br>
  localStorage的使用。
</br>
var storage = window.localStorage;</br>
storage.setItem("a",5);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//存储一个键值对</br>
storage.setItem('b',"running");   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//修改一个键值</br>
storage.removeItem("c");         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //清除c的值</br>

function showStorage(){    &nbsp;&nbsp;&nbsp;&nbsp;       //循环显示localStorage里的键值对</br>
    for(var i=0;i<storage.length;i++){</br>
                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;       //key(i)获得相应的键，再用getItem()方法获得对应的值</br>
    document.write(storage.key(i)+ " : " + storage.getItem(storage.key(i)) + "<br>");</br>
   }
}
//json转换
</br>
var person = {'name': 'rainman', 'age': 24};</br>
localStorage.setItem("me", JSON.stringify(person));</br>
console.log(JSON.parse(localStorage.getItem('me')).name);</br>
</br>
2.事件代理
</br>
<ul id="myLinks">
    <li id="one">one</li>
    <li id="two">two</li>   
    <li id="hi">hello</li>
</ul>

var list = document.getElementById("myLinks");</br>
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
</br>
事件代理还是很有用滴~~
</br>
***6.13更新第一次  ***
鉴于提交的时候任务按照时间升序或降序排序没有实现</br>
以及某次手抖发现了bug</br>
特更新一次~~</br>

