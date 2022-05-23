import React from "react";

const PoSidebar = () => {
  const categoryLists = [
    {
      title: "Electronic Devices",
      count: "123",
    },
    {
      title: "Electronic Accessories",
      count: "12",
    },
    {
      title: "TV & Home Appliances",
      count: "124",
    },
    {
      title: "Health & Beauty",
      count: "453",
    },
    {
      title: "Babies & Toys",
      count: "240",
    },
    {
      title: "Groceries & Pets",
      count: "150",
    },
    {
      title: "Home & Lifestyle",
      count: "2332",
    },
    {
      title: "Women`s Fashion",
      count: "5456",
    },
    {
      title: "Men`s Fashion",
      count: "323",
    },
  ];

  const cities = [
    "dhaka",
    "jamalpur",
    "Medinah",
    "Mecca",
    "Dammam",
    "Taif",
    "Tabuk",
    "Abha",
    "Jazan",
    "Hail",
    "Arar",
  ];

  return (
    <div>
      <p className="filter">
        <strong>Filters</strong>
      </p>
      <p className="category_title">Category</p>
      <p className="category_title"> All Category</p>
      <ul className="category_ul">
        {categoryLists.map((list) => (
          <li className="d-flex justify-content-between">
            {" "}
            <span>{list.title}</span> <span>{list.count}</span>
          </li>
        ))}
      </ul>

      <div className="status">
        <p className="category_title">Status</p>
        <div className="mt-2">
          <input
            className="styled-checkbox custom_checkbox"
            id="styled-checkbox"
            type="checkbox"
            value="new"
          />
          <label htmlFor="styled-checkbox">New</label>
        </div>

        <div className="mt-2">
          <input
            className="styled-checkbox custom_checkbox"
            id="inprogress"
            type="checkbox"
            value="inprogress"
          />
          <label htmlFor="inprogress">In Progress</label>
        </div>
        <div className="mt-2">
          <input
            className="styled-checkbox custom_checkbox"
            id="completed"
            type="checkbox"
            value="completed"
          />
          <label htmlFor="completed">Completed</label>
        </div>
      </div>

      <div className="allCity">
        <p className="category_title">City</p>
        {cities.map((city) => (
          <div className="mt-2">
            <input
              className="styled-checkbox custom_checkbox"
              id={city}
              type="checkbox"
              value={city}
            />
            <label htmlFor={city}>{city}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoSidebar;
