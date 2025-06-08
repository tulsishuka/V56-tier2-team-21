import searchtech from '../assets/searchtech.png';
import { getCurrentDate } from '../lib/utils';

const Header = () => {
  return (
    <div className='flex items-center'>
      <img src={searchtech} className='w-30 h-auto' />
      <div>{getCurrentDate()}</div>
    </div>
  )
}

export default Header