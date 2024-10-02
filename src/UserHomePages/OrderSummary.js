import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import OrderSummaryItem from '../../components/OrderSummaryItem';

const OrderSummaryPage = () => {
  const [instructions, setInstructions] = useState([]);
  const [waterBottle, setWaterBottle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpValue, setOtpValue] = useState(["", "", "", ""]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showResendOtp, setShowResendOtp] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const history = useHistory();

  // Mock data for selected items
  const selectedItems = [
    { id: 1, name: "Paneer Tikka", price: 250 },
    { id: 2, name: "Biryani", price: 350 },
  ];

  // Options for special instructions
  const instructionOptions = ["Less Spicy", "Extra Cheese", "No Onions"];

  // Calculate subtotal
  const subtotal = selectedItems.reduce((acc, item) => acc + item.price, 0);

  // Price for water bottle
  const waterBottlePrice = waterBottle === "Cool Water Bottle" ? 20 : 15;

  // Calculate total
  const total = subtotal + (waterBottle ? waterBottlePrice : 0);

  // Effect to check if mobile number is already in local storage
  useEffect(() => {
    const storedNumber = localStorage.getItem("mobileNumber");
    if (storedNumber) {
      setMobileNumber(storedNumber);
    }
  }, []);

  const handleContinue = () => {
    setIsModalOpen(true);
  };

  const handleOtpModalOpen = () => {
    if (validateMobileNumber(mobileNumber)) {
      setOtpSent(true);
      setShowResendOtp(false);
      setIsOtpModalOpen(true);
      setIsModalOpen(false);
    } else {
      alert("Please enter a valid mobile number.");
    }
  };

  const validateMobileNumber = (number) => {
    return /^\d{10}$/.test(number);
  };

  const handleOtpChange = (index, value) => {
    const newOtpValue = [...otpValue];
    newOtpValue[index] = value;
    setOtpValue(newOtpValue);
    if (index < 3 && value) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleConfirmOtp = () => {
    const otpCode = otpValue.join("");
    if (otpCode.length === 4) {
      localStorage.setItem("mobileNumber", mobileNumber);
      setIsOtpModalOpen(false);
      setOrderPlaced(true);
      // Store order details
      const orderDetails = {
        items: selectedItems,
        total,
        isPaid: false,
      };
      localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
      // Show confirmation message
      setConfirmationVisible(true);
      // Redirection will be handled in handlePlaceOrder
    } else {
      alert("Please enter a valid OTP.");
    }
  };

  const handleResendOtp = () => {
    if (validateMobileNumber(mobileNumber)) {
      setOtpSent(true);
      setShowResendOtp(false);
      alert("OTP has been resent to your mobile number.");
    } else {
      alert("Please enter a valid mobile number.");
    }
  };

  const handlePlaceOrder = () => {
    if (!orderPlaced) {
      setOrderPlaced(true);
      setConfirmationVisible(true);
      // Redirect to OrderStatusPage after 3 seconds
      setTimeout(() => {
        setConfirmationVisible(false);
        history.push('/order-status');
      }, 3000); // 3 seconds
    }
  };

  const handleChangeNumber = () => {
    setIsOtpModalOpen(false);
    setIsModalOpen(true);
  };

  const handleCloseConfirmation = () => {
    setOrderPlaced(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Order Summary</h1>
      <div style={styles.orderItems}>
        {selectedItems.map(item => (
          <OrderSummaryItem key={item.id} item={item} />
        ))}
      </div>

      <div style={styles.instructionsContainer}>
        <label>Select Special Instructions:</label>
        <select
          multiple
          value={instructions}
          onChange={(e) => setInstructions([...e.target.selectedOptions].map(option => option.value))}
          style={styles.select}
        >
          {instructionOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.waterBottleContainer}>
        <label>Add Water Bottle:</label>
        <select
          value={waterBottle}
          onChange={(e) => setWaterBottle(e.target.value)}
          style={styles.select}
        >
          <option value="">Select Water Bottle</option>
          <option value="Cool Water Bottle">Cool Water Bottle (+ ₹20)</option>
          <option value="Normal Water Bottle">Normal Water Bottle (+ ₹15)</option>
        </select>
      </div>

      <div style={styles.summary}>
        <p>Subtotal: ₹{subtotal}</p>
        {waterBottle && <p>Water Bottle: ₹{waterBottlePrice}</p>}
        <h3>Total: ₹{total}</h3>
      </div>

      {!orderPlaced ? (
        <>
          {mobileNumber ? (
            <>
              <button style={styles.confirmButton} onClick={handlePlaceOrder}>
                Confirm Order
              </button>
              <button style={styles.confirmButton} onClick={handlePlaceOrder}>
                Make Payment
              </button>
              <div style={styles.mobileNumber}>
                <p>Customer Number: {mobileNumber}</p>
              </div>
            </>
          ) : (
            <button style={styles.confirmButton} onClick={handleContinue}>
              Continue
            </button>
          )}

          {isModalOpen && (
            <div style={styles.modal}>
              <div style={styles.modalContent}>
                <h2>Enter Mobile Number</h2>
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  style={styles.input}
                />
                <button style={styles.modalButton} onClick={handleOtpModalOpen}>
                  Send OTP
                </button>
              </div>
            </div>
          )}

          {isOtpModalOpen && (
            <div style={styles.modal}>
              <div style={styles.modalContent}>
                <h2>Enter OTP</h2>
                <div style={styles.otpContainer}>
                  {otpValue.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={value}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      style={styles.otpInput}
                    />
                  ))}
                </div>
                <button style={styles.modalButton} onClick={handleConfirmOtp}>
                  Confirm OTP
                </button>
                {showResendOtp && (
                  <button style={styles.modalButton} onClick={handleResendOtp}>
                    Resend OTP
                  </button>
                )}
                <button style={styles.modalButton} onClick={handleChangeNumber}>
                  Change Number
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        confirmationVisible && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h2>Order Successfully Placed!</h2>
              <p>😊</p>
            </div>
          </div>
        )
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
  orderItems: {
    marginBottom: '20px',
  },
  instructionsContainer: {
    marginBottom: '20px',
  },
  waterBottleContainer: {
    marginBottom: '20px',
  },
  summary: {
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  confirmButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#1e90ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  mobileNumber: {
    marginTop: '10px',
    fontWeight: 'bold',
  },
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  otpContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  otpInput: {
    width: '40px',
    height: '40px',
    textAlign: 'center',
    fontSize: '20px',
    margin: '0 5px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  modalButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#1e90ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default OrderSummaryPage;
