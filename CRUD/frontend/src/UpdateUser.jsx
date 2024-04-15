/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateUser = ({ onCloseUpdate, userId }) => {
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [alert, SetAlert] = useState(false);
  

  useEffect(() => {
    // Fetch the existing user data using the user ID
    axios
      .get("http://localhost:8080/nurse/get/" + userId)
      .then((response) => {
        const userData = response.data;
        if (userData.success && userData.NurseDetails.length > 0) {
          const user = userData.NurseDetails[0];
          setName(user.name);
          setLicense(user.license.toString());
          setDob(user.dob);
          setAge(user.age.toString());
        } else {
          console.error("No user data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // Handle error
      });
  }, [userId]);

  const handleSubmit = async() => {
    if (!name || !license || !dob || !age) {
        SetAlert(true);
        return;
    }

    await axios.put("http://localhost:8080/nurse/update/"+userId, { name, license, dob, age })
        .then(result => {
            window.location.reload();
            console.log(result);
        })
        .catch(err => console.log(err));

    onCloseUpdate();
}

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onCloseUpdate}>&times;</span>
          <h3>Update User Data</h3>

          {alert && (
            <p style={{ color: "red", textAlign: "center" }}>
              Please Fill All the Details...
            </p>
          )}

          <div className="input-group">
            <label htmlFor="name">NAME : </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="license">LICENSE : </label>
            <input
              type="text"
              name="license"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="dob">D-O-B : </label>
            <input
              type="text"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="age">AGE : </label>
            <input
              type="text"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button className="btn green" onClick={handleSubmit}>
            Update User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
