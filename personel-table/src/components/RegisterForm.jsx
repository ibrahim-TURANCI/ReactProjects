import { useState } from "react";
import './RegisterForm.css';

const RegisterForm = () => {
    const [generatedId, setGeneratedId] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [tc, setTc] = useState('');
    const [tel, setTel] = useState('');

    const generateUserId = () => {
    const newId = generateRandomId();
    setGeneratedId(newId);
    };

    const generateRandomId = () => {
      return Math.floor(1000000 + Math.random() * 9000000);
    };

    const addUser = () => {
      // Burada kullanıcı ekleme işlemleri yapılabilir
      // Örneğin, bir API'ye POST isteği gönderilebilir
    console.log("User added:", {
        id: generatedId,
        name: name,
        surname: surname,
        tc: tc,
        tel: tel
    });
      // Durumları sıfırla
    setGeneratedId('');
    setName('');
    setSurname('');
    setTc('');
    setTel('');
    };
    
    return (
<div className="registerTable">
    
        <div className="registerRow"><p>ID</p><p id="generated-id">{generatedId}</p><button onClick={generateUserId} className="black-b">ID Oluştur</button></div>
        <div className="registerRow"><p>Ad</p><input type="text" id="name" placeholder="Adınızı Giriniz. *" value={name} onChange={(e) => setName(e.target.value)} required /></div>
        <div className="registerRow"><p>Soyad</p><input type="text" id="surname" placeholder="Soyadınızı Giriniz. *" value={surname} onChange={(e) => setSurname(e.target.value)} required /></div>
        <div className="registerRow"><p>T.C.</p><input type="text" inputMode="numeric" id="tc" placeholder="TC Giriniz. *" maxLength="11" value={tc} onChange={(e) => setTc(e.target.value)} required /></div>
        <div className="registerRow"><p>Telefon</p><input type="text" id="tel" placeholder="Telefon Giriniz." value={tel} onChange={(e) => setTel(e.target.value)} /></div>
        <div className="registerRow"><p>Lütfen '*' alanları eksiksiz şekilde doldurunuz</p><button className="black-b" onClick={addUser}>Gönder</button></div>
  
</div>
    );
};

export default RegisterForm;