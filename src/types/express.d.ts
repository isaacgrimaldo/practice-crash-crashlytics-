// express.d.ts
// eslint-disable-next-line no-unused-vars
import { Request } from "express";

declare module "express-serve-static-core" {
  // eslint-disable-next-line no-unused-vars
  interface Request {
    log: {
      // eslint-disable-next-line no-unused-vars
      info: (data: string | object, message?: string) => void;
    };
    id: string;
  }
}
