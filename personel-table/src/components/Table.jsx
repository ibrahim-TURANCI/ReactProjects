import './Table.css';
import RegisterForm from './RegisterForm';
import UpdateForm from './UpdateForm';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, deleteUserById, deleteUserFromServer, updateUserInServer } from '../Services/HttpServices';
import { setUsers } from "../reducers/userReducer";

const Table = ({ isAdmin }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();

    const handleEdit = (userId, userData) => {
        setSelectedUserId(userId);
        setSelectedUserData(userData);
        setIsEditing(true);
    };
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleUpdate = async (updatedUserData) => {
        try {
            await updateUserInServer(updatedUserData.id, updatedUserData);
            const updatedUsers = users.map(user => {
                if (user.id === updatedUserData.id) {
                    return updatedUserData;
                }
                return user;
            });
            dispatch(setUsers(updatedUsers));
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await deleteUserFromServer(userId);
            await fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleDelete = () => {
        deleteUserById(inputValue)
            .then((response) => {
                console.log(response.message);
                setInputValue('');
                fetchUsers();
            })
            .catch((error) => {
                alert("ID Bulunamadı.");
            });


    };

    const deleteAllUser = async () => {
        const confirmed = window.confirm("Tüm kullanıcıları silmek istediğinizden emin misiniz?");
        if (!confirmed) {
            return;
        }

        try {
            const users = await fetchData(); // Tüm kullanıcıları getir

            for (let index = 0; index < users.length; index++) {
                const user = users[index];
                await deleteUserFromServer(user.id); // Her bir kullanıcıyı sil
            }
            console.log("Tüm userlar silindi")
            await fetchUsers();
            console.log("Yeni data alındı")

        } catch (error) {
            console.log("Hata", error)
        }

    }

    const fetchUsers = async () => {
        try {
            const data = await fetchData();
            dispatch(setUsers(data));
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [dispatch]);

    return (
        <div className="tableBox">
            {isAdmin && !isEditing && <RegisterForm />}
            {isAdmin && !isEditing && (
                <div className="tableTop">
                    <p>DATABASE</p>
                    <div>
                        <input id="noDel" type="text" placeholder="ID" maxLength="7" value={inputValue} onChange={handleChange} />
                        <button className="noDel" onClick={handleDelete}>DELETE</button>
                        <button className="removeAll" onClick={deleteAllUser}>Delete All</button>
                    </div>
                    <p className="delnote">Silmek istediğiniz verinin ID'sini giriniz</p>
                </div>
            )}
            {isEditing ? (
                <UpdateForm userData={selectedUserData} onUpdate={handleUpdate} />
            ) : (
                <table id="personelTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>AD</th>
                            <th>SOYAD</th>
                            <th>TC</th>
                            <th>TELEFON</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.tc}</td>
                                <td>{user.tel}</td>
                                <td className='lastTd'>
                                    <span onClick={() => handleEdit(user.id, user)}><i className="edit-btn fa-regular fa-pen-to-square"></i></span>
                                    <span onClick={() => deleteUser(user.id)}><i className="delete-btn fa-regular fa-trash-can"></i></span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Table;
