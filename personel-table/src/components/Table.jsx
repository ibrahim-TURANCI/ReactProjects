import './Table.css';
import RegisterForm from './RegisterForm';
import React, { useState } from 'react';




const Table = () => {

    const [users, setUsers] = useState([]);

    const addUser = (newUser) => {
        // Mevcut kullanıcıları güncelle ve yeni kullanıcıyı ekle
        setUsers(prevUsers => [...prevUsers, newUser]);
    };



    return (

        <div class="tableBox">
            <RegisterForm onAddUser={addUser} />
            <div class="tableTop">
                <p>DATABASE</p>
                <div>


                    <input id="noDel" type="text" placeholder="ID" maxlength="7" />
                    <button class="noDel" onclick="deleteUser()">DELETE</button>
                    <button class="removeAll" onclick="deleteAllTasks()">Delete All</button>
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
                        <td className='lastTd'><span><i class="edit-btn fa-regular fa-pen-to-square"></i></span><span><i class="delete-btn fa-regular fa-trash-can"></i></span></td>
                    </tr>
                ))}
            </table>

        </div>

    );
}

export default Table;