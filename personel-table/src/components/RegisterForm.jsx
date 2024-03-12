import { useEffect, useState } from "react";
import './RegisterForm.css';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { setAdducer, setUsers } from "../reducers/userReducer";
const RegisterForm = () => {
  const dispatch = useDispatch();  // useDispatch hook'u eklenmiş

  const [generatedId, setGeneratedId] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [tc, setTc] = useState('');
  const [tel, setTel] = useState('');
  const users = useSelector((state) => state.user.users);
  console.log("users : ", users);

  useEffect(() => {
  }, [])


  const generateUserId = () => {
    const newId = generateRandomId();
    setGeneratedId(newId);
  };
  const generateRandomId = () => {
    return Math.floor(1000000 + Math.random() * 9000000);
  };

  const addUser = async () => {

    const fetchData = async () => {

      try {
        const response = await fetch("http://localhost:3004/users");
        const data = await response.json();
        console.log("data: ", data);
        /*       setUserData(data); */
        for (let i = 0; i < data.length; i++) {
          const user = data[i];
          dispatch(setUsers(data))

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    const newUser = {
      id: generatedId,
      name: name,
      surname: surname,
      tc: tc,
      tel: tel
    };
    console.log("users :", users);
    console.log("newUser :", newUser.name);
    // dispatch(setAddusers([...users, newUser]))
    // dispatch(setAdducer(true))
    console.log("Deneme 12");
    if (!newUser.id) {
      alert("ID oluşturunuz.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3004/users", newUser);

      // Redux'a action gönder
      dispatch({ type: "ADD_USER", payload: response.data });
    } catch (error) {
      console.error('Error adding user:', error);
    }
    fetchData()


    // İnputları Temizle ve ID değiştir.
    setGeneratedId('');
    setName('');
    setSurname('');
    setTc('');
    setTel('');
    const newId = generateRandomId();
    setGeneratedId(newId);
  };
  return (
    <div className="registerTable">

      <div className="registerRow"><p>ID</p><p id="generated-id">{generatedId}</p><button onClick={generateUserId} className="black-b">ID Oluştur</button></div>
      <div className="registerRow"><p>Ad</p><input type="text" id="name" placeholder="Adınızı Giriniz. *" value={name} onChange={(e) => setName(e.target.value)} required /></div>
      <div className="registerRow"><p>Soyad</p><input type="text" id="surname" placeholder="Soyadınızı Giriniz. *" value={surname} onChange={(e) => setSurname(e.target.value)} required /></div>
      <div className="registerRow"><p>T.C.</p><input type="text" inputMode="numeric" id="tc" placeholder="TC Giriniz. *" maxLength="11" value={tc} onChange={(e) => setTc(e.target.value)} required /></div>
      <div className="registerRow"><p>Telefon</p><input type="text" id="tel" placeholder="Telefon Giriniz." value={tel} onChange={(e) => setTel(e.target.value)} /></div>
      <div className="registerRow"><p>Lütfen '*' alanları eksiksiz şekilde doldurunuz</p><button className="black-b" onClick={() => addUser()}>KAYDET</button></div>

    </div>
  );
};

export default RegisterForm;