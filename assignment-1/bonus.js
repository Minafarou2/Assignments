/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
const createCounter = (init = 0) => {
  if (init < -1000 || init > 1000) {
    throw new Error("Initial value must be between -1000 and 1000");
  }

  let currentCount = init;
  let calls = 0;

  const checkLimit = () => {
    if (calls >= 1000) {
      throw new Error("Calls limit exceeded");
    }
  };

  return {
    increment: () => {
      checkLimit();
      console.log("Increment called with " + calls + " calls");
      calls++;
      return ++currentCount;
    },
    decrement: () => {
      checkLimit();
      console.log("Decrement called with " + calls + " calls");
      calls++;
      return --currentCount;
    },
    reset: () => {
      checkLimit();
      console.log("Reset called with " + calls + " calls");
      calls++;
      return (currentCount = init);
    },
  };
};

const counter = createCounter(5);

console.log(counter.increment());
console.log(counter.reset());
console.log(counter.decrement());
