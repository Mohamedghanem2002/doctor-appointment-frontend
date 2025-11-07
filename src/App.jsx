import "./App.css";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import AddAppointment from "./pages/AddAppointment";
import AddDoctor from "./pages/AddDoctor";
import AllDoctors from "./pages/AllDoctors";
import DoctorDetails from "./pages/DoctorDetails";
import MyAppointment from "./pages/MyAppointment";
import AddDepartment from "./pages/AddDepartment";
import AllDepartments from "./pages/AllDepartments";
import ScrollToSection from "./components/ScrollToSection";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.5,
  };

  return (
    <>
      <Navbar />
      <ScrollToSection />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {[
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/add-appointment", element: <AddAppointment /> },
            { path: "/add-doctor", element: <AddDoctor /> },
            { path: "/my-appointments", element: <MyAppointment /> },
            { path: "/allDoctors", element: <AllDoctors /> },
            { path: "/doctor/:id", element: <DoctorDetails /> },
            { path: "/add-department", element: <AddDepartment /> },
            { path: "/all-departments", element: <AllDepartments /> },
          ].map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="min-h-screen"
                >
                  {element}
                </motion.div>
              }
            />
          ))}
        </Routes>
      </AnimatePresence>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
