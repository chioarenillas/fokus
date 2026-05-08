import { Link } from "react-router-dom";
import "./Home.css";

export default function Home(): React.JSX.Element {
  return (
    <main className="homeContainer">

      <section className="heroSection">
        <div className="heroOverlay">
          <span className="heroBadge">Productivity made simple</span>
          <h1>Organize your tasks in a smarter, cleaner and more visual way.</h1>
          <p>Fokus helps you manage projects, track progress and stay focused
            without the chaos of traditional tools.</p>
          <div className="heroButtons">
            <Link to="/login" className="button">
              Get Started
            </Link>
            <Link to="/about" className="secondaryButton">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="featuresSection">
        <div className="sectionHeader">
          <h2>Everything you need to stay productive</h2>
          <p>Built for developers, teams and creators who want a clean and
            focused workflow.</p>
        </div>
        <div className="featuresGrid">
          <article className="featureCard">
            <div className="featureIcon">📋</div>
            <h3>Task Management</h3>
            <p>Create, organize and track all your tasks from a single dashboard.</p>
          </article>

          <article className="featureCard">
            <div className="featureIcon">📈</div>
            <h3>Progress Tracking</h3>
            <p>Visualize your productivity and monitor your weekly progress
              easily.</p>
          </article>
          <article className="featureCard">
            <div className="featureIcon">⚡</div>
            <h3>Fast & Minimal</h3>
            <p>A lightweight interface focused on speed, clarity and simplicity.</p>
          </article>
        </div>
      </section>

      <section className="ctaSection">
        <div className="ctaCard">
          <h2>Start organizing your workflow today.</h2>
          <p>Join thousands of users improving their productivity with Fokus.</p>

          <Link to="/register" className="button">
            Create Free Account
          </Link>
        </div>
      </section>
    </main>
  );
}
