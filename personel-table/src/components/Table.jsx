import './Table.css';
import RegisterForm from './RegisterForm';
import UpdateForm from './UpdateForm';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, deleteUserData, deleteAllUserData, deleteUserFromServer, updateUserInServer } from '../Services';
import { setUsers } from "../reducers/userReducer";

const Table = ({ isAdmin }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserData, setSelectedUserData] = useState(null);

    const users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();

    const handleEdit = (userId, userData) => {
        setSelectedUserId(userId);
        setSelectedUserData(userData);
        setIsEditing(true);
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

    const deleteAllTasks = async () => {
        try {
            await deleteAllUserData();
        } catch (error) {
            console.error('Error deleting all users:', error);
        }
    };

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
        <div class="tableBox">
            {isAdmin && !isEditing && <RegisterForm />}
            {isAdmin && !isEditing && (
                <div class="tableTop">
                    <p>DATABASE</p>
                    <div>
                        <input id="noDel" type="text" placeholder="ID" maxlength="7" />
                        <button class="noDel" onClick={deleteUser}>DELETE</button>
                        <button class="removeAll" onClick={deleteAllTasks}>Delete All</button>
                    </div>
                    <p class="delnote">Silmek istediğiniz verinin ID'sini giriniz</p>
                </div>
            )}
            {isEditing ? (
                <UpdateForm userData={selectedUserData} onUpdate={handleUpdate} />
            ) : (
                <table id="personelTable">
                    <tr>
                        <th>ID</th>
                        <th>AD</th>
                        <th>SOYAD</th>
                        <th>TC</th>
                        <th>TELEFON</th>
                        <th></th>
                    </tr>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.tc}</td>
                            <td>{user.tel}</td>
                            <td className='lastTd'>
                                <span onClick={() => handleEdit(user.id, user)}><i class="edit-btn fa-regular fa-pen-to-square"></i></span>
                                <span onClick={() => deleteUser(user.id)}><i class="delete-btn fa-regular fa-trash-can"></i></span>
                            </td>
                        </tr>
                    ))}
                </table>
            )}
        </div>
    );
}

export default Table;
