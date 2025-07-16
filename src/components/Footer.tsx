
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className=" bottom-0 w-full bg-gradient-to-b from-[#0a1e4d] to-[#1e0a8a] text-white px-5 py-4 ">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-sm ">
         <div className=" ">
          <a href="https://github.com/chingu-voyages/V56-tier2-team-21" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 font-bold  ">
             <FaGithub className="inline mr-1 " />Github Repo
          </a>
        </div>

    
        <div className="flex flex-wrap items-center gap-2">
          <span>Created by</span>
          <a href="https://github.com/elva329" className="text-white hover:text-blue-300 " target="_blank" rel="noopener noreferrer">@elva329</a>
          <a href="https://github.com/tulsi" className="text-white hover:text-blue-300 " target="_blank" rel="noopener noreferrer">@Tulsi</a>
          <a href="https://github.com/apoorva" className="text-white hover:text-blue-300 " target="_blank" rel="noopener noreferrer">@Amaljith</a>
                    <a href="https://github.com/satyam" className="text-white hover:text-blue-300 " target="_blank" rel="noopener noreferrer">Satyam Balaiwar</a>
        </div>     
      </div>
    </footer>
  );
};

export default Footer;
