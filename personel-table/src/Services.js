import axios from 'axios';

export const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:3004/users');
        const data = await response.json();
        console.log('data: ', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Hatayı yazdır
    }
};

export const addUserToServer = async (newUser) => {
    try {
        const response = await axios.post('http://localhost:3004/users', newUser);
        return response.data; // Eklenen kullanıcıyı geri döndür
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

export const deleteUserFromServer = async (userId) => {
    try {
        await axios.delete(`http://localhost:3004/users/${userId}`);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
export const deleteUserData = async (userId) => {
    try {
        await axios.delete(`http://localhost:3004/users/${userId}`);
        await fetchData(); // Tablo yenilemek için
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

export const deleteAllUserData = async () => {
    try {
        await axios.delete("http://localhost:3004/users");
        await fetchData();
    } catch (error) {
        console.error('Error deleting all users:', error);
        throw error;
    }
};