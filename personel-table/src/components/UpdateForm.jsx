import { useEffect, useState } from "react";
import './RegisterForm.css';
/* import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../reducers/userReducer";
import { addUserToServer, fetchData } from "../Services"; */


const UpdateForm = ({ userData, onUpdate }) => {
    const [id, setId] = useState(userData.id)
    const [name, setName] = useState(userData.name);
    const [surname, setSurname] = useState(userData.surname);
    const [tc, setTc] = useState(userData.tc);
    const [tel, setTel] = useState(userData.tel);

    // Kullanıcının verileri değiştiğinde bileşenin yeniden yüklenmesini sağlayın
    useEffect(() => {
        setId(userData.id)
        setName(userData.name);
        setSurname(userData.surname);
        setTc(userData.tc);
        setTel(userData.tel);
    }, [userData]);

    // Güncelleme işlemi
    const handleUpdate = () => {
        const updatedUserData = { id: userData.id, name, surname, tc, tel };
        onUpdate(updatedUserData);
    };
    return (
        <div className="registerTable">
            <div className="registerRow"><p>ID</p><p id="generated-id">{id}</p></div>
            <div className="registerRow"><p>Ad</p><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div className="registerRow"><p>Soyad</p><input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} /></div>
            <div className="registerRow"><p>T.C.</p><input type="text" maxLength="11" value={tc} onChange={(e) => setTc(e.target.value)} /></div>
            <div className="registerRow"><p>Telefon</p><input type="text" value={tel} onChange={(e) => setTel(e.target.value)} /></div>
            <div className="registerRow"><button onClick={handleUpdate} className="black-b">Düzenle</button></div>

        </div>
    );
};

export default UpdateForm;