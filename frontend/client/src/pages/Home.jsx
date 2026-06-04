
import Hero from '../components/Hero';
import '../styles/HomePage.css'
const Home = () => {
  const handleExploreMenu = () => {
    // Navigate or scroll smoothly to menu section
    console.log('Navigating to menu...');
  };

  return (
    <main className="home-page">
      <Hero 
        title="Welcome to Urban Spoon"
        subtitle="Experience exquisite flavors crafted by world-class chefs."
        backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
        ctaText="Explore Our Menu"
        onCtaClick={handleExploreMenu}
      />
      
      <section className="intro-welcome container">
        <h2>Our Culinary Philosophy</h2>
        <p>
          At Urban Spoon, we bring together fresh, locally sourced ingredients 
          with modern culinary innovations to offer an unforgettable dining experience.
        </p>
      </section>
    </main>
  );
};

export default Home;