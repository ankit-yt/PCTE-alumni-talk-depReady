import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../studentPanel component/home/Footer'
import { setScreenWidth } from '../redux/slices/uiSlice';

function StudentPanel() {
  const dispatch = useDispatch();
   useEffect(() => {
      const handleResize = () => {
        dispatch(setScreenWidth(window.innerWidth));
      };
  
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [dispatch]);
  return (
   <div>
    
   <Outlet/>
   
  <Footer/>
   </div>
  )
}

export default StudentPanel
