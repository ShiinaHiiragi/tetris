// menu.js: JavaScript and Node.JS enviornment

document.body.style.backgroundImage = "url('src/img/bg.jpg')";

var Cite =
{
  panel: document.getElementById("panel"),
  menuTitleField: document.getElementById("menu-title-field")
}
var outerWidth = window.getComputedStyle(Cite.panel).width;
var innerWidth = window.getComputedStyle(Cite.menuTitleField).width;
outerWidth = Number(outerWidth.substr(0, outerWidth.length - 2));
innerWidth = Number(innerWidth.substr(0, innerWidth.length - 2));
Cite.menuTitleField.style.left = ((outerWidth - innerWidth) / 2).toString() + "px";


/*
rgb(192, 57, 43)
rgb(211, 84, 0)
rgb(243, 156, 18)
rgb(39, 174, 96)
rgb(41, 128, 185)
rgb(142, 68, 173)
*/