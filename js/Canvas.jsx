import React, { Component } from "react";
import Paper from "material-ui/Paper";

const paperStyle = {
  height: "1000px",
  width: "1000px",
  gridRowStart: 2,
  gridColumnStart: 2
};

const gridStyle = {
  display: "grid",
  width: "100%",
  height: "100%",
  marginTop: "5%",
  marginBottom: "5%",
  gridTemplateColumns: "auto 1000px auto",
  gridTemplateRows: "minmax(5%, 10%) 1000px minmax(5%, 10%)"
};

const canvasStyle = {
  height: "1000px",
  width: "1000px"
};

function randomLetter() {
  let letter = "";
  switch (Math.floor(Math.random() * 26)) {
    case 0:
      letter = "a";
      break;
    case 1:
      letter = "b";
      break;
    case 2:
      letter = "c";
      break;
    case 3:
      letter = "d";
      break;
    case 4:
      letter = "e";
      break;
    case 5:
      letter = "f";
      break;
    case 6:
      letter = "g";
      break;
    case 7:
      letter = "h";
      break;
    case 8:
      letter = "i";
      break;
    case 9:
      letter = "j";
      break;
    case 10:
      letter = "k";
      break;
    case 11:
      letter = "l";
      break;
    case 12:
      letter = "m";
      break;
    case 13:
      letter = "n";
      break;
    case 14:
      letter = "o";
      break;
    case 15:
      letter = "p";
      break;
    case 16:
      letter = "q";
      break;
    case 17:
      letter = "r";
      break;
    case 18:
      letter = "s";
      break;
    case 19:
      letter = "t";
      break;
    case 20:
      letter = "u";
      break;
    case 21:
      letter = "v";
      break;
    case 22:
      letter = "w";
      break;
    case 23:
      letter = "x";
      break;
    case 24:
      letter = "y";
      break;
    case 25:
      letter = "z";
      break;
    default:
      break;
  }
  if (Math.floor(Math.random() * 2)) {
    return letter.toUpperCase();
  }
  return letter;
}

function randomKey() {
  const key =
    randomLetter() +
    randomLetter() +
    randomLetter() +
    randomLetter() +
    randomLetter() +
    randomLetter();

  return key;
}

/* TODO:
  Instate a timer
  move to redux
  handle performance problems
  fix weird render bug where occasionally the end of lines when the line ends with a small radius, will not render
*/

class Canvas extends Component {
  constructor(...props) {
    super(...props);
    this.canvas = React.createRef();
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  state = {
    key: randomKey(),
    mousePressed: false,
    paint: false,
    radius: 15,
    curColor: "#000000",
    radiusFalloffModifier: 0.02,
    currentLine: [],
    drawingsObject: {}
  };

  componentDidMount() {
    this.drawToCanvas();
  }

  componentDidUpdate() {
    this.drawToCanvas();
  }

  /*
  TODO:
  Figure out why there is an Or statement in the code given by react-paint
  put a draw function in and somehow make it make sense within this context
  */

  addDrawing(x, y, dragging) {
    if (this.state.radius <= 0) {
      this.setState({ paint: false });
      // startTimer(intialTimerValue);
    } else {
      const drawing = {
        x,
        y,
        radius: this.state.radius,
        dragging,
        clickColor: this.state.curColor
      };
      this.pushDrawing(drawing);
      //     emitDrawing(drawing);
      if (dragging) {
        const displaceX = Math.abs(this.state.lastX - x);
        const displaceY = Math.abs(this.state.lastY - y);
        const displacement = (displaceX ** 2 + displaceY ** 2) ** (1 / 2);

        const newRadius =
          this.state.radius - this.state.radiusFalloffModifier * displacement;
        this.setState({
          radius: newRadius,
          lastX: x,
          lastY: y
        });
      } else {
        this.setState({
          lastX: x,
          lastY: y
        });
      }
    }
  }

  drawToCanvas() {
    if (
      this.state.drawingObject === undefined ||
      this.state.drawingObject === null
    ) {
      return;
    }
    const keys = Object.keys(this.state.drawingObject);
    const drawingsObject = this.state.drawingObject;

    const context = this.canvas.current.getContext("2d");

    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    // pull up the line array by line
    for (let j = 0; j < keys.length; j += 1) {
      const drawingArray = drawingsObject[keys[j]];

      context.lineJoin = "round";

      for (let i = 0; i < drawingArray.length; i += 1) {
        context.beginPath();
        if (drawingArray[i].dragging && i) {
          context.moveTo(drawingArray[i - 1].x, drawingArray[i - 1].y);
        } else {
          context.moveTo(drawingArray[i].x, drawingArray[i].y);
        }

        context.lineTo(drawingArray[i].x, drawingArray[i].y);
        context.closePath();
        context.lineWidth = drawingArray[i].radius;
        context.strokeStyle = drawingArray[i].clickColor;
        context.stroke();
      }
    }
  }

  pushDrawing(drawing) {
    const key = this.state.key;
    const currentLine = this.state.currentLine;
    const newDrawingObject = Object.assign({}, this.state.drawingObject);
    newDrawingObject[key] = currentLine;
    this.setState(prevState => ({
      currentLine: [...prevState.currentLine, drawing],
      drawingObject: newDrawingObject
    }));
  }

  passDrawingData(e, dragging) {
    const x = e.pageX - this.canvas.current.offsetLeft;
    const y = e.pageY - this.canvas.current.offsetTop;
    this.addDrawing(x, y, dragging);
  }

  mouseUp(e) {
    this.setState({ radius: 15, mousePressed: false });
    this.passDrawingData(e, true);
  }

  mouseDown(e) {
    this.setState({ mousePressed: true, key: randomKey() });
    this.passDrawingData(e, false);
  }

  mouseMove(e) {
    if (this.state.mousePressed) {
      this.passDrawingData(e, true);
    }
  }

  mouseLeave() {
    if (this.state.mousePressed) {
      this.setState({ mousePressed: false });
    }
  }
  render() {
    return (
      <div id="grid" style={gridStyle}>
        <Paper style={paperStyle} zDepth={5}>
          <canvas
            id="Canvas"
            style={canvasStyle}
            height={canvasStyle.height}
            width={canvasStyle.width}
            onMouseDown={this.mouseDown}
            onTouchStart={this.mouseDown}
            onMouseMove={this.mouseMove}
            onTouchMove={this.mouseMove}
            onMouseUp={this.mouseUp}
            onTouchEnd={this.mouseUp}
            onMouseLeave={this.mouseLeave}
            ref={this.canvas}
          />
        </Paper>
      </div>
    );
  }
}

export default Canvas;
