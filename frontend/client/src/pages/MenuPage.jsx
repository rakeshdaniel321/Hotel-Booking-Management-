
import  { useMemo } from 'react';
import { useSelector } from 'react-redux';
import MenuCard from '../components/MenuCard';
import '../styles/MenuPage.css'
const MenuPage = () => {
  const menuItems = useSelector((state) => state.menu.items);

  // Performance Optimization: Cache grouped arrays to bypass recalculation on root renders
  const groupedMenu = useMemo(() => {
    return {
      starters: menuItems.filter(item => item.category === 'Starters'),
      mainCourse: menuItems.filter(item => item.category === 'Main Course'),
      beverages: menuItems.filter(item => item.category === 'Beverages')
    };
  }, [menuItems]);

  return (
    <main className="menu-page container">
      <header className="menu-page-header">
        <h1>Our Culinary Offerings</h1>
        <p>Explore curated plates designed to take your palate on an exceptional journey.</p>
      </header>

      {/* Category: Starters */}
      <section className="menu-category-section">
        <h2 className="category-title">Starters</h2>
        <div className="menu-grid">
          {groupedMenu.starters.map(item => (
            <MenuCard key={item.id} {...item} />
          ))}
        </div>
      </section>

      {/* Category: Main Course */}
      <section className="menu-category-section">
        <h2 className="category-title">Main Course</h2>
        <div className="menu-grid">
          {groupedMenu.mainCourse.map(item => (
            <MenuCard key={item.id} {...item} />
          ))}
        </div>
      </section>

      {/* Category: Beverages */}
      <section className="menu-category-section">
        <h2 className="category-title">Beverages</h2>
        <div className="menu-grid">
          {groupedMenu.beverages.map(item => (
            <MenuCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default MenuPage;