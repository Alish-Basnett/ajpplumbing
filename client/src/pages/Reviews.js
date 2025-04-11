import React, { useEffect, useState } from "react";
import "../styles/Reviews.css";
import { Rate } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  UserOutlined,
  FacebookFilled,
  InstagramOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

function Reviews() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Start spinner before fetch
    fetch("https://ajpplumbing-backend.onrender.com/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Failed to load reviews:", err))
      .finally(() => setLoading(false)); // Stop spinner
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Invalid email";
    }
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      errs.rating = "Rating must be between 1 and 5";
    }
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleRatingChange = (value) => {
    setFormData({ ...formData, rating: value });
    setErrors({ ...errors, rating: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true); // Show spinner

    try {
      const res = await fetch(
        "https://ajpplumbing-backend.onrender.com/api/reviews",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Review submitted!");
        setFormData({ name: "", email: "", rating: 0, message: "" });
        setErrors({});
        const updated = await fetch(
          "https://ajpplumbing-backend.onrender.com/api/reviews"
        );
        const updatedData = await updated.json();
        setReviews(updatedData);
      } else {
        setStatus(`❌ Error: ${data.error || "Failed to submit review"}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Network error");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="reviews-page">
      <header className="reviews-header">
        <h1>Hear From Our Clients</h1>
        <p>
          At AJP Plumbing, our passion for excellence is fueled by your
          feedback. Share your experience and help us keep innovating.
        </p>
      </header>
      <section className="review-form-ratings-section">
        <div className="left-ratings">
          <div className="rating-display fb-rating">
            <FacebookFilled className="rating-icon" />
            <h3>Facebook</h3>
            <Rate disabled value={5} />
            <p>5.0 Average Rating</p>
          </div>
          <div className="rating-display insta-rating">
            <InstagramOutlined className="rating-icon" />
            <h3>Instagram</h3>
            <Rate disabled value={5} />
            <p>5.0 Average Rating</p>
          </div>
        </div>
        <div className="review-form-container">
          <h2>Share Your Experience</h2>
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email (optional)"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group rating-group">
              <label>Rating:</label>
              <Rate
                value={formData.rating}
                onChange={handleRatingChange}
                allowClear
              />
              {errors.rating && <span className="error">{errors.rating}</span>}
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Review"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && (
                <span className="error">{errors.message}</span>
              )}
            </div>
            <button type="submit">Submit Review</button>
            {loading && <div className="spinner"></div>}
          </form>
          {status && <p className="review-status">{status}</p>}
        </div>
        <div className="right-ratings">
          <div className="rating-display google-rating">
            <GoogleOutlined className="rating-icon" />
            <h3>Google</h3>
            <Rate disabled value={5} />
            <p>5.0 Average Rating</p>
          </div>
          <div className="rating-display twitter-rating">
            <TwitterOutlined className="rating-icon" />
            <h3>Twitter</h3>
            <Rate disabled value={5} />
            <p>5.0 Average Rating</p>
          </div>
        </div>
      </section>
      <section className="review-list-section">
        <h2>Client Testimonials</h2>
        {loading ? (
          <div className="spinner" style={{ marginTop: "2rem" }}></div>
        ) : reviews.length === 0 ? (
          <p className="no-reviews">
            No reviews yet. Be the first to share your amazing experience!
          </p>
        ) : (
          <div className="review-grid">
            {reviews.map((review) => (
              <motion.div
                className="review-card"
                key={review._id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="review-card-header">
                  <div className="reviewer-left">
                    <UserOutlined className="avatar" />
                    <div className="reviewer-info">
                      <h3>{review.name}</h3>
                      <Rate disabled value={review.rating} />
                    </div>
                  </div>
                  <div className="reviewer-thumb">
                    {review.rating <= 2 ? (
                      <DislikeOutlined
                        style={{ color: "#e63946", fontSize: "1.8rem" }}
                      />
                    ) : (
                      <LikeOutlined
                        style={{ color: "#43aa8b", fontSize: "1.8rem" }}
                      />
                    )}
                  </div>
                </div>
                <p className="review-text">{review.message}</p>
                <div className="review-footer">
                  <small>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Reviews;
