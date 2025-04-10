import "../styles/Home.css";
import React, { useRef } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Layout,
  Space,
  Carousel,
} from "antd";
import {
  PhoneOutlined,
  ToolOutlined,
  FireOutlined,
  ThunderboltOutlined,
  SmileOutlined,
  SafetyCertificateOutlined,
  StarOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const whyChooseItems = [
  {
    icon: <SafetyCertificateOutlined className="why-choose-icon" />,
    text: "Licensed & Insured",
  },
  {
    icon: <ToolOutlined className="why-choose-icon" />,
    text: "Transparent Pricing",
  },
  {
    icon: <ThunderboltOutlined className="why-choose-icon" />,
    text: "24/7 Availability",
  },
  {
    icon: <FireOutlined className="why-choose-icon" />,
    text: "Fast Response Time",
  },
  {
    icon: <SmileOutlined className="why-choose-icon" />,
    text: "Trusted by Locals",
  },
  {
    icon: <StarOutlined className="why-choose-icon" />,
    text: "Friendly, Certified Experts",
  },
];

const Home = () => {
  const carouselRef = useRef(null);

  return (
    <Layout
      style={{
        background: "#ffffff",
        position: "relative",
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      <Content style={{ padding: 0, position: "relative" }}>
        {/* FEATURES TICKER */}
        <div className="features-ticker">
          <div className="features-ticker-content">
            {[
              "🪪 Licensed & Insured",
              "🏷️ Transparent Pricing",
              "🕑 24/7 Availability",
              "🚀 Fast Response Time",
              "🙏🏻 Trusted by Locals",
              "😀 Friendly, Certified Experts",
              "🪪 Licensed & Insured",
              "🏷️ Transparent Pricing",
              "🕑 24/7 Availability",
              "🚀 Fast Response Time",
              "🙏🏻 Trusted by Locals",
              "😀 Friendly, Certified Experts",
            ].map((item, idx) => (
              <div className="feature-item" key={idx}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* HERO */}
        <motion.div
          className="hero-container"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >
          <div className="hero-image">
            <div className="hero-gradient" />
          </div>
          <div className="hero-content">
            <div className="hero-text-overlay">
              <Title className="hero-title">
                Reliable Plumbing Services in Melbourne
              </Title>
              <Paragraph className="hero-description">
                Fast, professional and affordable plumbing — from emergency
                repairs to full system installs.
              </Paragraph>
              <hr style={{ margin: "2rem 0" }} />
              <Space wrap>
                <Button type="primary" size="large" shape="round">
                  Request a Quote
                </Button>
                <Button
                  type="default"
                  size="large"
                  shape="round"
                  icon={<PhoneOutlined />}
                >
                  Call Now
                </Button>
              </Space>
            </div>
          </div>
        </motion.div>

        {/* WAVE SEPARATOR */}
        <svg viewBox="0 0 1440 320" style={{ display: "block" }}>
          <path
            fill="#d8ecf5"
            fillOpacity="1"
            d="M0,96L60,122.7C120,149,240,203,360,208C480,213,600,171,720,149.3C840,128,960,128,1080,138.7C1200,149,1320,171,1380,181.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>

        {/* SERVICES */}
        <div className="section services-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            <Title level={2} className="section-title">
              Our Services
            </Title>
            <Paragraph className="section-description">
              We offer a wide range of plumbing services designed to meet all
              residential and commercial needs with top-notch professionalism.
            </Paragraph>
          </motion.div>
          <Row gutter={[32, 32]} justify="center" style={{ marginTop: "3rem" }}>
            {[
              {
                icon: <FireOutlined className="service-icon" />,
                title: "Emergency Plumbing",
                desc: (
                  <p>24/7 fast-response emergency plumbing across Melbourne.</p>
                ),
              },
              {
                icon: <ThunderboltOutlined className="service-icon" />,
                title: "Leak Detection",
                desc: (
                  <p>
                    We locate and fix leaks with precision and advanced tools.
                  </p>
                ),
              },
              {
                icon: <ToolOutlined className="service-icon" />,
                title: "Drain Cleaning",
                desc: (
                  <p>We clear blocked drains fast with the latest equipment.</p>
                ),
              },
              {
                icon: <SafetyCertificateOutlined className="service-icon" />,
                title: "Hot Water Systems",
                desc: (
                  <p>Reliable installation and repair of hot water units.</p>
                ),
              },
              {
                icon: <SmileOutlined className="service-icon" />,
                title: "Toilet Repairs",
                desc: <p>From stubborn clogs to toilet replacements.</p>,
              },
              {
                icon: <StarOutlined className="service-icon" />,
                title: "Renovations",
                desc: (
                  <p>Full plumbing for bathroom, kitchen & laundry upgrades.</p>
                ),
              },
            ].map((item, idx) => (
              <Col xs={24} sm={12} md={8} key={idx}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeUp}
                  viewport={{ once: true }}
                >
                  <Card hoverable className="equal-height-card">
                    {item.icon}
                    <Title level={4}>{item.title}</Title>
                    <Paragraph>{item.desc}</Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>

        {/* WHY CHOOSE */}
        <div className="section why-choose-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            <Title level={2} className="section-title">
              Why Choose AJP
            </Title>
            <Paragraph className="section-description">
              We’re not just plumbers – we’re your reliable partners in comfort,
              safety and plumbing peace of mind.
            </Paragraph>
          </motion.div>
          <Row gutter={[24, 24]} justify="center" style={{ marginTop: "3rem" }}>
            {whyChooseItems.map((item, i) => (
              <Col xs={24} sm={12} md={8} key={i}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeUp}
                  viewport={{ once: true }}
                >
                  <Card hoverable className="equal-height-card">
                    {item.icon}
                    <div className="why-choose-text">{item.text}</div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>

        {/* TESTIMONIALS */}
        <div className="section testimonials-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            <Title level={2} className="section-title">
              Customer Reviews
            </Title>
          </motion.div>
          <Carousel
            autoplay
            autoplaySpeed={4000}
            dotPosition="bottom"
            ref={carouselRef}
          >
            {["Emily W.", "Mark J.", "Sophie K."].map((name, idx) => {
              const messages = [
                "Absolutely fantastic! They fixed our burst pipe at midnight. Highly recommend!",
                "Prompt and professional. Explained everything clearly and left the place spotless.",
                "Excellent service and very fair pricing. Will use again for sure.",
              ];
              return (
                <div key={idx}>
                  <Card className="carousel-card">
                    <Paragraph className="carousel-paragraph">
                      "{messages[idx]}"
                    </Paragraph>
                    <Text
                      className="carousel-text"
                      strong
                      style={{ display: "block", marginTop: "1rem" }}
                    >
                      – {name}
                    </Text>
                  </Card>
                </div>
              );
            })}
          </Carousel>
          <div className="carousel-arrows">
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              onClick={() => carouselRef.current.prev()}
            />
            <Button
              shape="circle"
              icon={<RightOutlined />}
              onClick={() => carouselRef.current.next()}
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
