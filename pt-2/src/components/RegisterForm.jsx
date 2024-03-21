import { useEffect, useState } from "react";
import './RegisterForm.css';
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../reducers/userReducer";
import { addUserToServer, fetchData } from "../Services/HttpServices";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [generatedId, setGeneratedId] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [tc, setTc] = useState('');
  const [mail, setMail] = useState('');
  const [tel, setTel] = useState('');
  const users = useSelector((state) => state.user.users);

  console.log(users)

  const fetchUsers = async () => {
    try {
      const data = await fetchData(); // servis
      dispatch(setUsers(data));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const addUser = async (newUser) => {
    try {
      const addedUser = await addUserToServer(newUser); // servis
      await fetchUsers();
      return addedUser;
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  useEffect(() => {
    const generateUserId = () => {
      const newId = generateRandomId();
      setGeneratedId(newId);
    };
    generateUserId();
  }, []);

  const generateUserId = () => {
    const newId = generateRandomId();
    setGeneratedId(newId);
  };

  const generateRandomId = () => {
    return Math.floor(1000000 + Math.random() * 9000000);
  };

  const handleAddUser = async () => {
    const newUser = {
      id: generatedId.toString(),
      name: name,
      surname: surname,
      tc: tc,
      mail: mail,
      tel: tel,
      isAdmin: false
    };

    console.log("newUser", newUser)


    if (!newUser.id || !newUser.name || !newUser.surname || !newUser.tc || !newUser.mail) {
      alert("Lütfen gerekli alanları doldurun.");
      return;
    }

    await addUser(newUser);

    // İnputları Temizle ve ID değiştir.
    setGeneratedId(generateRandomId());
    setName('');
    setSurname('');
    setTc('');
    setMail('');
    setTel('');
  };
  return (
    <div className="registerTable">

      <div className="registerRow"><p>ID</p><p id="generated-id">{generatedId}</p><button onClick={generateUserId} className="black-b">ID Oluştur</button></div>
      <div className="registerRow"><p>Ad</p><input type="text" id="name" autoComplete="name" placeholder="Adınızı Giriniz. *" value={name} onChange={(e) => setName(e.target.value)} required /></div>
      <div className="registerRow"><p>Soyad</p><input type="text" id="surname" autoComplete="surname" placeholder="Soyadınızı Giriniz. *" value={surname} onChange={(e) => setSurname(e.target.value)} required /></div>
      <div className="registerRow"><p>T.C.</p><input type="text" inputMode="numeric" id="tc" autoComplete="tc" placeholder="TC Giriniz. *" maxLength="11" value={tc} onChange={(e) => setTc(e.target.value)} required /></div>
      <div className="registerRow"><p>Mail</p><input type="text" id="mail" autoComplete="mail" placeholder="Mail Giriniz. *" value={mail} onChange={(e) => setMail(e.target.value)} /></div>
      <div className="registerRow"><p>Telefon</p><input type="text" id="tel" autoComplete="tel" placeholder="Telefon Giriniz." value={tel} onChange={(e) => setTel(e.target.value)} /></div>
      <div className="registerRow"><p>Lütfen '*' alanları eksiksiz şekilde doldurunuz</p><button className="black-b" onClick={handleAddUser}>KAYDET</button></div>

    </div>
  );
};

export default RegisterForm;