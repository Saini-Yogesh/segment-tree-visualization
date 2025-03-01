import TreeVisualizer from "../components/TreeVisualizer";
import ScrollToTopButton from "../components/functions/ScrollToTopButton/ScrollToTopButton";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

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
        <h1 style={{ textAlign: "center", padding: "4px" }}>
          Segment Tree Visualizer
        </h1>
        <TreeVisualizer />
        <ScrollToTopButton />
      </div>
    </>
  );
}
