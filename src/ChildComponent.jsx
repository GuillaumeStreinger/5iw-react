import React, { forwardRef, useImperativeHandle } from 'react';

const ChildComponent = forwardRef((props, ref) => {
  const { sendDataToParent } = props;
  
  const sendData = () => {
    sendDataToParent('Bonjour Enfant!');
  };

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      alert('Input depuis Enfant!');
    }
  }));

  return (
    <div>
      <button onClick={sendData}>Send Data to Parent</button>
    </div>
  );
});

export default ChildComponent;
