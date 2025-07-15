
import { useNavigate } from 'react-router-dom';

const Container = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8  min-h-screen">
      <div className=" md:w-1/2 mb-8 mb:mb-0 text-center md:text-left ">
        <h1 className="font-bold text-2xl text-zinc-900">Welcome </h1>
        <h4 className="font-bold text-4xl  my-2">Surgery Status Board</h4>
        <div className='flex flex-col items-center justify-center'>
          <p className="font-semibold p-7 text-zinc-600 text-xl italic">“Surgery Status Board helps hospitals keep family members informed during a patient’s surgery. See real-time updates on your loved one’s progress without needing to ask staff.”
          </p>

          <div className='flex justify-center items-center gap-10 h-[50vh]'>
            <div className='flex flex-col items-center justify-between w-32 h-32 p-2 rounded-2xl cursor-pointer hover:shadow-lg transition'>
              <img src='/guest.svg' className='w-full h-4/5 object-cover mb-2' />
              <span className='text-sm font-bold'>Guest</span>
            </div>
            <div
              className='flex flex-col items-center justify-between 
                    w-32 h-32 p-2 rounded-2xl 
                    cursor-pointer hover:shadow-lg transition'
              onClick={() => navigate('/login')}
            >
              <img src='/admin.png' className='w-4/5 h-auto object-cover opacity-50 mb-2' />
              <span className='text-sm font-bold'>Admin</span>
            </div>
            <div
              className='flex flex-col items-center justify-between 
            w-32 h-32 rounded-2xl 
            cursor-pointer hover:shadow-lg transition'
              onClick={() => navigate('/login')}
            >
              <img src='/surgery-team.png' className='w-4/5 h-auto object-cover' />
              <span className='text-sm font-bold mb-2'>Surgery</span>
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