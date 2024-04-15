import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import UpdateUser from './UpdateUser.jsx'

const Home = () => {
  const [users, setUsers] = useState([]);
  const [FilterData, SetFilterData] = useState([]);
  const [formData, setFormData] = useState({name: "",license: "",dob: "",age: ""});
  const [sortBy, setSortBy] = useState({key: null,asc: true});            // to sorting data
  const [showAlert, setShowAlert] = useState(false);                      //pop-up after created new user
  const [Alert, SetAlert] = useState(false);                              //alert to show warning if userdata not filled at create new user
  const [ShowUpdateUser, SetShowUpdateUser] = useState(false);            //to pop-up the update form
  const [SelectedUserId, setSelectedUserId] = useState(null);             //pass the user id to update component

  //DISPLAY ALL USERS WHEN REFRESH THE PAGE
  useEffect(() => {
    axios
      .get("http://localhost:8080/nurse/getall")
      .then((result) => {
        console.log(result.data);
        setUsers(result.data.data);
        SetFilterData(result.data.data)
      })
      .catch((err) => console.log(err));
  }, []);

  //FILTER FUNCTION TO SEARCH USER
  const SearchFunction = (e) => {
    const searchtext = e.target.value.toLowerCase();
    const FilterResult = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchtext) ||
        user.license.toString().includes(searchtext) ||
        user.dob.toLowerCase().includes(searchtext) ||
        user.age.toString().includes(searchtext)
    );
    SetFilterData(FilterResult);
  };
  

  //DELETE FUNCTION TO DELETE DATA
  const handleDelete = (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");
    if (isConfirm) {
      axios
        .delete(`http://localhost:8080/nurse/delete/${id}`)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //CREATE NEW USER
  const handleSubmit = (e) => {
    e.preventDefault();
    const nameInput = document.querySelector('input[name="name"]');
    const LicenseInput = document.querySelector('input[name="license"]');
    const dobInput = document.querySelector('input[name="dob"]');
    const ageInput = document.querySelector('input[name="age"]');
    if (!nameInput.value || !LicenseInput.value || !dobInput.value || !ageInput.value) 
    {
      SetAlert(true);
      return;
    }

    axios.post("http://localhost:8080/nurse/create", formData)
          .then((res) => {
            console.log(res);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000); // Close the alert after 3 seconds
            window.location.reload();
          })
          .catch((err) => console.log(err));
  };

  const handleSort = (key) => {
    if (sortBy.key === key) {
      setSortBy({ ...sortBy, asc: !sortBy.asc });
    } else {
      setSortBy({ key, asc: true });
    }
  };

  //SORTING PROCESS WITH FILTERED DATA
  const sortedFilteredUsers = FilterData.slice().sort((a, b) => {
    const sortValue = sortBy.asc ? 1 : -1;
    if (sortBy.key) {
      return sortValue * (a[sortBy.key] - b[sortBy.key]);
    }
    return 0;
  });

  //TOGGLE FOR THE UPDATE FORM
  const ToggleUpdateUser = (userId) => {
    SetShowUpdateUser(true);
    setSelectedUserId(userId);
  };


  //FUNCTION FOR DOWNLOAD CSV DOCUMENT
  const downloadCSV = () => {
    
    const csvContent = "data:text/csv;charset=utf-8,"                                 // Convert data to CSV format
      + users.map(user => Object.values(user).join(',')).join('\n');
  
    
    const link = document.createElement('a');                                          // Create a link element
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'Nurses.csv');
    
    
    link.click();                                                                       // Simulate click to initiate download
  }

  // FUNCTION FOR DOWNLOAD XLSX DOCUMENT
  const downloadExcel = () => {
    
    const worksheet = XLSX.utils.json_to_sheet(users);                                            // Convert data to worksheet
    
    const workbook = XLSX.utils.book_new();                                                       // Create workbook and add the worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    
    const wbArrayBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });              // Convert workbook to array buffer
    
    const wbBlob = new Blob([wbArrayBuffer], { type: 'application/octet-stream' });                 // Convert array buffer to blob
    
    const link = document.createElement('a');                                                         // Create a link element

    link.href = URL.createObjectURL(wbBlob);
    link.download = 'users.xlsx';
    
    link.click();                                                                             // Simulate click to initiate download
  }
  


  return (
    <> 
      <div className="head">
         <h2>Nurse MANAGEMENT</h2>
         <h3>CRUD Operation using Node.Js and MySQL</h3>
      </div>
     
      <div className="container">

      {showAlert && (
        <div className="alert alert-success" role="alert">
          New user created!
        </div>
      )}

      {Alert && (
        <p style={{ color: "red", textAlign: "center" }}>
          Please Fill All the Details...
        </p>
      )}
     
      <div className="input-search">
         <input type="search" onChange={SearchFunction} placeholder="Search Here.." className="form-control"/>
         <button className="btn-download" onClick={downloadCSV}>Download CSV</button>
         <button className="btn-download" onClick={downloadExcel}>Download Excel</button>
         
      </div>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}> ID <BsArrowUp className="BsArrowUp"/> <BsArrowDown className="BsArrowDown"/> </th>

            <th onClick={() => handleSort("name")}> Name  <BsArrowUp className="BsArrowUp"/> <BsArrowDown className="BsArrowDown"/> </th>

            <th onClick={() => handleSort("license")}> License <BsArrowUp className="BsArrowUp"/> <BsArrowDown className="BsArrowDown"/> </th>

            <th onClick={() => handleSort("dob")}> DOB <BsArrowUp className="BsArrowUp"/> <BsArrowDown className="BsArrowDown"/> </th>

            <th onClick={() => handleSort("age")}> Age  <BsArrowUp className="BsArrowUp"/> <BsArrowDown className="BsArrowDown"/> </th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>
          {
            sortedFilteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.license}</td>
                <td>{user.dob}</td>
                <td>{user.age}</td>
                <td>
                  <button onClick={()=>ToggleUpdateUser(user.id)} className="btn green"> Edit </button>
                  <button style={{ marginLeft: "20px" }} onClick={() => handleDelete(user.id)} className="btn red"> Remove </button>
                </td>
              </tr>
          ))}
          
          <tr>
            <td></td>
            <td>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="form-control" />
            </td>
            <td>
              <input type="text" name="license" placeholder="License" value={formData.license} onChange={handleChange} className="form-control" />
            </td>
            <td>
              <input type="text" name="dob" placeholder="DOB" value={formData.dob} onChange={handleChange} className="form-control" />
            </td>
            <td>
              <input type="text" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="form-control" />
            </td>
            <td>
            <button onClick={handleSubmit} className="btn create green"> Create </button>
            </td>
          </tr>
        </tbody>
      </table>
      {
        ShowUpdateUser && (
            <UpdateUser onCloseUpdate={() => SetShowUpdateUser(false)} userId={SelectedUserId}/>
          )
      }
    </div>
    </>
  );
};

export default Home;
