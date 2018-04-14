// @flow

import React from "react";

const toolsStyle = {
  display: "grid",
  gridColumnStart: "repeat(3, 1fr)"
};

const Tools = () => (
  <div style={toolsStyle}>
    <p style={{ gridColumnStart: 1 }}>SomeTool</p>
    <p style={{ gridColumnStart: 2 }}>AnotherTool</p>
    <p style={{ gridColumnStart: 3 }}>ThirdTool</p>
  </div>
);

export default Tools;
