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
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToSection from "./components/ScrollToSection";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

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

  const PageWrapper = ({ children }) => (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );

  return (
    <>
      <Navbar />
      <ScrollToSection />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* Public Routes */}
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
          <Route path="/allDoctors" element={<PageWrapper><AllDoctors /></PageWrapper>} />
          <Route path="/doctor/:id" element={<PageWrapper><DoctorDetails /></PageWrapper>} />
          <Route path="/all-departments" element={<PageWrapper><AllDepartments /></PageWrapper>} />
          <Route path="/add-appointment" element={<PageWrapper><AddAppointment /></PageWrapper>} />

          {/* Protected Routes (User & Admin) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PageWrapper><Dashboard /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
             path="/profile"
             element={
               <ProtectedRoute>
                 <PageWrapper><Profile /></PageWrapper>
               </ProtectedRoute>
             }
          />
          <Route
            path="/my-appointments"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <PageWrapper><MyAppointment /></PageWrapper>
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/add-doctor"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageWrapper><AddDoctor /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-department"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageWrapper><AddDepartment /></PageWrapper>
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found */}
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />

        </Routes>
      </AnimatePresence>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
    </>
  );
}

export default App;
