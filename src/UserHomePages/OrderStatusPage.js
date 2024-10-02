import React, { useEffect, useState } from 'react';

const OrderStatusPage = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const storedOrderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    setOrderDetails(storedOrderDetails);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Order Status</h1>
      {orderDetails ? (
        <div style={styles.orderDetails}>
          <h2>Order Summary</h2>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index} style={styles.item}>
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
          <p style={styles.total}>Total: ₹{orderDetails.total}</p>
          <div style={styles.animation}>
            <h3>Food Preparation</h3>
            {/* Add your food preparation animation here */}
          </div>
          <div style={styles.paymentStatus}>
            <h3>Payment Status: {orderDetails.isPaid ? "Paid" : "Pending"}</h3>
          </div>
        </div>
      ) : (
        <p>No order details available.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#1e90ff',
  },
  orderDetails: {
    marginTop: '20px',
  },
  item: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  total: {
    fontWeight: 'bold',
    marginTop: '10px',
  },
  animation: {
    marginTop: '20px',
  },
  paymentStatus: {
    marginTop: '20px',
  },
};

export default OrderStatusPage;
