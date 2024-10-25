import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const navigate = useNavigate();
  const addProducts = () => {
    // const userId = JSON.parse(localStorage.getItem("users"))._id;

    const userId = Cookies.get("user")._id;
    const token = Cookies.get("user");
    try {
      axios
        .post(
          "http://localhost:8000/api/product/add-product",
          { name, price, category, brand, userId },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        .then((response) => {
          const result = response.data;
          console.warn(result);
          navigate("/");
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        width: "100%",
        marginTop: "80px",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <p>Product Name</p>
        <input
          className="inputBox"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <p>Price</p>
        <input
          className="inputBox"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <p>Category</p>
        <input
          className="inputBox"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <p>Brand</p>
        <input
          className="inputBox"
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>
      <div>
        <button
          type="button"
          style={{
            alignSelf: "center",
            backgroundColor: "skyblue",
            width: "250px",
            padding: "10px",
            marginLeft: "190px",
          }}
          onClick={async () => {
            await addProducts(); // Function call is valid here
          }}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProducts;
