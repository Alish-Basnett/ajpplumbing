import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "./AppHeader";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";
import Services from "./pages/Services";
import FooterComponent from "./components/Footer";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />
        <Content style={{ marginTop: "64px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/services" element={<Services />} />
          </Routes>
          <FooterComponent />
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
