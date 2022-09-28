import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function Items() {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  return <div>Items</div>;
}
