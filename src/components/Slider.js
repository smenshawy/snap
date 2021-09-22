import React, { useState, useRef, useCallback } from "react";
import { Track, Thumb } from "../styles";

const trackWidth = 500;
const thumbWidth = 25;

// Both initialValue Slider receives and  value it passes onChange are between 0-1
const Slider = ({ initialValue, onChange }) => {
  const [thumb, setThumb] = useState({
    isPressed: false,
    isPressedAt: 0,
    left: initialValue * trackWidth,
  });
  const { isPressed, left } = thumb;

  const mouseDownHandler = (event) => {
    setThumb((prevThumb) => ({
      ...prevThumb,
      isPressed: true,
      isPressedAt: event.screenX,
    }));
  };

  const mouseMoveHandler = (event) => {
    if (isPressed) {
      // If the thumb reached the beginning of the track
      if (left < 0) {
        setThumb({ isPressed: false, isPressedAt: 0, left: 0, offset: 0 });
        onChange(0);
        return;
      }

      // If the thumb reached the end of the track
      if (left > trackWidth) {
        setThumb({
          isPressed: false,
          isPressedAt: 0,
          left: trackWidth,
        });
        onChange(trackWidth / trackWidth);
        return;
      }

      setThumb((prevThumb) => ({
        ...prevThumb,
        isPressedAt: event.screenX,
        left: prevThumb.left + event.screenX - prevThumb.isPressedAt,
      }));
    }
  };

  const stopSliding = () => {
    setThumb((prevThumb) => ({
      ...prevThumb,
      isPressed: false,
      isPressedAt: 0,
    }));
    onChange(left / trackWidth);
  };

  return (
    <Track trackWidth={trackWidth}>
      <Thumb
        thumbWidth={thumbWidth}
        left={left}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={stopSliding}
        onMouseLeave={stopSliding}
      ></Thumb>
    </Track>
  );
};

export default Slider;
