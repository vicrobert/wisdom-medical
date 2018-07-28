$(function(){
var time = $(".time");
var timer = setInterval(()=>{
    var otime = new Otime();
    time.children('span').eq(0).html(otime.date)
        .next().html(otime.day)
        .next().html(otime.t);  
},1000)  
})

function Otime(){
this.odate = new Date();
this.date= this.odate.getFullYear()+'年'+(this.odate.getMonth()*1+1)+'月'+this.odate.getDate()+'日';
this.t =isTen(this.odate.getHours())+':'+isTen(this.odate.getMinutes())+':'+isTen(this.odate.getSeconds());
switch(this.odate.getDay()){
case 0:
this.day = '星期天'
break;
case 1:
this.day = '星期一'
break;
case 2:
this.day = '星期二'
break;
case 3:
this.day = '星期三'
break;
case 4:
this.day = '星期四'
break;
case 5:
this.day = '星期五'
break;
case 6:
this.day = '星期六'
break;
default:
this.day = '星期天'
break;
}
}
function isTen(num){
return num/10>=1?num:'0'+num
}