import searchtech from '../assets/searchtech.png';
import GithubAuth from '../features/auth/components/GithubAuth';
import { getCurrentDate } from '../lib/utils';

const Header = () => {
  return (
    <div className='flex items-center'>
      <img src={searchtech} className='w-30 h-auto' />
      <div>{getCurrentDate()}</div>
      <GithubAuth />
    </div>
  )
}

export default Header