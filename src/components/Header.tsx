import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="relative flex items-center justify-center mt-10 h-16">
      {/* Home icon on the left */}
      {currentPath !== "/" &&
        <div className="absolute left-10 flex items-center justify-center gap-2 cursor-pointer font-bold" onClick={() => navigate('/')}>
          <img src="/home.png" className=" size-12 ml-4" />
          <span>HOME</span>
        </div>}

      {/* Centered logo and title */}
      <div className="flex items-center gap-4">
        <img src="/surgery-logo.png" />
        <div className="font-bold text-4xl">Surgery Status Board</div>
      </div>
    </div>
  )
}

export default Header