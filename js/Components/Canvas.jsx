import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import {
  updateKey,
  updateTimer,
  emitDrawing,
  openConnection
} from '../SocketsIndex';
import {
  setDrawingEnabled,
  setPainting,
  setRadius,
  appendToCurrentLine,
  setCurrentLine,
  appendToDrawingObject
} from '../actionCreators';

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
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  componentDidMount() {
    updateKey();
    openConnection();
    console.log(this.props);
    this.drawToCanvas();
  }

  componentDidUpdate() {
    console.log('updated');
    console.log(this.props);
    this.drawToCanvas();
  }

  /*
  TODO:
  Figure out why there is an Or statement in the code given by react-paint
  put a draw function in and somehow make it make sense within this context
  */
  /* eslint-disable */
  brushReset() {
    this.props.handlePaintingStateChange(false);
    this.props.handleDrawingStateChange(false);
    this.props.handleRadiusStateChange(15);

    this.props.handleCurrentLineSetState([]);
    // look into drawingEnabled check
    if (this.props.timerValue === 0) {
      updateKey();
      updateTimer(15);
    }
  }
  /* eslint-enabled */

  addDrawing(x, y, dragging) {
    /* eslint-disable */
    if (this.props.radius <= 1) {
      this.brushReset();
    } else {
      const drawing = {
        x,
        y,
        dragging,
        radius: this.props.radius,
        color: this.props.brushColor
      };
      this.pushDrawing(drawing);
      if (this.props.currentLine.length != 0) {
        emitDrawing(this.props.keyValue, this.props.currentLine);
      }
      if (dragging) {
        const displaceX = Math.abs(this.state.lastX - x);
        const displaceY = Math.abs(this.state.lastY - y);
        const displacement = (displaceX ** 2 + displaceY ** 2) ** (1 / 2);

        const newRadius =
          this.props.radius - this.props.radiusModifier * displacement;
        this.props.handleRadiusStateChange(newRadius);
        this.setState({
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

  // TODO: refactor this to share a function with draw

  drawDiff() {
    const drawingArray = this.props.currentLine;
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
        context.strokeStyle = drawingArray[i].color;
        context.stroke();
      }
    }
  }

  drawToCanvas() {
    if (
      this.props.drawingObject === undefined ||
      this.props.drawingObject === null
    ) {
      return;
    }
    const keys = Object.keys(this.props.drawingObject);
    const drawingsObject = this.props.drawingObject;

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
        context.strokeStyle = drawingArray[i].color;
        context.stroke();
      }
    }
  }

  pushDrawing(drawing) {
    this.props.handleCurrentLineStateChange(drawing);
    this.props.handleAppendDrawingObject(
      this.props.keyValue,
      this.props.currentLine
    );
  }

  passDrawingData(e, dragging) {
    const x = e.pageX - this.canvas.current.offsetLeft;
    const y = e.pageY - this.canvas.current.offsetTop;
    this.addDrawing(x, y, dragging);
  }

  mouseUp(e) {
    console.log('mouseUP'); // eslint-disable-line

    this.passDrawingData(e, true);
    this.brushReset();
  }

  mouseDown(e) {
    console.log('mouseDown'); // eslint-disable-line
    if (this.props.drawingEnabled) {
      this.props.handlePaintingStateChange(true); // eslint-disable-line

      this.passDrawingData(e, false);
    }
  }

  mouseMove(e) {
    /* eslint-disable */
    if (this.props.painting) {
      /* eslint-enabled */
      this.passDrawingData(e, true);
    }
  }

  mouseLeave() {
    if (this.props.painting) {
      this.brushReset();
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

const mapDispatchToProps = dispatch => ({
  handleDrawingStateChange(value) {
    dispatch(setDrawingEnabled(value));
  },
  handlePaintingStateChange(value) {
    dispatch(setPainting(value));
  },
  handleRadiusStateChange(value) {
    dispatch(setRadius(value));
  },
  handleCurrentLineStateChange(value) {
    dispatch(appendToCurrentLine(value));
  },
  handleCurrentLineSetState(value) {
    dispatch(setCurrentLine(value));
  },
  handleAppendDrawingObject(key, value) {
    dispatch(appendToDrawingObject(key, value));
  }
});

const mapStateToProps = state => ({
  keyValue: state.keyValue,
  brushColor: state.brushColor,
  drawingEnabled: state.drawingEnabled,
  painting: state.painting,
  radius: state.radius,
  radiusModifier: state.radiusModifier,
  currentLine: state.currentLine,
  drawingObject: state.drawingObject,
  timerValue: state.timerValue
});

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
