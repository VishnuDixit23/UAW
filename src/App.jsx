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
        <Route path="/"             element={<Home />} />
        <Route path="/about"        element={<About />} />
        <Route path="/contact"      element={<ContactUs />} />
        <Route path="/ourwork"      element={<OurWork />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/team"         element={<Team />} />
        <Route path="/faqs"         element={<Faqs />} />
        <Route path="/gallery"      element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
