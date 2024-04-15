import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Router/Route";
import Scrollanimation from "./Components/Scrollanimation";

function App() {
  return (
    <>
      <div >
        {/* <Scrollanimation></Scrollanimation> */}
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
