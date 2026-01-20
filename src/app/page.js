import HomePage from "../components/Home";
import ScrollToTopButton from "../components/functions/ScrollToTopButton/ScrollToTopButton";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div>
        <h1
          style={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: 700,
            letterSpacing: "0.5px",
            padding: "10px 0",
            margin: 0,
          }}
        >
          Segment Tree Visualizer
        </h1>
        <HomePage />
        <ScrollToTopButton />
      </div>
    </>
  );
}
