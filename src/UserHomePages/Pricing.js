import React from 'react';

const Pricing = () => {
  return (
    <div style={styles.container}>
    
      <div style={styles.card}>
        {/* <img src="starter.svg" alt="Starter" style={styles.image} /> */}
        <h3 style={styles.heading}>Monthly</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}>✔ Prebuild menus</li>
          <li style={styles.listItem}>✔ download monthly report</li>
          <li style={styles.listItem}>✔ Manage orders</li>
          <li style={styles.listItem}>✔ QRcode generate</li>
        </ul>
        <h4 style={styles.price}>₹599/month</h4>
        <button style={styles.button}>I WANT IT</button>
      </div>

      <div style={styles.card}>
        {/* <img src="professional.svg" alt="Professional" style={styles.image} /> */}
        <h3 style={styles.heading}>Yearly</h3>
        <ul style={styles.list}>
         <li style={styles.listItem}>✔ Prebuild menus</li>
          <li style={styles.listItem}>✔ download monthly report</li>
          <li style={styles.listItem}>✔ Manage orders</li>
          <li style={styles.listItem}>✘ QRcode generate</li>
        </ul>
        <h4 style={styles.price}>₹7000/year</h4>
        <button style={styles.button}>I WANT IT</button>
      </div>

      {/* <div style={styles.card}>
        <img src="business.svg" alt="Business" style={styles.image} />
        <h3 style={styles.heading}>BUSINESS</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}>✔ 20 full user</li>
          <li style={styles.listItem}>✔ Unlimited contact per clients</li>
          <li style={styles.listItem}>✔ Lorem ipsum dolor</li>
          <li style={styles.listItem}>✘ Lorem ipsum dolor</li>
        </ul>
        <h4 style={styles.price}>$45/month</h4>
        <button style={styles.button}>I WANT IT</button>
      </div> */}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '20px',
    
    margin: 0,
    padding: 0,
    height: '100vh',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    padding: '20px',
    textAlign: 'center',
    width: '250px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)', // Shadow effect
    transition: 'transform 0.2s',
  },
  cardHover: {
    transform: 'scale(1.05)',
  },
  image: {
    width: '100px',
    height: 'auto',
    marginBottom: '15px',
  },
  heading: {
    margin: '0px 0',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'left',
    margin: '15px 0',
  },
  listItem: {
    padding: '5px 0',
  },
  price: {
    fontSize: '24px',
    margin: '20px 0',
  },
  button: {
    backgroundColor: '#7b2cbf',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default Pricing;
