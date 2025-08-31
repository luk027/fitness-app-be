const getTime = () => new Date().toLocaleString();

const log = {
  info: (message: string, ...optionalParams: unknown[]) => {
    console.log(`\x1b[36m[INFO] [${getTime()}]\x1b[0m`, message, ...optionalParams);
  },

  success: (message: string, ...optionalParams: unknown[]) => {
    console.log(`\x1b[32m[SUCCESS] [${getTime()}]\x1b[0m`, message, ...optionalParams);
  },

  warn: (message: string, ...optionalParams: unknown[]) => {
    console.warn(`\x1b[33m[WARN] [${getTime()}]\x1b[0m`, message, ...optionalParams);
  },

  error: (message: string, ...optionalParams: unknown[]) => {
    console.error(`\x1b[31m[ERROR] [${getTime()}]\x1b[0m`, message, ...optionalParams);
  },

  debug: (message: string, ...optionalParams: unknown[]) => {
    if (process.env.NODE_ENV === "DEVELOPMENT") {
      console.debug(`\x1b[35m[DEBUG] [${getTime()}]\x1b[0m`, message, ...optionalParams);
    }
  }
};

export default log;