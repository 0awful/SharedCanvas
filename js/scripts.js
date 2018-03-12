console.log('Scripts loaded');

let tools = document.getElementById('tools');
tools.innerHTML = `

<p> red </p>
<p> blue </p>
<p> yellow </p>
<p> green </p>
<p> purple </p>
<p> orange </p>
<p> pink </p>
<p> teal </p>
<p> white </p>
<p> black </p>
`;

var canvas = document.getElementById('canvas');
var canvasContainer = document.getElementById('canvasContainer');
window.onload = window.onresize = function() {
  canvas.width = canvasContainer.innerWidth;
  canvas.height = canvasContainer.innerHeight;
};

console.log(canvas);
