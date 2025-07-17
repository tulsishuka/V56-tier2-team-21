
import { useNavigate } from 'react-router-dom';

const Container = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-start px-20 py-10 min-h-screen bg-[#2a3f6c] text-white">
      <div className="md:w-1/2 mb-20 mb:mb-0 text-center md:text-left">
        <div className="space-x-6 font-bold hidden md:flex mb-10 ">
          {/* displays a screen showing the status of all surgical patients */}
          <div className="hover:text-blue-300 transition cursor-pointer">Patient Status</div>

          {/* allows an administrator to add new patient data and start the workflow */}
          <div className="hover:text-blue-300 transition cursor-pointer " onClick={() => navigate('/login')}>Patient Information</div>

          {/* allows a member of the surgical team to update a patients status */}
          <div className="hover:text-blue-300 transition cursor-pointer" onClick={() => navigate('/login')}>Patient Status Update</div>
        </div>
        <h1 className="font-bold text-2xl text-white0">Welcome </h1>
        <h4 className="font-bold text-4xl  my-2">Surgery Status Board</h4>
        <div className='flex flex-col gap-30'>
          <p className="pt-10 text-white text-xl italic">Our Surgery Status Board helps hospitals keep family members informed during a patient’s surgery. See real-time updates on your loved one’s progress without needing to ask staff.
          </p>
          <div className='flex gap-20'>
            <div className='flex flex-col items-center justify-between w-32 h-32 rounded-2xl cursor-pointer hover:shadow-lg transition hover:text-blue-300 bg-white'>
              <img src='/guest.png' className='object-cover p-2 mb-2' />
              <span className='text-sm font-bold'>Guest</span>
            </div>

            <div className='flex flex-col items-center justify-between w-32 h-32 rounded-2xl cursor-pointer hover:shadow-lg transition hover:text-blue-300'
              onClick={() => navigate('/login')}>
              <img src='/admin.jpeg' className='object-cover rounded-2xl mb-2' />
              <span className='text-sm font-bold'>Admin</span>
            </div>

            <div className='flex flex-col items-center justify-between w-32 h-32 rounded-2xl cursor-pointer hover:shadow-lg transition hover:text-blue-300 bg-white'
              onClick={() => navigate('/login')}>
              <img src='/surgery-team.png' className='object-cover mb-2' />
              <span className='text-sm font-bold'>Surgery Team</span>
            </div>

          </div>
        </div>
      </div>
      <div className="md:w-1/2 transform rotate-2 w-full mt-20">
        <img className="w-full h-auto" src=" https://static.vecteezy.com/system/resources/previews/020/003/281/original/doctor-and-patient-graphic-clipart-design-free-png.png 
"/>
      </div>
    </div>
  )
}

export default Container