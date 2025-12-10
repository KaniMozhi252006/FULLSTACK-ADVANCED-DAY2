
// import React, { useState, useEffect } from "react";
// import "./App.css";
// import axios from "axios";

// function App() {
//   const [foodName, setFoodName] = useState("");
//   const [daysSinceIAte, setDays] = useState("");
//   const [newFoodName, setNewFoodName] = useState("");
//   const [foodList, setFoodList] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3001/read").then((response) => {
//       setFoodList(response.data);
//     });
//   }, []);

//   const addToList = () => {
//     axios.post("http://localhost:3001/insert", {
//       foodName: foodName,
//       daysSinceIAte: daysSinceIAte,
//     });
//   };

//   const updateFood = (id) => {
//     axios.put("http://localhost:3001/update", {
//       id: id,
//       newFoodName: newFoodName,
//     });
//   };

//   const deleteFood = (id) => {
//     axios.delete(`http://localhost:3001/delete/${id}`);
//   };

//   return (
//     <div className="App">
//       <h1>CRUD App with MERN</h1>

//       <label>Food Name:</label>
//       <input
//         type="text"
//         onChange={(event) => {
//           setFoodName(event.target.value);
//         }}
//       />

//       <label>Days Since You Ate It:</label>
//       <input
//         type="number"
//         onChange={(event) => {
//           setDays(event.target.value);
//         }}
//       />

//       <button onClick={addToList}>Add to List</button>

//       <hr />
//       <h1>Food List</h1>

//       {foodList.map((val) => {
//         return (
//           <div key={val._id} className="foodCard">
//             <h3>Food Name: {val.foodName}</h3>
//             <h3>Days Since You Ate It: {val.days}</h3>

//             <input
//               type="text"
//               placeholder="New Food Name..."
//               onChange={(event) => {
//                 setNewFoodName(event.target.value);
//               }}
//             />

//             <button
//               onClick={() => {
//                 updateFood(val._id);
//               }}
//             >
//               Update
//             </button>

//             <button
//               onClick={() => {
//                 deleteFood(val._id);
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState("");
  const [newFoodName, setNewFoodName] = useState("");
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  },[foodList]);

  const addToList = () => {
    axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      daysSinceIAte: days,   // ✅ fixed field name
    });
  };

  const updateFood = (id) => {
    axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFoodName,
    });
  };

  const deleteFood = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>

      <label>Food Name:</label>
      <input
        type="text"
        onChange={(event) => {
          setFoodName(event.target.value);
        }}
      />

      <label>Days Since You Ate It:</label>
      <input
        type="number"
        onChange={(event) => {
          setDays(event.target.value);
        }}
      />

      <button onClick={addToList}>Add to List</button>

      <hr />
      <h1>Food List</h1>

      {foodList.map((val) => {
        return (
          <div key={val._id} className="foodCard">
            <h3>Food Name: {val.foodName}</h3>
            <h3>Days Since You Ate It: {val.daysSinceIAte}</h3> {/* ✅ fixed */}

            <input
              type="text"
              placeholder="New Food Name..."
              onChange={(event) => {
                setNewFoodName(event.target.value);
              }}
            />

            <button
              onClick={() => {
                updateFood(val._id);
              }}
            >
              Update
            </button>

            <button
              onClick={() => {
                deleteFood(val._id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
