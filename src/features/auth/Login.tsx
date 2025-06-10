import { Button } from '../../components/ui/button'
import githubLogo from '../../assets/github-logo.svg'
import googleLogo from '../../assets/google-logo.svg'
import { useAuth } from '../../context/AuthContext';

// interface Props {
//   onGithubLogin?: () => void;
//   onGoogleLogin?: () => void;
// }

const Login = () => {
  // const { onGithubLogin, onGoogleLogin } = props;
  const { user, signInWithGoogle, signInWithGithub, signOut } = useAuth();
  return (
    <div className='flex flex-col gap-5 w-full max-w-xs'>
      <Button variant="outline" size="sm" className='h-fit py-1 cursor-pointer' onClick={signInWithGithub}>
        <img src={githubLogo} className='w-10 h-auto' />
        Login with Github111
      </Button>
      <Button variant="outline" size="sm" className='h-fit py-1 cursor-pointer'>
        <img src={googleLogo} className='w-10 h-auto' onClick={signInWithGoogle} />
        Login with Google22
      </Button>
    </div>
  )
}

export default Login