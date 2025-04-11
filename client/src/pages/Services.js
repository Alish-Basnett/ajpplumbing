import React, { useEffect, useState } from "react";
import "../styles/Services.css";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ajpplumbing-backend.onrender.com/api/services")
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched services:", data);
        setServices(data);
      })
      .catch((err) => console.error("Failed to load services:", err))
      .finally(() => setLoading(false));
  }, []);

  // Try to load image safely
  const getServiceImage = (index) => {
    try {
      return require(`../assets/serviceimage${index + 1}.jpg`);
    } catch (e) {
      console.warn(`Image for service ${index + 1} not found.`);
      return require(`../assets/serviceimage1.jpg`); // fallback image
    }
  };

  return (
    <div className="services-page">
      <header className="services-header">
        <h1>Our Plumbing Services</h1>
        <p>
          Experience the perfect blend of reliability and innovation. Our expert
          team is here to provide you with top-notch plumbing solutions to keep
          your home safe and comfortable.
        </p>
      </header>

      <div className="services-grid">
        {loading ? (
          <div className="spinner"></div>
        ) : services.length === 0 ? (
          <p className="no-services">No services listed yet.</p>
        ) : (
          services.map((service, index) => (
            <div key={service._id} className="service-card">
              <img
                src={getServiceImage(index)}
                alt={service.title}
                className="service-image"
              />
              <div className="service-card-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                {service.priceRange && (
                  <p className="service-price">
                    <strong>Price:</strong> {service.priceRange}
                  </p>
                )}
                <button className="service-btn">Learn More</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Services;
