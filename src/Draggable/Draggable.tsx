import React, { useEffect, useRef, useState } from "react";
import "./draggable.css";

type WrapperStyle = {
  position?: string;
  left?: string;
  top?: string;
  border?: string;
  width?: string;
  height?: string;
};

type Dimension = { width: string | number; height: string | number };

type Props = {
  renderToParent: boolean;
  dimension: Dimension;
  components: Array<{
    isHandle: boolean;
    child: JSX.Element;
  }>;
};

export const Draggable: React.FunctionComponent<Props> = (props: Props) => {
  const divRef: React.RefObject<HTMLDivElement> = useRef(null);
  const [renderToParent, setRenderToParent] = useState<boolean>(
    props.renderToParent
  );
  const [relativePos, setRelativePos] = useState<{ x: number; y: number }>({
    x: 10,
    y: 10
  });
  const [dimension, setDimension] = useState<Dimension>({
    width: `${props.dimension.width}px`,
    height: `${props.dimension.height}px`
  });

  const wrapperStyle: WrapperStyle = {
    position: "absolute",
    left: relativePos.x + "px",
    top: relativePos.y + "px",
    border: "2px solid red"
  };

  const onMouseDown = (event) => {
    let prevX = event.clientX;
    let prevY = event.clientY;

    const mouseMove = (moveEvent) => {
      const { left, top } = divRef.current.getBoundingClientRect();
      const newX = prevX - moveEvent.clientX;
      const newY = prevY - moveEvent.clientY;

      prevX = moveEvent.clientX;
      prevY = moveEvent.clientY;

      setRelativePos({ x: left - newX, y: top - newY });
    };

    const mouseUp = () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const renderChildComponents = ({ components = [] }) => {
    return components.map(({ isHandle, child }) => {
      const draggableClass =
        !renderToParent && isHandle
          ? "dxc-draggable-handle"
          : "dxc-draggable-static";
      const onMouseDownHandle = (event) => {
        if (!isHandle) {
          event.stopPropagation();
        }
      };
      return (
        <div className={draggableClass} onMouseDown={onMouseDownHandle}>
          {child}
        </div>
      );
    });
  };

  const updateWrapperStyle = (newStyle: WrapperStyle) => {
    Object.keys(newStyle).forEach((key) => (wrapperStyle[key] = newStyle[key]));
  };

  useEffect(() => {
    const { width = 0, height = 0 } = props.dimension;
    setDimension(() => ({
      width: width && !props.renderToParent ? `${width}px` : "100%",
      height: height && !props.renderToParent ? `${height}px` : "100%"
    }));
    setRenderToParent(props.renderToParent);
  }, [props.dimension, props.renderToParent]);

  updateWrapperStyle({
    width: dimension.width as string,
    height: dimension.height as string,
    position: renderToParent ? "sticky" : "absolute"
  });

  return (
    <div
      className="dxc-draggable-wrapper"
      ref={divRef}
      onMouseDown={onMouseDown}
      style={{ ...wrapperStyle }}
    >
      {renderChildComponents(props)}
    </div>
  );
};
