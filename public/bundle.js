!function(e){var s={};function r(t){if(s[t])return s[t].exports;var i=s[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=s,r.d=function(e,s,t){r.o(e,s)||Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:t})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(s,"a",s),s},r.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)},r.p="/public/",r(r.s=1)}([function(e,s,r){"use strict";var t=15,i=.02,n={},o="",c=void 0,_=void 0,a=t,u=void 0,j=void 0,l=[],m="Timer: <br>",p=m+"Ready",T=10,O=!1,R=document.getElementById("timer");R.innerHTML=p;var D=document.getElementById("tools"),g="#cb3594";function E(){var e="";switch(Math.floor(26*Math.random())){case 0:e="a";break;case 1:e="b";break;case 2:e="c";break;case 3:e="d";break;case 4:e="e";break;case 5:e="f";break;case 6:e="g";break;case 7:e="h";break;case 8:e="i";break;case 9:e="j";break;case 10:e="k";break;case 11:e="l";break;case 12:e="m";break;case 13:e="n";break;case 14:e="o";break;case 15:e="p";break;case 16:e="q";break;case 17:e="r";break;case 18:e="s";break;case 19:e="t";break;case 20:e="u";break;case 21:e="v";break;case 22:e="w";break;case 23:e="x";break;case 24:e="y";break;case 25:e="z"}return Math.floor(2*Math.random())?e.toUpperCase():e}function A(){a=t}function H(e){0===e?(R.innerHTML=p,A()):R.innerHTML=m+e}function d(e){var s=e;if(!1===O){O=!0,H(s);var r=setInterval(function(){H(s-=1),0===e&&(O=!1,clearInterval(r))},1e3)}}D.innerHTML='\n\n<input id="purple" type="button" value="purple" onclick="changeColor(colorPurple);" />\n<input id="Green" type="button" value="Green" onclick="changeColor(colorGreen);" />\n<input id="Yellow" type="button" value="Yellow" onclick="changeColor(colorYellow);" />\n<input id="Brown" type="button" value="Brown" onclick="changeColor(colorBrown);" />\n<input id="Red" type="button" value="Red" onclick="changeColor(colorRed);" />\n<input id="Blue" type="button" value="Blue" onclick="changeColor(colorBlue);" />\n<input id="Orange" type="button" value="Orange" onclick="changeColor(colorOrange);" />\n<input id="White" type="button" value="White" onclick="changeColor(colorWhite);" />\n<input id="Black" type="button" value="Black" onclick="changeColor(colorBlack);" />\n<input id="Gray" type="button" value="Gray" onclick="changeColor(colorGray);" />\n\n\n';var f=document.getElementById("canvasContainer"),C=document.createElement("canvas");C.setAttribute("width",1e3),C.setAttribute("height",1e3),C.setAttribute("id","canvas"),f.appendChild(C),"undefined"!=typeof G_vmlCanvasManager&&(C=G_vmlCanvasManager.initElement(C));var v=C.getContext("2d");function b(e){g=e}function k(e){l.push(e),n[o]=l}function L(e,s){n[e]=s}function P(){socket.emit("drawing",o,l)}function h(e,s,r){if(a<=0)c=!1,d(T);else{var t={x:e,y:s,radius:a,dragging:r,clickColor:g};if(k(t),P(),r){var n=Math.abs(u-e),o=Math.abs(j-s),_=Math.pow(Math.pow(n,2)+Math.pow(o,2),.5);a-=i*_}u=e,j=s}}function J(){var e=Object.keys(n);(v=C.getContext("2d")).clearRect(0,0,v.canvas.width,v.canvas.height);for(var s=0;s<e.length;s+=1){var r=n[e[s]];v.lineJoin="round";for(var t=0;t<r.length;t+=1)v.beginPath(),r[t].dragging&&t?v.moveTo(r[t-1].x,r[t-1].y):v.moveTo(r[t].x,r[t].y),v.lineTo(r[t].x,r[t].y),v.closePath(),v.lineWidth=r[t].radius,v.strokeStyle=r[t].clickColor,v.stroke()}}b("#cb3594"),socket.on("connect",function(){}),socket.on("drawing",function(e,s){L(e,s),J()}),socket.on("disconnect",function(){}),socket.on("updateDrawings",function(e){n=e,J()}),_("#canvas").mousedown(function(e){var s;s=E()+E()+E()+E(),o=s;var r=e.pageX-(void 0).offsetLeft,t=e.pageY-(void 0).offsetTop;c=!0,h(r,t,!1),J()}),_("#canvas").mousemove(function(e){c&&(h(e.pageX-(void 0).offsetLeft,e.pageY-(void 0).offsetTop,!0),J())}),_("#canvas").mouseup(function(){c=!1,a=0,d(T)}),_("#canvas").mouseleave(function(){c=!1});"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(t,"initialRadius","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(i,"radiusFalloffModifier","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(n,"drawingObject","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(o,"currentKey","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(c,"paint","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(_,"$","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(a,"radius","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(u,"lastX","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(j,"lastY","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(l,"currentLine","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(m,"timerTemplate","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(p,"timerReady","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(T,"intialTimerValue","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(O,"timerRunning","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(R,"timer","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(D,"tools","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(1e3,"canvasWidth","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(1e3,"canvasHeight","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register("#cb3594","colorPurple","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register("#659b41","colorGreen","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register("#ffcf33","colorYellow","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register("#986928","colorBrown","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register("#ff0000","colorRed","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register("#0000ff","colorBlue","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register("#FFA500","colorOrange","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register("#ffffff","colorWhite","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register("#000000","colorBlack","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register("#D3D3D3","colorGray","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(g,"curColor","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(E,"randomLetter","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(A,"refreshInk","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(H,"updateTimer","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(d,"startTimer","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(f,"canvasDiv","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(C,"canvas","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(v,"context","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(b,"changeColor","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(k,"pushDrawing","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(L,"recieveDrawing","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(P,"emitDrawing","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(h,"addClick","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"),__REACT_HOT_LOADER__.register(J,"render","/Users/user/Documents/JS/HumanitiesProject/js/scripts.js"))},function(e,s,r){e.exports=r(0)}]);