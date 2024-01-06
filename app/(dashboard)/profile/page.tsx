import { useAuthenticated } from '@/hooks/useAuthenticated';

const Profile = async () => {
  const user = await useAuthenticated();

  return <div>Profile {JSON.stringify(user)}</div>;
};

export default Profile;
