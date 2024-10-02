import React, { useState } from 'react';
import MenuItem from '../components/MenuItem';

const MenuSection = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.menuSection}>
      <h2 style={styles.menuCategory} onClick={toggleMenu}>
        {menu.category}
        <span style={styles.toggleIcon}>{isOpen ? '▲' : '▼'}</span>
      </h2>
      {isOpen && (
        <div style={styles.menuItemsContainer}>
          {menu.items.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  menuSection: {
    padding: '20px',
  },
  menuCategory: {
    fontSize: '28px',
    marginBottom: '10px',
    borderBottom: '2px solid #eee',
    paddingBottom: '5px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleIcon: {
    fontSize: '16px',
    marginLeft: '10px',
    color: '#777',
  },
  menuItemsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default MenuSection;
