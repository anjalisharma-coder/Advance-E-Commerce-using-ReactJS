import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import ProducCards from './ProducCards';
import productData from '../products.json'; // Renamed to avoid conflict
import { Pagination } from 'react-bootstrap';
import Search from './Search';
import ShopCategory from './ShopCategory';

const Shop = () => {
  const [GridList, setGridList] = useState(true);
  const [products, setProducts] = useState(productData); // Fixed typo in setProducts
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter product based on category
  const menuItems = [...new Set(productData.map((item) => item.category))];

  const filterItem = (curCategory) => {
    if (curCategory === "All") {
      setProducts(productData);
    } else {
      const filteredProducts = productData.filter((item) => item.category === curCategory);
      setProducts(filteredProducts);
    }
    setSelectedCategory(curCategory);
  };

  return (
    <div>
     <div style={{ marginTop: "100px" }}>
        <PageHeader title="Our Shop Page" curPage="Shop" />
      </div>
      <div className="shop-page padding-tb" >
        <div className="container">
          <div className="row justify-content-center">
            {/* Product Listing */}
            <div className="col-lg-8 col-12">
              <article>
                {/* Layout and title */}
                <div className="shop-title d-flex flex-wrap justify-content-between">
                  <p>Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, products.length)} of {products.length} Results</p>
                  <div className={`product-view-mode ${GridList ? "gridActive" : "listActive"}`}>
                  <a className="grid" onClick={() => setGridList(true)}>
                      <i className="icofont-ghost"></i>
                    </a>
                    <a className="list" onClick={() => setGridList(false)}>
                      <i className="icofont-listine-dots"></i>
                    </a>
                  </div>
                </div>

                {/* Product Cards */}
                <ProducCards GridList={GridList} products={currentProducts} />

                {/* Pagination */}
                <Pagination>
                  {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </article>
            </div>

            {/* Sidebar with Search & Categories */}
            <div className="col-lg-4 col-12">
              <aside>
                <Search products={products} GridList={GridList} />
                <ShopCategory
                  filterItem={filterItem}
                  setProducts={setProducts}
                  menuItems={menuItems}
                  selectedCategory={selectedCategory}
                />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
