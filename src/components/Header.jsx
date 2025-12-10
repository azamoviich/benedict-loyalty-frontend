import { webApp } from '../telegram';

export default function Header() {
  const closeApp = () => webApp?.close();

  return (
    <div className="header">
      <h1>Benedict Loyalty</h1>
      <button onClick={closeApp} className="close-btn">✕</button>
    </div>
  );
}