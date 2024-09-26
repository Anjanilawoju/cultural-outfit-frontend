import "./App.css";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./Route";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnFocusLoss
      />
    </>
  );
}

export default App;
