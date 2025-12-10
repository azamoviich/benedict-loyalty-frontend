useEffect(() => {
  try {
    if (webApp?.initDataUnsafe?.user) {
      setUser({ ...webApp.initDataUnsafe.user, points: 1240 });
    } else {
      setUser({ first_name: 'Guest', points: 1240 });
    }
    // We already called expand() and ready() in telegram.js → no need here
  } catch (err) {
    console.error(err);
    setUser({ first_name: 'Debug', points: 9999 });
  }
}, []);