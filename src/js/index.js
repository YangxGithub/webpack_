import css from '../css/style.css';
window.onload = function () {
  countDown();
  setRem();
  isLang();
}
window.onresize = function(){
  setRem();
}
let ospan = document.getElementsByClassName('span1')
function countDown() {
  let nowtime = new Date();
  let endtime = new Date("2021/04/22,15:00:00");
  let lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
  let h = parseInt(lefttime / (60 * 60));
  let m = parseInt(lefttime / 60 % 60);
  let s = parseInt(lefttime % 60);
  h = addZero(h);
  m = addZero(m);
  s = addZero(s);
  let obxs = document.getElementsByClassName('onebox')
  obxs[0].innerHTML = `${h}`
  obxs[1].innerHTML = `${m}`
  obxs[2].innerHTML = `${s}`
  if (lefttime <= 0) {
      // document.querySelector(".count").innerHTML = "活动已结束";
      obxs[0].innerHTML = '00'
      obxs[1].innerHTML = '00'
      obxs[2].innerHTML = '00'
      // ospan[0].innerHTML = '点击进入'
      return;
  }
  setTimeout(countDown, 1000);
}
function addZero(i) {
  return i < 10 ? "0" + i: i + "";
}
function setRem () {
  const bodyWidth = document.body.clientWidth
  const rem375 = bodyWidth * 100 / 375
  if (bodyWidth <= 979) {
    document.getElementsByTagName('html')[0].style.fontSize = rem375 + 'px'
  }
}
function isLang(){
  const lang = (navigator.systemLanguage?navigator.systemLanguage:navigator.language).substr(0, 2);
  if(lang == 'zh'){
    ospan[0].innerHTML = '启动倒计时'
  }else{
    ospan[0].innerHTML = 'Countdown'
  }
}