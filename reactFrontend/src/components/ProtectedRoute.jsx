import React, { useEffect, useState } from 'react'
import { getMe } from '../api/auth.api'
import { toast } from 'sonner'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const verifyUser = async()=>{
            try{
                setLoading(true)
                const res = await getMe();
            if(res.status === 200){
                setTimeout(()=>{
                    setIsAuthorized(true)
                },2000)
            }
            }catch(err){
                toast.error("Unauthorized Access")
                console.log(err.message)
                setIsAuthorized(false)
            }finally{
                setLoading(false)
            }
        }
        verifyUser()
    },[])
    if(isAuthorized === null){
        return <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-600'></div>
        </div>
    }
  return (
    isAuthorized ? children : <Navigate to={"/auth"} replace/>
  )
}

export default ProtectedRoute
