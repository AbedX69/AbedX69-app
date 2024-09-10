import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="about-intro">
        <h1>Welcome to AbedX69</h1>
        <p>
          At AbedX69, we're passionate about creating unique solutions and
          products that empower our users to achieve their goals. Our journey
          started with a vision to bring innovation and creativity into everyday
          experiences, and we’ve been growing ever since!
        </p>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to deliver top-tier, personalized products and services
          that cater to the diverse needs of our community. We believe in the
          power of technology and design to make a difference in the world. By
          combining creativity, passion, and expertise, we strive to exceed the
          expectations of every customer.
        </p>
      </section>

      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
          <img src="/images/image1.jpg" alt="Team Member 1" />
          <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
          <img src="/images/image2.jpg" alt="Team Member 2" />
          <h3>Jane Smith</h3>
            <p>Chief Technology Officer</p>
          </div>
          <div className="team-member">
          <img src="/images/image3.jpg" alt="Team Member 3" />
          <h3>Sarah Johnson</h3>
            <p>Lead Designer</p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <h2>Our Values</h2>
        <ul>
          <li>Innovation: We believe in pushing the boundaries of what’s possible.</li>
          <li>Integrity: Honesty and transparency are at the core of everything we do.</li>
          <li>Customer Focus: Our customers’ success is our success.</li>
          <li>Collaboration: Together, we achieve more.</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
