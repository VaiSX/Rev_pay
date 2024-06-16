import CreateAccountForm from '../components/CreateAccountForm';

const CreateAccount = ({ token }) => {
  return (
    <div>
      <CreateAccountForm token={token} />
    </div>
  );
};

export default CreateAccount;
