import { useNavigate, useLocation } from 'react-router-dom';

import { useState, useEffect } from "react";
const Header = () => {
  const [currentDate, setCurrentDate] = useState<string>("");

 useEffect(() => {
    const today = new Date();
    const dateString = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(dateString);
  }, []);


  return (
    <div className='flex items-center justify-center mt-5 gap-10'>
      <img src='/surgery-logo.png' className='' />
      <div className='font-bold text-4xl'>Surgery Status Boargitd</div>
    </div>
    // </header>
   
  );
};

   export default Header
