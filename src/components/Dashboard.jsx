export default function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <div className="card balance-card">
        <h2>Your Points</h2>
        <div className="points">{user?.points || 0}</div>
        <p>Keep ordering to earn more!</p>
      </div>

      <div className="card">
        <h3>Recent Activity</h3>
        <p>No transactions yet</p>
      </div>
    </div>
  );
}