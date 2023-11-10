const mainEndpoint = "https://striveschool-api.herokuapp.com/api/product/";
const authKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRlMDk4YTMyNWM5NzAwMTg3ZjlmNzEiLCJpYXQiOjE2OTk2MTMwNjYsImV4cCI6MTcwMDgyMjY2Nn0.nUzDxKhVW0nN4whO2juOQRcKV0Xd3tzeR0Qw11i6uIA";

const productId = new URLSearchParams(window.location.search).get("prId");

document.addEventListener("DOMContentLoaded", (e) => {
  if (productId) {
    editPage();
  } else {
    postPage();
  }
});

const form = document.getElementById("main-form");

const postPage = () => {
  form.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("product-name");
    const description = document.getElementById("product-description");
    const brand = document.getElementById("product-brand");
    const img = document.getElementById("img-url");
    const price = document.getElementById("product-price");

    const Product = {
      name: name.value,
      description: description.value,
      brand: brand.value,
      imageUrl: img.value,
      price: price.value,
    };

    fetch(mainEndpoint, {
      method: "POST",
      headers: {
        Authorization: authKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Product),
    })
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };
};

const editPage = () => {
  const postBtn = document.getElementById("post-btn");
  postBtn.classList.add("d-none");
  const putBtn = document.getElementById("put-btn");
  putBtn.classList.remove("d-none");
  const h3 = document.getElementById("backoffice-h3");
  h3.innerText = "Edit product details";

  fetch(mainEndpoint + productId, {
    headers: {
      Authorization: authKey,
    },
  })
    .then((resp) => resp.json())
    .then((productObj) => {
      const nameInput = document.getElementById("product-name");
      const descriptionInput = document.getElementById("product-description");
      const brandInput = document.getElementById("product-brand");
      const imgInput = document.getElementById("img-url");
      const priceInput = document.getElementById("product-price");

      nameInput.value = productObj.name;
      descriptionInput.value = productObj.description;
      brandInput.value = productObj.brand;
      imgInput.value = productObj.imageUrl;
      priceInput.value = productObj.price;

      console.log(nameInput.value);
    });
};
