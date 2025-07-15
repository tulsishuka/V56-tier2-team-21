
import { useNavigate } from 'react-router-dom';

const Container = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-start p-20 min-h-screen">
      <div className=" md:w-1/2 mb-8 mb:mb-0 text-center md:text-left ">
        <h1 className="font-bold text-2xl text-zinc-900">Welcome </h1>
        <h4 className="font-bold text-4xl  my-2">Surgery Status Board</h4>
        <div className='flex flex-col gap-30'>
          <p className="font-semibold pt-10 text-zinc-600 text-xl italic">Our Surgery Status Board helps hospitals keep family members informed during a patient’s surgery. See real-time updates on your loved one’s progress without needing to ask staff.
          </p>
          <div className='flex gap-20'>
            <div className='flex flex-col items-center justify-between w-32 h-32 rounded-2xl cursor-pointer hover:shadow-lg transition'>
              <img src='/guest.png' className='object-cover p-2' />
              <span className='text-sm font-bold'>Guest</span>
            </div>

            <div className='flex flex-col items-center justify-between w-32 h-32 rounded-2xl cursor-pointer hover:shadow-lg transition'
              onClick={() => navigate('/login')}>
              <img src='/admin.jpeg' className='object-cover rounded-2xl' />
              <span className='text-sm font-bold'>Admin</span>
            </div>

            <div className='flex flex-col items-center justify-between w-32 h-32 rounded-2xl cursor-pointer hover:shadow-lg transition'
              onClick={() => navigate('/login')}>
              <img src='/surgery-team.png' className='object-cover' />
              <span className='text-sm font-bold'>Surgery Team</span>
            </div>

          </div>
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