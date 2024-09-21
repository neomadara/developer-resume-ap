import {AnyZodObject} from "zod";
import {Request, Response, NextFunction} from "express";

const validate =
  (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync({
          params: req.params,
          body: req.body
        });
        return next();
      } catch (error: any) {
        return res.status(409).json(error);
      }
    };


export default validate
