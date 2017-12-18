// * Calling the card callbacks dozens of times per second has the potential to be a drag on
// * performance, and for this reason we need a throttling function. A throttling function receives
// * two parameters, the original function you want to have throttled and wait. It returns a throttled version of
// * the passed function that, when invoked repeatedly, will only actually call the original function at most once
// * per every wait milliseconds. This throttling function is also smart enough to invoke the
// * original function immediately if the calling arguments change.

export const throttle = (func, wait) => {
  let context;
  let args;
  let prevArgs;
  let argsChanged;
  let result;
  let previous = 0;

  return function throttleHandler() {
    let now;
    let remaining;

    if (wait) {
      now = Date.now();
      remaining = wait - (now - previous);
    }
    context = this;
    args = arguments;
    argsChanged = JSON.stringify(args) !== JSON.stringify(prevArgs);
    prevArgs = { ...args };
    if (argsChanged || (wait && (remaining <= 0 || remaining > wait))) {
      if (wait) {
        previous = now;
      }
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};
