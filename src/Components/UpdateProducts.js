import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const UpdateProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const params = useParams();
  const navigate = useNavigate();
 const token = Cookies.get("user");
 
  useEffect(() => {
    getProductsDetails();
  }, []);

  const getProductsDetails = () => {
    console.warn(params);
    axios
      .get(`${process.env.baseurl}/api/product/getproduct-id/${params.id}`,{
          headers: { Authorization: `Bearer ${token}` },
        })
      .then((response) => {
        const result = response.data.data;
        console.log("this is detals data", result);
        setName(result.name);
        setBrand(result.brand);
        setCategory(result.category);
        setPrice(result.price);
      })
      .catch((error) => console.error(error));
  };

  const updateProducts = () => {
    axios
      .post(
        `${process.env.baseurl}/api/product/edit-product/${params.id}`,
        { name, price, category, brand },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const result = response.data;
        if (result) {
          navigate("/");
        }
      })
      .catch((error) => console.error(error));
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
          defaultValue={name}
          onChange={(e) => setName(e.target.defaultValue)}
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
          defaultValue={price}
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
          defaultValue={category}
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
          defaultValue={brand}
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
            await updateProducts(); // Function call is valid here
          }}
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProducts;
