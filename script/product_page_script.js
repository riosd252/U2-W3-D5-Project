const mainEndpoint = "https://striveschool-api.herokuapp.com/api/product/";
const authKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRlMDk4YTMyNWM5NzAwMTg3ZjlmNzEiLCJpYXQiOjE2OTk2MTMwNjYsImV4cCI6MTcwMDgyMjY2Nn0.nUzDxKhVW0nN4whO2juOQRcKV0Xd3tzeR0Qw11i6uIA";
const productId = new URLSearchParams(window.location.search).get("prId");

window.onload = () => {
  const productH1 = document.getElementById("product-h1");
  const productBrand = document.getElementById("brand");
  const productImg = document.getElementById("product-img");
  productImg.className = "w-100 rounded";
  const productDescript = document.getElementById("description");
  const productPrice = document.getElementById("price");

  fetch(mainEndpoint + productId, {
    headers: {
      Authorization: authKey,
    },
  })
    .then((resp) => resp.json())
    .then((productObj) => {
      productH1.innerText = productObj.name;
      productBrand.innerText = `Brand: ${productObj.brand}`;
      productImg.setAttribute("src", productObj.imageUrl);
      productImg.setAttribute("alt", `${productObj.name} image`);
      productDescript.innerText = productObj.description;
      productPrice.innerText = `Yours from ${productObj.price} €`;
    })
    .catch((err) =>
      alert("An error has occurred. Please contact the website manager.")
    );
};
