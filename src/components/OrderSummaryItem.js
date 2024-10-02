import React from 'react';

const OrderSummaryItem = ({ item }) => {
  return (
    <div style={styles.itemContainer}>
      <h3 style={styles.itemName}>{item.name}</h3>
      <p style={styles.itemPrice}>₹{item.price}</p>
    </div>
  );
};

const styles = {
  itemContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  itemName: {
    fontSize: '18px',
  },
  itemPrice: {
    fontSize: '18px',
    color: '#777',
  },
};

export default OrderSummaryItem;
