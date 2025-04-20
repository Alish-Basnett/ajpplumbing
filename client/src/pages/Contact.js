import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "../styles/Contact.css";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ToolOutlined,
  StarOutlined,
  SmileOutlined,
} from "@ant-design/icons";

function Contact() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^(\+614|04)\d{8}$/.test(formData.phone)) {
      errs.phone = "Invalid Australian phone number";
    }
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true); // Start spinner

    try {
      const serviceId = "service_tqp1n8t";
      const contactTemplateId = "template_42v7u5d";
      const autoReplyTemplateId = "template_908orhp";
      const publicKey = "m2fHjzz3OIB691Bli";

      // ✅ 1. Save to backend database
      await fetch("https://ajpplumbing-backend.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // ✅ 2. Send email to YOU via EmailJS
      await emailjs.send(serviceId, contactTemplateId, formData, publicKey);

      // ✅ 3. Auto-reply to USER via EmailJS
      await emailjs.send(serviceId, autoReplyTemplateId, formData, publicKey);

      setStatus("✅ Message sent!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});

      // ✅ 4. Google Ads Conversion Event
      if (window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-16881512764/oNeqCL3Y37oaELzi3fE-",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send message");
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-grid">
          <div className="contact-inspiration hide-on-mobile">
            <h1>
              <SmileOutlined /> Let’s Talk Plumbing
            </h1>
            <p>
              Have a leak, a project idea, or just want peace of mind? Reach out
              to us and experience friendly, professional help that’s just one
              form away.
            </p>
            <ul>
              <li>
                <ToolOutlined /> Certified plumbing experts
              </li>
              <li>
                <StarOutlined /> Trusted by hundreds of happy clients
              </li>
              <li>
                <EnvironmentOutlined /> Proudly serving Melbourne & surrounds
              </li>
            </ul>
          </div>

          <div className="contact-form-container">
            <h2 className="form-heading">
              <span className="mobile-only">
                <SmileOutlined />
              </span>
              Let’s Talk Plumbing
            </h2>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact-form"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}

              <input
                type="text"
                name="phone"
                placeholder="Your Phone (e.g. 0412345678 or +61412345678)"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="error">{errors.phone}</p>}

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <p className="error">{errors.message}</p>}

              <button type="submit">Send Message</button>
              {loading && <div className="spinner"></div>}
            </form>
            {status && <p className="status">{status}</p>}
          </div>
        </div>
      </div>

      <div className="contact-info">
        <div className="info-section">
          <div className="info-text">
            <h2>
              <PhoneOutlined /> Our Dedicated Team
            </h2>
            <p>
              Our team of certified plumbing experts is here to provide
              top-notch service around the clock. We pride ourselves on quality,
              reliability, and friendly service.
            </p>
            <ul>
              <li>
                <PhoneOutlined /> +61 431 518 648
              </li>
              <li>
                <MailOutlined /> info@ajpplumbingservices.com.au
              </li>
              <li>
                <EnvironmentOutlined /> Melbourne & Surrounding Regions
              </li>
            </ul>
          </div>
          <div className="info-image">
            <img src={require("../assets/sunrise-bg.jpg")} alt="Our Team" />
          </div>
        </div>

        <div className="info-section">
          <div className="info-text">
            <h2>
              <StarOutlined /> Quality & Innovation
            </h2>
            <p>
              We combine traditional craftsmanship with modern techniques to
              deliver reliable, efficient, and innovative plumbing solutions
              that exceed expectations.
            </p>
          </div>
          <div className="info-image">
            <img
              src={require("../assets/plumbing-bg.jpg")}
              alt="Our Services"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
