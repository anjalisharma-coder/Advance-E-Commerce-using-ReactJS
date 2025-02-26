import React from 'react';
import productData from '../products.json';

const ShopCategory = ({ filterItem, menuItems, selectedCategory }) => {
  return (
    <>
      <div className="widget-header">
        <h5 className='ms-2'>All Categories</h5>
      </div>
      <div>
        <button
          onClick={() => filterItem("All")}
          className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`}
        >
          All
        </button>
        {menuItems.map((category, id) => (
          <button
            className={`m-2 ${selectedCategory === category ? "bg-warning" : ""}`}
            key={id}
            onClick={() => filterItem(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
};

export default ShopCategory;
