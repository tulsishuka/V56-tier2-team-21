
  import { useState, useEffect } from "react";

export default function Header() {
    const [currentDate, setCurrentDate] = useState("");

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
    <header className="bg-[#0a1e4d] text-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo / App Name */}
      <div className="text-2xl font-bold tracking-wide">
        🏥 Surgery Status Board
      </div>

      {/* Navigation */}
      <nav className="space-x-6 text-sm font-medium hidden md:flex">
        <a href="#" className="hover:text-blue-300 transition">Home</a>
        <a href="#" className="hover:text-blue-300 transition">Patient Info</a>
        <a href="#" className="hover:text-blue-300 transition">Surgical Team</a>
        <a href="#" className="hover:text-blue-300 transition">Admin Panel</a>
      </nav>

      {/* Mobile Menu Placeholder (optional) */}
      <div className="">
       📅 {currentDate}
      </div>
    </header>
  );
}
