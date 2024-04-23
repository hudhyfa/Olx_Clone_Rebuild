import React, { Fragment, useState, useContex } from "react";
import { FirebaseContextHook, AuthContext } from "../../store/Context";
import { useHistory } from "react-router-dom";
import "./Create.css";
import Header from "../Header/Header";



const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const { firebase } = FirebaseContextHook();
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const date = new Date();
  const handleSubmit = () => {
  if(!name || !category || !price || !image || !description) {
    alert("please enter all fields.");
    return;
  }
    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          firebase.firestore().collection("products").add({
            name,
            price,
            category,
            url,
            description,
            userId: user.uid,
            createdAt: date,
          });
          history.push("/");
        });
      });
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <div className="createLogo">
            <img src="../../../Images/sellProductImage.jpeg"/>
          </div>
          <div className="createForm">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Description</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />

            <br />
            <img
              alt="Posts"
              width="120px"
              height="120px"
              src={image ? URL.createObjectURL(image) : ""}
            ></img>

            <br />
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">
              Upload
            </button>
          </div>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
