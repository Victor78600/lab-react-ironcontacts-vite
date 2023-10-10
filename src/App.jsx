import "./App.css";
import { useState } from "react";
import jsonData from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(jsonData.slice(0, 5));

  const handleAddContacts = () => {
    const randomContact = jsonData[Math.floor(Math.random() * jsonData.length)];
    setContacts([...contacts, randomContact]);
  };

  const handleSortByName = () => {
    const copy = [...contacts];
    copy.sort((contactA, contactB) => {
      return sortByName(contactA.name, contactB.name);
    });
    setContacts(copy);
  };

  function sortByName(nameA, nameB) {
    return nameA.localeCompare(nameB, undefined, { sensitivity: "base" });
  }

  const handleSortByPopularity = () => {
    const copy = [...contacts];
    copy.sort((contactA, contactB) => {
      return contactB.popularity - contactA.popularity;
    });
    setContacts(copy);
  };

  const handleContactDelete = (numId) => {
    const contactsToKeep = contacts.filter((contact) => {
      return contact.id !== numId;
    });

    setContacts(contactsToKeep);
  };

  return (
    <>
      <div className="App">
        <h1>LAB | React IronContacts</h1>
        <button onClick={handleAddContacts}>Add Random Contact</button>
        <button onClick={handleSortByName}>Sort by Name</button>
        <button onClick={handleSortByPopularity}>Sort by popularity</button>
      </div>
      <table style={{ width: "1000px" }}>
        <thead>
          <tr style={{ height: "1.5em", font: "bold", fontSize: "1.5em" }}>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Oscar</th>
            <th>Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                {" "}
                <img
                  src={contact.pictureUrl}
                  alt=""
                  style={{ height: "150px" }}
                />
              </td>
              <td>
                <h2 style={{ fontSize: "1em" }}>{contact.name}</h2>
              </td>
              <td>
                <p>{contact.popularity.toFixed(2)}</p>
              </td>
              <td>
                <p>{contact.wonOscar && <p>🏆</p>}</p>
              </td>
              <td>
                <p>{contact.wonEmmy && <p>🏆</p>}</p>
              </td>
              <td>
                <button onClick={() => handleContactDelete(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
