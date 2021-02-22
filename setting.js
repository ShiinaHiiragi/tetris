// menu.js: JavaScript and Node.JS enviornment
// const fs = require("fs");

document.body.style.backgroundImage = "url('src/img/bg.jpg')";
document.body.style.backgroundSize = "cover";
var panel = document.getElementById("panel");
var optionGeneral = document.getElementById("option-general");
var optionKey = document.getElementById("option-key");
var optionColor = document.getElementById("option-tet-color");
var optionApply = document.getElementById("option-apply");
var optionBGM = document.getElementById("option-bgm");
var optionRandomColor = document.getElementById("option-color");
var optionDebug = document.getElementById("option-debug");
var tetString = ["O", "L", "J", "T", "S", "Z", "I"];
var keyRawString = ["Left Shift", "Right Shift", "Hold",
                    "<i class='undo icon'></i>180°", "<i class='redo icon'></i>180°", 
                    "<i class='undo icon'></i>90°", "<i class='redo icon'></i>90°",
                    "Hard Drop", "Soft Drop"]
var keyString = ["left-swift", "right-swift", "hold", "left-half", "right-half", 
                 "left-quarter", "right-quarter", "hard-drop", "soft-drop"];
var keyEvalString = ["left", "right", "hold", "leftHalf", "rightHalf",
                     "leftQuarter", "rightQuarter", "hardDrop", "softDrop"];
