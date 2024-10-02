import React from 'react';
import { useParams } from 'react-router-dom';
import RestaurantHeader from "../../components/RestaurantHeader.js";
import MenuSection from '../../components/MenuSection.js';
import restaurantimg from "../../asserts/Best-Restaurants-in-Bangalore.jpg";
import pannertikka from "../../asserts/Paneer-Tikka-Featured-1.jpg";
import chickenwings from "../../asserts/Baked-Chicken-Wings-3-500x500.jpg";
import biryani from "../../asserts/chickenbiryanibowltop-500x500.jpg";
import butterchicken from "../../asserts/butter-chicken-ac2ff98.jpg";

const RestaurantPage = () => {
  // Get the restaurant ID from the URL
  const { id } = useParams();
  console.log("Restaurant ID:", id);

  // Check if the screen size is larger than 768px
  const isDesktop = window.innerWidth >= 768;

  // Sample restaurant data
  const restaurant = {
    name: "The Great Indian Restaurant",
    address: "123 Street, City, State, Zip",
    image: restaurantimg,
  };

  const menus = [
    {
      category: "Starters",
      items: [
        {
          id: 1,
          name: "Paneer Tikka",
          description: "Spicy marinated paneer grilled to perfection.",
          image: pannertikka,
        },
        {
          id: 2,
          name: "Chicken Wings",
          description: "Crispy fried wings with a tangy sauce.",
          image: chickenwings,
        },
      ],
    },
    {
      category: "Main Course",
      items: [
        {
          id: 3,
          name: "Butter Chicken",
          description: "Creamy tomato gravy with tender chicken pieces.",
          image: butterchicken,
        },
        {
          id: 4,
          name: "Biryani",
          description: "Aromatic basmati rice cooked with spices and chicken.",
          image: biryani,
        },
      ],
    },
  ];

  if (isDesktop) {
    return (
      <div style={styles.desktopWarning}>
        <p>Please use mobile view</p>
      </div>
    );
  }

  return (
    <div className="restaurant-page-container">
      <RestaurantHeader restaurant={restaurant} />
      {menus.map((menu, index) => (
        <MenuSection key={index} menu={menu} />
      ))}
    </div>
  );
};

const styles = {
  desktopWarning: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '24px',
    color: '#ff6a00',
  },
};

export default RestaurantPage;
