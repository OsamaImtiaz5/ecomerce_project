import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-simple-toasts";
import Cookies from "js-cookie";

const Products = () => {
  const [products, setProducts] = useState([]);
 const token = Cookies.get("user");
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    try {
      axios
        //.get(`${BaseUrl.baseUrl}/employe/get/${id}`)
        .get(`${process.env.baseurl}/api/product/get-product`,{
            headers: { Authorization: `Bearer ${token}` }})
        .then((res) => {
          console.log(res);
          setProducts(res.data);
 console.log("token is in get api" + token);

          // console.warn(products);
        })

        .catch((err) => {
          toast("🚨" + err.message);
        });
    } catch (err) {
      toast("🚨 Something went wrong!");
    }
  };
  const deleteProducts = (_id) => {
    try {
      axios
        .delete(`${process.env.baseurl}/api/product/del-product/${_id}`,{
            headers: { Authorization: `Bearer ${token}` }})
        .then((response) => {
          if (response.data.status === "ok") {
            console.log("Product deleted ");
            getProducts();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const searchHandle = (event) => {
    // console.warn(event.target.value);
    let key = event.target.value;
    if (key) {
      try {
        axios
          .get(`${process.env.baseurl}/api/product/search/${key}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setProducts(response.data.data);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <div className="products_list">
        <h2>Products</h2>

        <input
          type="text"
          placeholder="Search Product"
          onChange={searchHandle}
        />
        <table>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Brand</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 &&
              products.map((productsitems, index) => (
                <tr key={productsitems._id}>
                  <td>{index + 1}</td>
                  <td>{productsitems.brand}</td>
                  <td>{productsitems.name}</td>
                  <td>{productsitems.category}</td>
                  <td>${productsitems.price}</td>
                  <td>
                    <button
                      type="button"
                      onClick={async () => {
                        await deleteProducts(productsitems._id);
                      }}
                    >
                      Delete
                    </button>
                    <Link to={`/update/${productsitems._id}`}>Update</Link>
                  </td>
                </tr>
              ))}
            {products?.length === 0 && <p>No Result Found</p>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
