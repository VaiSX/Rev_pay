import AccountList from '../components/AccountList';
import TransactionForm from '../components/TransactionForm';

const DashboardPage = ({ token }) => {
  return (
    <div>
      <AccountList token={token} />
      <TransactionForm token={token} />
    </div>
  );
};

export default DashboardPage;
