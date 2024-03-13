import './Table.css';
import RegisterForm from './RegisterForm';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Table = () => {
    const deleteAllTasks = () => {
        setUsers([]);
    };

    const [users, setUsers] = useState([]);


    const addUser = (newUser) => {

        // Mevcut kullanıcıları güncelle ve yeni kullanıcıyı ekle
        setUsers(prevUsers => [...prevUsers, newUser]);
    };


    /*     const deleteAll = async () => {
            const confirmed = window.confirm("Tüm kullanıcıları silmek istediğinizden emin misiniz?");
            if (!confirmed) {
                return;
            } */

    const deleteUser = async (userId) => {
        try {
            const numericUserId = parseInt(userId, 10);
            await axios.delete(`http://localhost:3004/users/${numericUserId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== numericUserId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3004/users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {

        fetchData();

    }, []);
    useEffect(() => {
        // users state'i güncellendiğinde çalışacak olan kodlar
        // Bu durumda herhangi bir değişiklik olduğunda fetchData fonksiyonunu tekrar çağırabilirsiniz.
        fetchData();
    }, [users]);  // users state'i değiştiğinde çalışacak


    return (

        <div class="tableBox">
            <RegisterForm onAddUser={addUser} onDeleteUser={deleteUser} />
            <div class="tableTop">
                <p>DATABASE</p>
                <div>


                    <input id="noDel" type="text" placeholder="ID" maxlength="7" />
                    <button class="noDel" onclick="deleteUser()">DELETE</button>
                    <button class="removeAll" onClick={() => deleteAllTasks()}>Delete All</button>
                </div>
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