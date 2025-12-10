export default function Profile({ user }) {
  return (
    <div className="profile card">
      <img
        src={user?.photo_url || `https://ui-avatars.com/api/?name=${user?.first_name}&background=random`}
        alt="avatar"
        className="avatar"
      />
      <h3>{user?.first_name} {user?.last_name}</h3>
      <p>@{user?.username || 'no username'}</p>
      <p>ID: {user?.id}</p>
    </div>
  );
}