
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
   
    <div className="  w-full bg-gradient-to-b from-[#0a1e4d] to-[#1e0a8a] text-white py-3 px-4 shadow-inner flex items-center justify-between">
      <div className="flex">
        <img src="/surgery-logo.png" className="w-7" />
        <h1 className="text-2xl font-bold  ml-2">Surgery Status Board</h1>
      </div>

      <nav>
        <ul className="flex space-x-4 ">
          <li>Patient info</li>
          <li>Surgeon info</li>
          <li>Update</li>
        </ul>
      </nav>
       <div className=" ml-4">{currentDate}</div>
    </div>
    // </header>
   
  );
};

   export default Header
