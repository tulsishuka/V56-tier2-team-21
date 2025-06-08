import { Button } from '../../components/ui/button'
import githubLogo from '../../assets/github-logo.svg'
import googleLogo from '../../assets/google-logo.svg'

interface Props {
  onGithubLogin: () => void;
}

const Login = (props: Props) => {
  const { onGithubLogin } = props;

  return (
    <div className='flex flex-col gap-5 w-full max-w-xs'>
      <Button variant="outline" size="sm" className='h-fit py-1 cursor-pointer' onClick={onGithubLogin}>
        <img src={githubLogo} className='w-10 h-auto' />
        Login with Github
      </Button>
      <Button variant="outline" size="sm" className='h-fit py-1 cursor-pointer'>
        <img src={googleLogo} className='w-10 h-auto' />
        Login with Google
      </Button>
    </div>
  )
}

export default Login