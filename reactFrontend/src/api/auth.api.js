import axiosInstance from "../utils/axiosInstance"

export const login = async(email , password)=>{
    return await axiosInstance.post("/admin/login",{email , password}, {withCredentials:true})
}

export const getMe = async()=>{
    return await axiosInstance.get("/admin/me" , {withCredentials:true})
}

export const logout = async()=>{
    return await axiosInstance.get("/admin/logout", {withCredentials:true})
}