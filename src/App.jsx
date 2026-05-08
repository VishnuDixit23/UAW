import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import OurWork from "./pages/Mun";
import Registration from "./pages/Registration";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Faqs from "./pages/Faqs";
import LegalTransparency from "./pages/LegalTransparency";
import ProgrammeDetail from "./pages/ProgrammeDetail";
import Login from "./pages/Login";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import Policy from "./pages/Policy";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/about"           element={<About />} />
        <Route path="/contact"         element={<ContactUs />} />
        <Route path="/ourwork"         element={<OurWork />} />
        <Route path="/ourwork/:id"     element={<ProgrammeDetail />} />
        <Route path="/registration"    element={<Registration />} />
        <Route path="/team"            element={<Team />} />
        <Route path="/faqs"            element={<Faqs />} />
        <Route path="/gallery"         element={<Gallery />} />
        <Route path="/legal"           element={<LegalTransparency />} />
        <Route path="/login"           element={<Login />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        <Route path="/policy"          element={<Policy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
