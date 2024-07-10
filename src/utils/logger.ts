const info = (...params: string[]) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params: string[]) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};

const logger = {
  info,
  error,
};

export default logger;
