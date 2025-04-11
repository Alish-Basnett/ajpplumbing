import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Button, Dropdown, Menu, Space } from "antd";
import { MenuOutlined, PhoneOutlined } from "@ant-design/icons";
import "./AppHeader.css";

const { Header } = Layout;

const AppHeader = () => {
  const [expanded, setExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [animateTooltip, setAnimateTooltip] = useState(false);

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/contact", label: "Contact" },
    { path: "/reviews", label: "Reviews" },
    { path: "/services", label: "Services" },
  ];

  const dropdownMenu = (
    <Menu>
      {menuItems.map(({ path, label }) => (
        <Menu.Item key={path}>
          <NavLink
            to={path}
            style={({ isActive }) => ({
              color: "#0077b6",
              fontWeight: "500",
              padding: "6px 12px",
              display: "block",
              borderRadius: "8px",
              backgroundColor: isActive ? "rgba(0,119,182,0.1)" : "transparent",
              border: isActive
                ? "1px solid rgba(0,119,182,0.3)"
                : "1px solid transparent",
              transition: "all 0.3s ease",
            })}
          >
            {label}
          </NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setShowTooltip(true);
      setTimeout(() => setAnimateTooltip(true), 100); // trigger fade-in
      setTimeout(() => setAnimateTooltip(false), 2900); // trigger fade-out
      setTimeout(() => setShowTooltip(false), 3500); // remove element
    }
  }, []);

  return (
    <>
      <Header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
          padding: "0 2rem",
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
            position: "relative",
          }}
        >
          <img src="/AJPLOGO.webp" alt="AJP Logo" style={{ height: "50px" }} />

          {/* Desktop Navigation */}
          <div className="desktop-menu">
            <nav style={{ display: "flex", gap: "1.5rem" }}>
              {menuItems.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  style={({ isActive }) => ({
                    color: "#0077b6",
                    fontWeight: "500",
                    padding: "6px 12px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "40px",
                    borderRadius: "8px",
                    backgroundColor: isActive
                      ? "rgba(0,119,182,0.1)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(0,119,182,0.3)"
                      : "1px solid transparent",
                    transition: "all 0.3s ease",
                  })}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="mobile-menu" style={{ position: "relative" }}>
            {showTooltip && (
              <div
                className={`custom-tooltip ${
                  animateTooltip ? "fade-in" : "fade-out"
                }`}
              >
                Tap here to open the menu for more options
                <span className="tooltip-arrow" />
              </div>
            )}
            <Dropdown
              overlay={dropdownMenu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button
                type="text"
                icon={
                  <MenuOutlined
                    style={{ fontSize: "1.6rem", color: "#003049" }}
                  />
                }
              />
            </Dropdown>
          </div>
        </div>
      </Header>

      {/* Emergency Floating Button */}
      <div style={{ position: "fixed", bottom: 30, right: 30, zIndex: 999 }}>
        <Space direction="vertical" align="end">
          {expanded && (
            <>
              <Button
                style={{
                  background: "#fff",
                  borderColor: "#1890ff",
                  color: "#1890ff",
                }}
              >
                +61 431 518 648
              </Button>
              <Button
                type="primary"
                icon={<PhoneOutlined />}
                style={{
                  backgroundColor: "#ff4d4f",
                  borderColor: "#ffc107",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
                onClick={() => (window.location.href = "tel:+61431518648")}
              >
                Call Now
              </Button>
            </>
          )}
          <Button
            type="primary"
            shape="circle"
            icon={<PhoneOutlined />}
            size="large"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
            onClick={() => setExpanded(!expanded)}
          />
        </Space>
      </div>
    </>
  );
};

export default AppHeader;
