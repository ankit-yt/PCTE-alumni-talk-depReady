export const cookieOptions = {
    httpOnly :true,
    secure:false,
    sameSite:"lax" as const,
    maxAge:24*60*60*1000
}