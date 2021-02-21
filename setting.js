// menu.js: JavaScript and Node.JS enviornment
// const fs = require("fs");

document.body.style.backgroundImage = "url('src/img/bg.jpg')";
var panel = document.getElementById("panel");
var optionBGM = document.getElementById("option-bgm");
var Setting =
{
  color:
  [
    "rgb(210, 210, 210)",
    "rgb(252, 92, 101)",
    "rgb(253, 150, 68)",
    "rgb(254, 211, 48)",
    "rgb(38, 222, 129)",
    "rgb(69, 170, 242)",
    "rgb(75, 123, 236)",
    "rgb(165, 94, 234)"
  ],
  keyDownCode:
  {
    left: 37,
    right: 39,
    hold: 16,
    leftHalf: 88,
    rightHalf: 67,
    leftQuarter: 90,
    rightQuarter: 86,
    hardDrop: 38,
    softDrop: 40
  },
  bgm: 3,
  randomColor: false,
  sprintMode: false,
  debugMode: false,
  sprintLine: 40,
  countDown: 500,
  infoTime: 1000,
  fallTime: 500,
  lockTime: 500
}

panel.style.border = "1.6px solid white";
optionBGM.children[0].defaultValue = Setting.bgm;


function collectNewSetting()
{
  Setting.bgm = Number(optionBGM.children[0].defaultValue);
  console.log(Setting);
}
$(".ui.dropdown").dropdown();