import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import randomKey from '../keygen';

const paperStyle = {
  height: '1000px',
  width: '1000px',
  gridRowStart: 2,
  gridColumnStart: 2
};

const gridStyle = {
  display: 'grid',
  width: '100%',
  height: '100%',
  marginTop: '5%',
  marginBottom: '5%',
  gridTemplateColumns: 'auto 1000px auto',
  gridTemplateRows: 'minmax(5%, 10%) 1000px minmax(5%, 10%)'
};

const canvasStyle = {
  height: '1000px',
  width: '1000px'
};

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
    paint: false,
    radius: 15,
    curColor: '#000000',
    radiusFalloffModifier: 0.02,
    currentLine: [],
    drawingsObject: {}
  };

  componentDidMount() {
    this.drawToCanvas();
  }

  componentDidUpdate() {
    console.log('updating'); // eslint-disable-line

    this.drawDiff();
  }

  /*
  TODO:
  Figure out why there is an Or statement in the code given by react-paint
  put a draw function in and somehow make it make sense within this context
  */

  addDrawing(x, y, dragging) {
    if (this.state.radius <= 1) {
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

  drawDiff() {
    const drawingArray = this.state.currentLine;
    const context = this.canvas.current.getContext('2d');
    for (let j = 0; j < drawingArray.length; j += 1) {
      context.lineJoin = 'round';

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

  drawToCanvas() {
    if (
      this.state.drawingObject === undefined ||
      this.state.drawingObject === null
    ) {
      return;
    }
    const keys = Object.keys(this.state.drawingObject);
    const drawingsObject = this.state.drawingObject;

    const context = this.canvas.current.getContext('2d');

    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    // pull up the line array by line
    for (let j = 0; j < keys.length; j += 1) {
      const drawingArray = drawingsObject[keys[j]];

      context.lineJoin = 'round';

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
    console.log('mouseUP'); // eslint-disable-line

    this.passDrawingData(e, true);
    this.setState({ radius: 15, paint: false });
  }

  mouseDown(e) {
    console.log('mouseDown'); // eslint-disable-line

    this.setState({ paint: true, key: randomKey() });
    this.passDrawingData(e, false);
  }

  /* eslint-disable */
  mouseMove(e) {
    if (this.state.paint) {
      this.passDrawingData(e, true);
    }
  }

  mouseLeave() {
    if (this.state.paint) {
      this.setState({ paint: false });
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
