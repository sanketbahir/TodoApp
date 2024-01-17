import "./App.css";

import { EmployeeData } from "./Components/EmployeeData";
import { useEffect, useState } from "react";

function App() {
  const [Data, setData] = useState([]);
  const [firstName, setFirstNmae] = useState("");
  const [lastName, setlastNmae] = useState("");
  const [age, setAge] = useState("");
  const [id, setid] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = Data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setid(id);
      setFirstNmae(dt[0].firstName);
      setlastNmae(dt[0].lastName);
      setAge(dt[0].age);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure to delete this item?`)) {
      if (id > 0) {
        const dt = Data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    const dt = [...Data];
    const newObject = {
      id: EmployeeData.length + 1,
      firstName: firstName,
      lastName: lastName,
      age: age,
    };

    dt.push(newObject);
    setData(dt);
  };

  const handleUpdate = () => {
    const index = Data.map((item, index) => {
      return item.id;
    }).indexOf(id);

    const dt = [...Data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt);
    handleClear();
  };
  const handleClear = (id) => {
    setid(0);
    setFirstNmae("");
    setlastNmae("");
    setAge("");
    setIsUpdate(false);
  };
  return (
    <>
      <div className="App">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <div>
            <label>First Name:</label>
            <input
              className="form-control"
              type="text"
              placeholder=" enter first name"
              onChange={(e) => setFirstNmae(e.target.value)}
              value={firstName}
            />
          </div>

          <div>
            <label>Last Name:</label>
            <input
              className="form-control"
              type="text"
              placeholder=" enter first name"
              onChange={(e) => setlastNmae(e.target.value)}
              value={lastName}
            />
          </div>

          <div>
            <label> Age:</label>
            <input
              className="form-control"
              type="text"
              placeholder=" enter age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </div>
          <div>
            {!isUpdate ? (
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={(event) => handleSave(event)}
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => handleUpdate()}
              >
                Update
              </button>
            )}

            <button
              type="button"
              className="btn btn-warning btn-sm"
              onClick={() => handleClear()}
            >
              Cleare
            </button>
          </div>
        </div>

        <table className="table table-striped ">
          <thead>
            <tr>
              <th>sr.no</th>
              <th>id</th>
              <th>first name</th>
              <th>last name</th>
              <th>age</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={(e) => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
