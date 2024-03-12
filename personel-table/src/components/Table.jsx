import './Table.css';
import RegisterForm from './RegisterForm';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, deleteUserData, deleteAllUserData } from '../Services';
import { setUsers } from "../reducers/userReducer";

const Table = ({ isAdmin }) => {
    const users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();


    const addUser = async (newUser) => {
        try {
            if (newUser) {
                console.log("jsjsjs");
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await deleteUserData(userId);
            console.log(userId);
            await fetchData();
            // dispatch(setUsers(users.filter((user) => user.id !== userId))); // Redux'tan kullanıcıyı silmek yerine servisi kullanabiliriz
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    /*     const deleteAll = async () => {
            const confirmed = window.confirm("Tüm kullanıcıları silmek istediğinizden emin misiniz?");
            if (!confirmed) {
                return;
            } */
    const deleteAllTasks = async () => {
        try {
            await deleteAllUserData();
            // dispatch(setUsers([])); // Redux'tan tüm kullanıcıları silmek yerine servisi kullanabiliriz
        } catch (error) {
            console.error('Error deleting all users:', error);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchData(); // Servisi kullanarak verileri al
                dispatch(setUsers(data)); // Redux store'u güncelle
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getData(); // fetchData fonksiyonunu çağır
    }, [dispatch]);


    return (

        <div class="tableBox">
            {isAdmin && <RegisterForm onAddUser={addUser} onDeleteUser={deleteUser} />}
            <div class="tableTop">
                <p>DATABASE</p>

                {isAdmin && (
                    <div>
                        <input id="noDel" type="text" placeholder="ID" maxlength="7" />
                        <button class="noDel" onclick="deleteUser()">DELETE</button>
                        <button class="removeAll" onClick={() => deleteAllTasks()}>Delete All</button>
                    </div>
                )}
                <p class="delnote">Silmek istediğiniz verinin ID'sini giriniz</p>
            </div>

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
                        <td className='lastTd'><span><i class="edit-btn fa-regular fa-pen-to-square"></i></span><span onClick={() => deleteUser(user.id)}><i class="delete-btn fa-regular fa-trash-can"></i></span></td>
                    </tr>
                ))}
            </table>

        </div>

    );
}

export default Table;