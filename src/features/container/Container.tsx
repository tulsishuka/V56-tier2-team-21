
import { useNavigate } from 'react-router-dom';

const Container = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gradient-to-r from-white to-slate-100 min-h-screen">
      <div className=" md:w-1/2 mb-8 mb:mb-0 text-center md:text-left ">
        <h1 className="font-bold text-2xl text-zinc-900">Welcome </h1>
        <h4 className="font-bold text-4xl  my-2">Surgery Status Board</h4>
        <p className="font-semibold p-7 text-zinc-600 text-xl italic">“Surgery Status Board helps hospitals keep family members informed during a patient’s surgery. See real-time updates on your loved one’s progress without needing to ask staff.”
        </p>
      </div>
      <div className="md:w-1/2 transform rotate-2 w-full">
        <img className="w-full h-auto" src=" https://static.vecteezy.com/system/resources/previews/020/003/281/original/doctor-and-patient-graphic-clipart-design-free-png.png 
"/>
      </div>
    </div>
  )
}

export default Container