import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { CustomError } from '../Custom/CustomError';
import { IUser, User } from '../models/user.model';
export interface AuthenticatedRequest extends Request {
    user?: IUser | any,

}

export const Authentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token=req.headers['authorization']?.trim();
    if(!token){
        const error=new CustomError( 'unauthorized Person',401)
        next(error);
    }else{
        

                    const { id }: string | any = jwt.verify(token, process.env.JWT_SECRET!)
                    const user = await User.findById(id);
                    if (!user) {
                        return res.status(401).send({ error_en: "Invalid Token", error_ar: 'رمز مميز غير صالح' })
                    }
                    else {
            
                        (req as AuthenticatedRequest).user = user
                        next()
                    }
            
    }
    
    
}


