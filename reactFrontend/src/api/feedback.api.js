import axiosInstance from "../utils/axiosInstance"

export const randomFeedbacks = async()=>{
    return await axiosInstance.get("/feedback")
}

export const addFeedback = async(data)=>{
    return await axiosInstance.post("/feedback",data)
}

export const feedbackPagination = async(page , limit)=>{
    return await axiosInstance.get(`/allFeedback?page=${page}&limit=${limit}`)
}