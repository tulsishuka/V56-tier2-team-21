import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentDate } from '../lib/utils';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className=" flex items-center justify-between mt-10 h-16">
      {/* Home icon on the left */}
      {currentPath !== "/" &&
        <div className="flex items-center justify-center gap-2 cursor-pointer font-bold" onClick={() => navigate('/')}>
          <img src="/home.png" className=" size-12 ml-4" />
          <span>HOME</span>
        </div>}
      <div className="font-bold text-2xl">Staff Login (Admin / Surgical Team)</div>
      <div>{getCurrentDate()}</div>
    </div>
  )
}

export default Header