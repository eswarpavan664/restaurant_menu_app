import React from 'react';

const RestaurantHeader = ({ restaurant }) => {
  return (
    <div style={styles.headerContainer}>
      <img src={restaurant.image} alt={restaurant.name} style={styles.headerImage} />
      <div style={styles.headerDetails}>
        <h1 style={styles.restaurantName}>{restaurant.name}</h1>
        <p style={styles.restaurantAddress}>{restaurant.address}</p>
      </div>
    </div>
  );
};

const styles = {
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  headerImage: {
    width: '150px',
    height: '150px',
    borderRadius: '10px',
    objectFit: 'cover',
    marginRight: '20px',
  },
  headerDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: '32px',
    margin: '0 0 10px 0',
  },
  restaurantAddress: {
    fontSize: '18px',
    color: '#555',
  },
};

export default RestaurantHeader;
