import LoginForm from '../components/LoginForm';

const LoginPage = ({ setToken }) => {
  return (
    <div>
      <LoginForm setToken={setToken} />
    </div>
  );
};

export default LoginPage;
