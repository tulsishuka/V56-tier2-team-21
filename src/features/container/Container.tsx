import { Link } from "react-router-dom";
const Container = () => {
  return (

  <div className="flex  flex-col md:flex-row items-center justify-around p-8 bg-gradient-to-b from-[#0a1e4d] to-[#1e0a8a] text-white min-h-screen">

  <div className=" md:w-1/2 mb-8 mb:mb-0 text-center md:text-left ">
    <h1 className="font-bold text-4xl  ">Welcome </h1>
    <h4 className="font-bold text-3xl mb-6 my-2">Surgery Status Board</h4>
    <p className="text-[#e2e8f0] mb-6 max-w-xl italic">“Surgery Status Board helps hospitals keep family members informed during a patient’s surgery. See real-time updates on your loved one’s progress without needing to ask staff.”
</p>
<div className="space-x-4">
<Link to="/"><button type="button" className="px-4 py-2 rounded bg-gradient-to-r from-[#6366f1] to-[#3b82f6]">Guest</button></Link>
<Link to="/Admin"><button type="button" className="px-4 py-2 rounded bg-gradient-to-r from-[#06b6d4] to-[#3b82f6]">Admin</button></Link>
<Link to="/status"><button type="button" className="px-4 py-2 rounded bg-gradient-to-r from-[#10b981] to-[#22c55e]">Surgical Team</button></Link>
</div>
  </div>
  <div className="md:w-1/2 transform rotate-2 w-full">
      <img className="w-full h-auto" src=" https://static.vecteezy.com/system/resources/previews/020/003/281/original/doctor-and-patient-graphic-clipart-design-free-png.png 
"/>
  </div>

  </div>

  )
}

export default Container