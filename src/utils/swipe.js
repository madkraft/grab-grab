const pStart = { x: 0, y: 0 };
const pStop = { x: 0, y: 0 };

export const swipeStart = (e) => {
  if (typeof e["targetTouches"] !== "undefined") {
    const touch = e.targetTouches[0];
    pStart.x = touch.screenX;
    pStart.y = touch.screenY;
  } else {
    pStart.x = e.screenX;
    pStart.y = e.screenY;
  }
};

const isPullDown = (dY, dX) => {
  // methods of checking slope, length, direction of line created by swipe action
  return dY < 0 && ((Math.abs(dX) <= 100 && Math.abs(dY) >= 200) || (Math.abs(dX) / Math.abs(dY) <= 0.3 && dY >= 60));
};

const swipeCheck = (callBack) => {
  const changeY = pStart.y - pStop.y;
  const changeX = pStart.x - pStop.x;

  if (isPullDown(changeY, changeX)) {
    callBack();
  }
};

export const swipeEnd = (callBack) => (e) => {
  if (typeof e["changedTouches"] !== "undefined") {
    const touch = e.changedTouches[0];
    pStop.x = touch.screenX;
    pStop.y = touch.screenY;
  } else {
    pStop.x = e.screenX;
    pStop.y = e.screenY;
  }

  swipeCheck(callBack);
};
