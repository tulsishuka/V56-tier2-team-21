
import { useNavigate } from 'react-router-dom';

const Container = () => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-center items-center gap-10 h-[50vh]'>
      <div className='flex flex-col items-center justify-between w-52 h-52 border p-2 rounded-2xl cursor-pointer'>
        <img src='/guest.svg' className='w-full h-4/5 object-cover' />
        <span className='text-xl font-bold'>Guest</span>
      </div>
      <div
        className='flex flex-col items-center justify-between 
                    w-52 h-52 border p-2 rounded-2xl 
                    cursor-pointer hover:shadow-lg transition'
        onClick={() => navigate('/login')}
      >
        <img src='/admin.png' className='w-4/5 h-auto object-cover opacity-50' />
        <span className='text-xl font-bold'>Admin</span>
      </div>
      <div
        className='flex flex-col items-center justify-between 
            w-52 h-52 border pb-2 rounded-2xl 
            cursor-pointer hover:shadow-lg transition'
        onClick={() => navigate('/login')}
      >
        <img src='/surgery-team.png' className='w-10/12 h-auto object-cover' />
        <span className='text-xl font-bold'>Surgery Team</span>
      </div>
    </div>
  )
}

export default Container