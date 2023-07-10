export const checUserAccess=(authorizationUser:string,targetUser:string)=>{
    return authorizationUser==targetUser;
}