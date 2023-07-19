import React, { useState, useEffect } from "react";
import { BiTrendingUp, BiGridHorizontal, BiSearch } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { data } from "./Data/data";
import "./Dashbord.css";

function Dashboard() {
  const [usersData, setUsersData] = useState(data);
  const [page, setPage] = useState(1);
  const [constData] = useState(data);
  const [filter, setFilter] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);

  const paginate = () => {
    const startIdx = (page - 1) * 8;
    const endIdx = startIdx + 8;
    setUsersData(data.slice(startIdx, endIdx));

    // Calculate total number of pages
    const total = Math.ceil(data.length / 8);
    setTotalPages(total);

    // Generate page numbers array
    const numbers = Array.from({ length: total }, (_, index) => index + 1);
    setPageNumbers(numbers);
  };

  useEffect(() => {
    paginate();
  }, [page]);

  const handleChange = (value) => {
    let sortedData = data;
    if (value === "inactive") {
      sortedData = constData.sort((a, b) => a.status - b.status);
    } else if (value === "active") {
      sortedData = constData.sort((a, b) => b.status - a.status);
    } else if (value === "newest") {
      sortedData = constData.sort((a, b) => (a.created > b.created ? -1 : 1));
    }
    setFilter(value);
    setUsersData(sortedData);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = constData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue) ||
        user.company.toLowerCase().includes(searchValue) ||
        user.phone.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.country.toLowerCase().includes(searchValue)
    );
    setUsersData(filteredData);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <img src="./download.png" alt="Logo" className="logo" />
        <p className="sidebar-item">
          <BiTrendingUp className="sidebar-icon" /> Reports
        </p>
        <div className="sidebar-item active-workspace">
          <BiGridHorizontal className="sidebar-icon" /> Workplace
        </div>
        <p className="sidebar-item">
          <IoMdSettings className="sidebar-icon" /> Settings
        </p>
      </div>

      <div className="main">
        <div className="header">
          <h1 className="header-title">Orders</h1>
          <button className="add-button">
            <AiOutlinePlus className="add-icon" /> Add Other
          </button>
        </div>

        <div className="overview-container">
          <div className="customer-container">
            <h1 className="customer-title">All Customers</h1>
          </div>
          <div className="site-container">
            <h1 className="site-title">Site Overview</h1>
            <div className="site-stats">
              <div className="site-stat">
                <p className="stat-label">Active</p>
                <div className="stat-bar">
                  <div className="stat-bar-fill" style={{ width: "72%" }}></div>
                </div>
                <p className="stat-percentage">72%</p>
              </div>
              <div className="site-stat">
                <p className="stat-label">Inactive</p>
                <div className="stat-bar">
                  <div className="stat-bar-fill" style={{ width: "57%" }}></div>
                </div>
                <p className="stat-percentage">57%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="members-container">
          <div className="members-header">
            <p className="members-title">
              <BiTrendingUp className="members-icon" /> Active Members
            </p>
            <div className="members-filter">
              <BiSearch className="filter-icon" />
              <input
                type="text"
                placeholder="Search"
                className="filter-input"
                onChange={handleSearch}
              />
              <label className="filter-label">
                Sort by:
                <select
                  className="filter-select"
                  value={filter}
                  onChange={(e) => handleChange(e.target.value)}
                >
                  <option value="select">Select</option>
                  <option value="newest">Newest</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
            </div>
          </div>

          <div className="members-table">
            <table>
              <thead>
                <tr>
                  <th>Customer name</th>
                  <th>Company</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user, i) => (
                  <tr key={i}>
                    <td>{user.name}</td>
                    <td>{user.company}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.country}</td>
                    <td>
                      <button
                        className={`status-button ${user.status ? "active" : "inactive"}`}
                      >
                        {user.status ? "Active " : "Inactive"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <p className="pagination-text">
              Showing items {page + (page - 1) * 8} to {page * 8} of {data.length} entries
            </p>
            <div className="pagination-buttons">
              <button
                className="pagination-button"
                onClick={() => {
                  setPage((prevPage) => prevPage - 1);
                }}
                disabled={page === 1}
              >
                {"<"}
              </button>
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`pagination-button ${page === pageNumber ? "current" : ""}`}
                  onClick={() => {
                    setPage(pageNumber);
                  }}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                className="pagination-button"
                onClick={() => {
                  setPage((prevPage) => prevPage + 1);
                }}
                disabled={page === totalPages}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
