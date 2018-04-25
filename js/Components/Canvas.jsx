// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import {
  emitDrawing,
  openConnection,
  updateKey,
  updateTimer
} from '../SocketsIndex';
import {
  appendToCurrentLine,
  appendToEndOfLineWithKey,
  removeLineWithKey,
  setCurrentLine,
  setDrawingEnabled,
  setPainting,
  setRadius
} from '../actionCreators';

const canvasStyle = {
  touchAction: 'none',
  height: '800px',
  width: '800px'
};

type Props = {
  keyValue: string,
  brushColor: string,
  drawingEnabled: boolean,
  painting: boolean,
  radius: number,
  radiusModifier: number,
  currentLine: [Drawing],
  drawingObject: { string: [Drawing] },
  timerValue: number,
  handleAppendToEndOfKey: (string, Drawing | boolean) => void,
  handleCurrentLineSetState: mixed => void,
  handleCurrentLineStateChange: (Drawing | boolean) => void,
  handleDrawingStateChange: boolean => void,
  handleKeyRemoval: string => void,
  handlePaintingStateChange: boolean => void,
  handleRadiusStateChange: number => void
};
class Canvas extends Component<Props> {
  constructor(props) {
    super(props);
    // $FlowFixMe flow does not support this
    this.canvas = React.createRef();
    // $FlowFixMe flow does not support this
    this.mouseUp = this.mouseUp.bind(this);
    // $FlowFixMe flow does not support this
    this.mouseDown = this.mouseDown.bind(this);
    // $FlowFixMe flow does not support this
    this.mouseMove = this.mouseMove.bind(this);
    // $FlowFixMe flow does not support this
    this.mouseLeave = this.mouseLeave.bind(this);
    // $FlowFixMe flow does not support this
    this.touchStart = this.touchStart.bind(this);
    // $FlowFixMe flow does not support this
    this.touchMove = this.touchMove.bind(this);
    // $FlowFixMe flow does not support this
    this.touchStop = this.touchStop.bind(this);
  }

  componentDidMount() {
    updateKey();
    openConnection();
    // console.log(this.props);
    this.drawToCanvas();
  }

  componentDidUpdate() {
    // console.log('updated');
    // console.log(this.props);
    this.drawToCanvas();
  }

  brushReset() {
    this.appendStopCode();
    this.props.handlePaintingStateChange(false);
    this.props.handleDrawingStateChange(false);
    this.props.handleRadiusStateChange(15);
    this.props.handleCurrentLineSetState([]);
    if (this.props.timerValue === 0) {
      updateKey();
      updateTimer(5);
    }
  }

  removeKeys(keys) {
    for (let i = 0; i < keys.length; i += 1) {
      this.props.handleKeyRemoval(keys[i]);
    }
  }

  appendStopCode() {
    this.pushDrawing(false);
  }

  addDrawing(x, y, dragging) {
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

      if (this.props.currentLine.length > 0) {
        const currentLineLength = this.props.currentLine.length;
        const displaceX = Math.abs(
          // $FlowFixMe this can never be false
          this.props.currentLine[currentLineLength - 1].x - x
        );
        const displaceY = Math.abs(
          // $FlowFixMe this can never be false
          this.props.currentLine[currentLineLength - 1].y - y
        );
        const displacement = (displaceX ** 2 + displaceY ** 2) ** (1 / 2);

        const newRadius =
          this.props.radius - this.props.radiusModifier * displacement;
        this.props.handleRadiusStateChange(newRadius);
      }
      this.pushDrawing(drawing);
    }
  }

  drawThisArray(array) {
    // $FlowFixMe flow does not support this
    const context = this.canvas.current.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';

    for (let i = 0; i < array.length; i += 1) {
      if (array[i]) {
        context.beginPath();

        if (array[i].dragging && i) {
          // $FlowFixMe this is already checked for
          context.moveTo(array[i - 1].x, array[i - 1].y);
        } else {
          // $FlowFixMe this is already checked for
          context.moveTo(array[i].x, array[i].y);
        }

        // $FlowFixMe this is already checked for
        context.lineTo(array[i].x, array[i].y);
        context.closePath();
        // $FlowFixMe this is already checked for
        context.lineWidth = array[i].radius;
        // $FlowFixMe this is already checked for
        context.strokeStyle = array[i].color;
        context.stroke();
      }
    }
  }

  drawToCanvas() {
    if (
      this.props.drawingObject === undefined ||
      this.props.drawingObject === null ||
      this.props.drawingObject === {}
    ) {
      return;
    }
    const keys = Object.keys(this.props.drawingObject);
    const drawingsObject = this.props.drawingObject;

    const removable = [];
    // pull up the line array by line
    for (let i = 0; i < keys.length; i += 1) {
      const drawingArray = drawingsObject[keys[i]];
      if (!drawingArray[drawingArray.length - 1]) {
        removable.push(keys[i]);
      }
      // then draws it
      this.drawThisArray(drawingArray);
    }

    this.removeKeys(removable);
  }

  pushDrawing(drawing) {
    this.props.handleCurrentLineStateChange(drawing);
    this.props.handleAppendToEndOfKey(this.props.keyValue, drawing);

    emitDrawing(this.props.keyValue, drawing);
  }

  passDrawingData(e, dragging) {
    // $FlowFixMe flow does not support this
    const rect = this.canvas.current.getBoundingClientRect();
    // $FlowFixMe flow does not support this
    const x = e.pageX - rect.x;

    // $FlowFixMe flow does not support this
    const y = e.pageY - rect.y;
    this.addDrawing(x, y, dragging);
  }

  mouseDown(e) {
    if (this.props.drawingEnabled) {
      this.props.handlePaintingStateChange(true);

      this.passDrawingData(e, false);
    }
  }
  mouseUp(e) {
    if (this.props.painting) {
      this.passDrawingData(e, true);
      this.brushReset();
    }
  }
  mouseMove(e) {
    if (this.props.painting) {
      this.passDrawingData(e, true);
    }
  }
  mouseLeave() {
    if (this.props.painting) {
      this.brushReset();
    }
  }

  touchStart(e) {
    if (this.props.drawingEnabled) {
      this.props.handlePaintingStateChange(true);

      this.passDrawingData(e.touches[0], false);
    }
  }

  touchMove(e) {
    if (this.props.painting) {
      this.passDrawingData(e.touches[0], true);
    }
  }

  touchStop() {
    this.brushReset();
  }

  render() {
    return (
      <div id="grid" className="canvasGrid">
        <Paper className="paperStyle" zDepth={5}>
          <canvas
            id="Canvas"
            style={canvasStyle}
            height={canvasStyle.height}
            width={canvasStyle.width}
            onMouseDown={this.mouseDown}
            onMouseMove={this.mouseMove}
            onMouseUp={this.mouseUp}
            onMouseLeave={this.mouseLeave}
            onTouchStart={this.touchStart}
            onTouchMove={this.touchMove}
            onTouchEnd={this.touchStop}
            // $FlowFixMe flow does not support this
            ref={this.canvas}
          />
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: ({}) => void) => ({
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
  handleAppendToEndOfKey(key, value) {
    dispatch(appendToEndOfLineWithKey(key, value));
  },
  handleKeyRemoval(key) {
    dispatch(removeLineWithKey(key));
  }
});

const mapStateToProps = (state: Props) => ({
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
