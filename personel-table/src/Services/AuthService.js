let logoutTimer;

const TIMEOUT_IN_MS = 1 * 60 * 1000; // 1 dakika

// Kullanıcı etkinliklerini izleme ve oturumu yönetme
const SessionManagement = () => {
    const handleUserActivity = () => {
        if (logoutTimer) {
            clearTimeout(logoutTimer); // Oturum süresini sıfırla
        }
        logoutTimer = setTimeout(() => {
            logout(); // Oturum süresi dolduğunda oturumu sonlandır
        }, TIMEOUT_IN_MS);
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
};

// Oturumu sonlandırma
const logout = () => {
    console.log('Oturum sonlandırıldı');
    window.location.href = '/login';  //kullanıcıyı giriş sayfasına yönlendir.
    localStorage.removeItem('loggedInUser'); //local storedan sil.
};

export { SessionManagement, logout };