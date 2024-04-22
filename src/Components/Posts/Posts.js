import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { FirebaseContextHook } from "../../store/Context";
import { ProductInfoContextHook } from "../../store/ProductInfoContext";
import Heart from "../../assets/Heart";
import "./Post.css";

function Posts() {
  const { firebase } = FirebaseContextHook();
  const [products, setProducts] = useState([]);
  const { setProductDetails } = ProductInfoContextHook();
  const history = useHistory();

  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((snapshot) => {
        const allPosts = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setProducts(allPosts);
      });
  }, []);

  return (
    <div className="postParentDiv">
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div
                className="card"
                key={product.id}
                onClick={() => {
                  setProductDetails(product);
                  history.push('/view');
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="product-img" />
                </div>
                <div className="content">
                  <span className="rate">&#x20B9; {product.price}</span><br/>
                  <span className="kilometer"> {product.name}</span><br/>
                  <span className="name">{product.category}</span>
                <div className="date">
                  <span>{product.createdAt.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