var generalRawString = ["sprint-line", "count-down", "info-time", "fall-time", "lock-time"];
var generalString = ["sprintLine", "countDown", "infoTime", "fallTime", "lockTime"];
var generalLeft =
[
  "<a title=\"Lines to erase in Sprint mode.\">Sprint Line</a>",
  "<a title=\"Time span between three, two and one.\">Countdown (ms)</a>",
  "<a title=\"Time span of information like Tetris or T-Spin.\">Info Time (ms)</a>",
  "<a title=\"Time span of tetromino falling down.\">Fall Time (ms)</a>",
  "<a title=\"Time span before tetromino locking down.\">Lock Time (ms)</a>"
];
var keyTable = {8: 'Backspace', 9: 'Tab', 13: 'Enter', 16: 'Shift', 17: 'Ctrl', 18: 'Alt', 19: 'Pause', 20: 'Caps Lock', 27: 'Esc', 32: 'Space', 33: 'PgUp', 34: 'PgDn', 35: 'End', 36: 'Home', 37: '←', 38: '↑', 39: '→', 40: '↓', 45: 'Insert', 46: 'Delete', 48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 59: ';', 61: '=', 65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E', 70: 'F', 71: 'G', 72: 'H', 73: 'I', 74: 'J', 75: 'K', 76: 'L', 77: 'M', 78: 'N', 79: 'O', 80: 'P', 81: 'Q', 82: 'R', 83: 'S', 84: 'T', 85: 'U', 86: 'V', 87: 'W', 88: 'X', 89: 'Y', 90: 'Z', 96: '0kpad', 97: '1kpad', 98: '2kpad', 99: '3kpad', 100: '4kpad', 101: '5kpad', 102: '6kpad', 103: '7kpad', 104: '8kpad', 105: '9kpad', 106: '*', 107: '+', 109: '-', 110: '.', 111: '/', 112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6', 118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12', 173: '-', 187: '=', 188: ',', 190: '.', 191: '/', 192: '`', 219: '[', 220: '\\', 221: ']', 222: "'"};
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
var optionColorButton = document.createElement("button");
var optionDebugButton = document.createElement("button");
var applyButton = document.createElement("button");
applyButton.className = "ui basic button";
applyButton.innerText = "Apply";
applyButton.setAttribute("onclick", "collectNewSetting()");
optionColorButton.className = (Setting.randomColor ? "ui basic button active" : "ui basic button");
optionDebugButton.className = (Setting.debugMode ? "ui basic button active" : "ui basic button");
optionColorButton.innerText = (Setting.randomColor ? "ON" : "OFF");
optionDebugButton.innerText = (Setting.debugMode ? "ON" : "OFF");
optionColorButton.setAttribute("onclick", "switchPressed(this)");
optionDebugButton.setAttribute("onclick", "switchPressed(this)");
optionRandomColor.append(optionColorButton);
optionDebug.append(optionDebugButton);
optionApply.append(applyButton);

for (var index = 0; index < 5; index += 1)
{
  var newOptionBox = document.createElement("div");
  newOptionBox.className = "option-box";
  optionGeneral.append(newOptionBox);
  var newOptionLeft = document.createElement("div");
  var newOptionRight = document.createElement("div");
  newOptionLeft.className = "option-left";
  newOptionRight.className = "option-right";
  newOptionLeft.innerHTML = generalLeft[index];
  newOptionBox.append(newOptionLeft);
  newOptionBox.append(newOptionRight);
  var newUIContainer = document.createElement("div");
  newUIContainer.className = "ui input";
  newUIContainer.id = generalRawString[index];
  newOptionRight.append(newUIContainer);
  var newInput = document.createElement("input");
  newInput.type = "text";
  eval(`newInput.value = Setting.${generalString[index]}`);
  newUIContainer.append(newInput);
}

for (var index = 0; index < 9; index += 1)
{
  var newOptionBox = document.createElement("div");
  newOptionBox.className = "option-box";
  optionKey.append(newOptionBox);
  var newOptionLeft = document.createElement("div");
  var newOptionRight = document.createElement("div");
  newOptionLeft.className = "option-left";
  newOptionRight.className = "option-right";
  newOptionLeft.innerHTML = keyRawString[index];
  newOptionBox.append(newOptionLeft);
  newOptionBox.append(newOptionRight);
  var newUIContainer = document.createElement("div");
  newUIContainer.className = "ui container";
  newUIContainer.id = keyString[index];
  newOptionRight.append(newUIContainer);
  var newButton = document.createElement("button");
  newButton.className = "ui basic button";
  newButton.setAttribute("onclick", "changeKey(this)");
  eval(`newButton.innerText = keyTable[Setting.keyDownCode.${keyEvalString[index]}]`);
  newUIContainer.append(newButton);
}

tetString.forEach((item, index) =>
{
  var newOptionBox = document.createElement("div");
  newOptionBox.className = "option-box";
  optionColor.append(newOptionBox);
  var newOptionLeft = document.createElement("div");
  var newOptionRight = document.createElement("div");
  newOptionLeft.className = "option-left";
  newOptionRight.className = "option-right";
  newOptionLeft.style.width = "30%";
  newOptionRight.style.width = "70%";
  newOptionLeft.innerText = `${item} Tetromino`;
  newOptionBox.append(newOptionLeft);
  newOptionBox.append(newOptionRight);
  var newUIContainer = document.createElement("div");
  newUIContainer.className = "ui container";
  newUIContainer.id = `option-${item}`;
  newOptionRight.append(newUIContainer);
  var rgbArray = Setting.color[index + 1].match(/-?([1-9]\d*(\.\d*)*|0\.[1-9]\d*)/g);
  for (var index = 2; index >= 0; index -= 1)
  {
    var newUIInput = document.createElement("div");
    var newInput = document.createElement("input");
    newUIInput.className = "ui input";
    newUIInput.id = `${item}-${index}`;
    newInput.type = "text";
    newInput.value = rgbArray[index];
    newUIContainer.append(newUIInput);
    newUIInput.append(newInput);
  }
})

function collectNewSetting()
{
  if (Number(optionBGM.children[0].defaultValue) != NaN)
    Setting.bgm = Number(optionBGM.children[0].defaultValue);
  Setting.randomColor = (optionColorButton.className == "ui basic button active");
  Setting.debugMode = (optionDebugButton.className == "ui basic button active");
  for (var index = 0; index < 5; index += 1)
  {
    var num = Number(document.getElementById(generalRawString[index]).children[0].value);
    if (num != NaN) eval(`Setting.${generalString[index]} = num`);
  }
  for (var index = 0; index < 7; index += 1)
  {
    var rgbArray = Setting.color[index + 1].match(/-?([1-9]\d*(\.\d*)*|0\.[1-9]\d*)/g);
    for (var subIndex = 0; subIndex < 3; subIndex += 1)
    {
      var num = Number(document.getElementById(`${tetString[index]}-${subIndex}`).children[0].value);
      if (num != NaN) rgbArray[subIndex] = num;
    }
    Setting.color[index + 1] = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
  }
  console.log(Setting);
}

function switchPressed(self)
{
  var trueValue = (self.className == "ui basic button active");
  self.className = (trueValue ? "ui basic button" : "ui basic button active");
  self.innerText = (trueValue ? "OFF" : "ON");
}

function changeKey(self)
{
}

$(".ui.dropdown").dropdown();