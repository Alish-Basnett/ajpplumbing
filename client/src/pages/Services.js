import React, { useEffect, useState } from "react";
import "../styles/Services.css";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Failed to load services:", err));
  }, []);

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
        {services.length === 0 ? (
          <p className="no-services">No services listed yet.</p>
        ) : (
          services.map((service, index) => (
            <div key={service._id} className="service-card">
              <img
                src={require(`../assets/serviceimage${index + 1}.jpg`)}
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
