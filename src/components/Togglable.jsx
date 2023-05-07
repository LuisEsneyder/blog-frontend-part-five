import { useState, forwardRef, useImperativeHandle } from "react";
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const togglableVisible = () => {
    setVisible(!visible);
  };
  useImperativeHandle(refs, () => {
    return {
      togglableVisible,
    };
  });
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={togglableVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={togglableVisible}>cancel</button>
      </div>
    </div>
  );
});
export default Togglable;
