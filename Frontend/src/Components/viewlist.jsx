import React, { useEffect, useState } from "react";
import '../Styles/viewlist.css';
import BarLoader from 'react-spinners/BarLoader'
const Viewlist = ({ changes, setchanges }) => {
  const [loading, setLoading] = useState(false);
  const [dragId, setDragId] = useState();
  const [boxes, setBoxes] = useState([]);
  useEffect(() => {
    const getpost = async () => {
      setLoading(true);
      const response = await fetch('https://todosadderbackend.onrender.com/api/getlist', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setLoading(false);
      const { getlist } = await response.json();
      setBoxes(getlist);

    }
    setchanges(false);
    getpost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changes])

  const handlecheckbox = async ({ id, value }) => {
    await fetch('https://todosadderbackend.onrender.com/api/updatecheck', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        value
      })
    })
    setchanges(true);
  }
  const handleDrag = (ev) => {
    console.log(ev.currentTarget.id, 'ff');
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev) => {
    const dragBox = boxes.find((box) => box._id === dragId);
    const dropBox = boxes.find((box) => box._id === ev.currentTarget.id);
    console.log(dragBox);

    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;

    const newBoxState = boxes.map((box) => {
      if (box._id === dragId) {
        box.order = dropBoxOrder;
      }
      if (box._id === ev.currentTarget.id) {
        box.order = dragBoxOrder;
      }
      return box;
    });
    const updateorder = async () => {
      const response = await fetch('https://todosadderbackend.onrender.com/api/updatelist', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id1: dragId,
          id2: ev.currentTarget.id,
          order1: dropBoxOrder,
          order2: dragBoxOrder

        })
      })
      if (response.status === 400) {
        alert('ddd');
      }

    }
    updateorder();

    setBoxes(newBoxState);
  };

  return (
    <div>

      <h1 className="viewlist_title">A List of Activities</h1>
      {loading ?
        <div className="centre">
          <BarLoader />
        </div>
        : <></>}
      {boxes
        .sort((a, b) => a.order - b.order)
        .map((box) => {
          return (
            <>
              <div
                id={box._id}
                className="box"
                draggable={true}
                onDragOver={(ev) => ev.preventDefault()}
                onDragStart={handleDrag}
                onDrop={handleDrop}
              >
                <span>
                  <input type="checkbox" className="checkbox" checked={box.check} onClick={() => handlecheckbox({ id: box._id, value: box.check })} />

                </span>

                <span>{box.order}</span>
                <span>
                  {box.item}
                </span>


              </div>

            </>
          )
        })
      }
    </div>
  );
}
export default Viewlist;