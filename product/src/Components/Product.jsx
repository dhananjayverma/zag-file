
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsFillHouseFill, BsHeartFill, BsBagFill, BsGearFill } from "react-icons/bs";
import "./style/ProductPage.css";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response=await axios.get("https://eager-slacks-slug.cyclic.app/all")
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    applyFilters(selectedCategory, event.target.value);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    applyFilters(category, searchQuery);
  };

  const applyFilters = (category, query) => {
    let filteredData = products;

    if (category !== "") {
      filteredData = filteredData.filter(
        (product) => product.category === category
      );
    }

    if (query !== "") {
      filteredData = filteredData.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filteredData);
  };

  return (
    <div className="product-page">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="🔍 Search"
        />
      </div>
      <div className="category-buttons">
        <button
          className={selectedCategory === "" ? "active" : ""}
          onClick={() => handleCategoryFilter("")}
        >
          All
        </button>
        <button
          className={selectedCategory === "mens" ? "active" : ""}
          onClick={() => handleCategoryFilter("mens")}
        >
          Men
        </button>
        <button
          className={selectedCategory === "women" ? "active" : ""}
          onClick={() => handleCategoryFilter("women")}
        >
          Women
        </button>
        <button
          className={selectedCategory === "kids" ? "active" : ""}
          onClick={() => handleCategoryFilter("kids")}
        >
          Kids
        </button>
      </div>
      <div className="product-list">
        {filteredProducts.map((all) => (
          <Link key={all.id} to={`/details/${all.id}`}>
            
            <div className="product-item">
        <BsHeartFill className="saved-icon" />
      <img src={all.img} alt={all.title} />
  <h3 className="title">{all.title}</h3>
  <p className="price">{all.price}</p>
</div>

          </Link>
        ))}
      </div>
      <div className="icons">
        <Link to="/">
          <BsFillHouseFill className="icon" />
        </Link>
        <Link to="/saved">
          <BsHeartFill className="icon" />
        </Link>
        <Link to="/cart">
          <BsBagFill className="icon" />
        </Link>
        <Link to="/settings">
          <BsGearFill className="icon" />
        </Link>
      </div>
    </div>
  );
}
