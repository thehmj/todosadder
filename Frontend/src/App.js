import { useState } from "react";
import Addtolist from "./Components/Addtolist";
import Viewlist from "./Components/viewlist";


const App = () => {
  const [changes, setchanges]= useState(false);
  return(
    <>
  <Addtolist  setchanges={setchanges}/>
  <Viewlist  changes={changes} setchanges={setchanges}/>
  </>
  )
 
};

export default App;