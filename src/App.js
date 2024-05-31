import "./App.css";
import { ToastContainer } from "react-toastify";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <>
      <PublicRoutes />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
