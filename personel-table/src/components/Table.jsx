import './Table.css';


const Table = ()=>{




    return (  
        
        <div class="tableBox">
    <div class="tableTop">
        <p>DATABASE</p> 
            <div>
            

            <input id="noDel" type="text" placeholder="ID" maxlength="7"/>
            <button class="noDel" onclick="deleteUser()">DELETE</button>
            <button class="removeAll" onclick="deleteAllTasks()">Delete All</button>
            </div>
        <p class="delnote">Silmek istediğiniz verinin ID'sini giriniz</p>
    </div>
<table id="personelTable">
    <tr>
        <th>NO</th>
        <th>ID</th>
        <th>AD</th>
        <th>SOYAD</th>
        <th>TC</th>
        <th>TELEFON</th>
        <th></th>
    </tr>
</table>

</div>
    
    );
}

export default Table;