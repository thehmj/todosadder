import React, { useState } from "react";
import '../Styles/Addtolist.css';
const Addtolist = ({setchanges}) => {
  const [item, SetItem] = useState('');
  const [showtop, setshowtop] = useState(false);
 
  const AddItem = async (e) => {
    e.preventDefault();
    const response = await fetch('https://todosadderbackend.onrender.com/api/addtolist', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item
      })
    })
    if (response.status === 400) {
      alert('empty');
    }
    SetItem('')
    setchanges(true);
  }

  return (
    <div>
    <button className="button" onClick={()=> showtop ? setshowtop(false): setshowtop(true)}>{showtop ? 'x Close': "+ Add Item"}</button>
      
      {
      showtop ?
    <form onSubmit={(e) => AddItem(e)} className="Add">
      <h2>Add Item</h2>
      <div>
      <textarea name="item" placeholder="Enter Activity here" value={item} id="item"  onChange={(e) => SetItem(e.target.value)} required></textarea>
      </div>
      <button className="button" type="submit" >ADD</button>
    </form>
    : <div></div>
    }
    
    </div>
  );
}

export default Addtolist;