import React from "react";
import { Typography, Space } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function FooterComponent() {
  return (
    <>
      {/* CONTACT DETAILS SECTION */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        style={{
          background: "#002f6c",
          color: "#fff",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <Title level={2} style={{ color: "#fff" }}>
          Let's Get Your Plumbing Sorted
        </Title>
        <Paragraph style={{ color: "#fff" }}>
          Contact us now and speak with a real plumber who cares.
        </Paragraph>
        <Space direction="vertical" size="middle" style={{ marginTop: "2rem" }}>
          <Text style={{ color: "#fff" }}>
            <PhoneOutlined /> +61 431 518 648
          </Text>
          <Text style={{ color: "#fff" }}>
            <MailOutlined /> info@ajpplumbingservices.com.au
          </Text>
          <Text style={{ color: "#fff" }}>
            <EnvironmentOutlined /> Melbourne & surrounding regions
          </Text>
        </Space>
      </motion.div>

      {/* FOOTER COPYRIGHT */}
      <footer
        style={{
          textAlign: "center",
          background: "#001529",
          color: "#fff",
          fontFamily: "'Open Sans', sans-serif",
        }}
      >
        <div style={{ padding: "1.5rem 0", fontSize: "0.9rem" }}>
          AJP Plumbing Services ©{new Date().getFullYear()} | Quality Work.
          Honest Pricing.
        </div>
      </footer>
    </>
  );
}

export default FooterComponent;
