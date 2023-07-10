import { NextFunction, Response, Request } from "express"

export const validate = (validator: any, mode: any) => {
    
    return (req: Request, res: Response, next: NextFunction) => {
       try {
           const { error } = validator(req.body, mode)
         
           if (error) {
               return res.status(400).send(error.details[0].message)
           }
       } catch (error) {
           console.log(`Errors : ${error}`.bgRed)

       }
        next();
    }

}