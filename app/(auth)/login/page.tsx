import { LoginButtton } from '@/components/LoginButton';
import { MaxWidth } from '@/components/MaxWidth';
import { RichText } from '@/components/RichText';

const Login = () => (
  <MaxWidth>
    <div className="flex justify-between">
      <div>
        <RichText>
          <h1 className="mb-1 leading-none">Strava Netherlands</h1>
          <p className="max-w-xs text-sm">Sign in with your strava account</p>
        </RichText>
        <LoginButtton />
      </div>
    </div>
  </MaxWidth>
);

export default Login;
