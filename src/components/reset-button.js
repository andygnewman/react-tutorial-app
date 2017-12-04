import React from 'react';

function ResetButton(props) {
  if (props.step !== props.steps) {
    const reset = `Reset game to this step (${props.step})`;

    return (
      <button onClick={props.onClick}>
        {reset}
      </button>
    );
  }
  return null;
}

export default ResetButton;
