import './Table.css';
import RegisterForm from './RegisterForm';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Table = ({ isAdmin }) => {
    const users = useSelector((state) => state.user.users);
    
    const deleteAllTasks = async () => {
        await axios.delete("http://localhost:3004/users");
        // setUsers([]);
    };

    const addUser = async (newUser) => {
        try {
            if (newUser) {
                console.log("jsjsjs");
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
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
            // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== numericUserId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3004/users");
            const data = await response.json();
            console.log("data: ", data);
            /*       setUserData(data); */

            return data 
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    useEffect(() => {

        fetchData();

        console.log("sssss");
    }, []);


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