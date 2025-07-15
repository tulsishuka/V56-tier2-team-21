import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="relative flex items-center justify-center mt-10 h-16">
      {/* Home icon on the left */}
      {currentPath !== "/" &&
        <div className="absolute left-0 flex items-center justify-center gap-2 cursor-pointer font-bold" onClick={() => navigate('/')}>
          <img src="/home.png" className=" size-12 ml-4" />
          <span>HOME</span>
        </div>}

      <div className="flex items-center gap-4">
        <div className="font-bold text-2xl">Staff Login (Admin / Surgical Team)</div>
      </div>
    </div>
  )
}

export default Header