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
      .then((resp) => {
        window.alert("New item created successfully!");
        form.reset();
      })
      .catch((err) => window.alert(err));
  };
};

const postBtn = document.getElementById("post-btn");
const putBtn = document.getElementById("put-btn");
const removeBtn = document.getElementById("remove-btn");
const resetBtn = document.getElementById("reset-btn");

const editPage = () => {
  postBtn.classList.add("d-none");
  resetBtn.classList.add("d-none");
  putBtn.classList.remove("d-none");
  removeBtn.classList.remove("d-none");
  const h3 = document.getElementById("backoffice-h3");
  h3.innerText = "Edit product details";

  fetch(mainEndpoint + productId, {
    headers: {
      Authorization: authKey,
    },
  })
    .then((resp) => resp.json())
    .then((productObj) => {
      const name = document.getElementById("product-name");
      const description = document.getElementById("product-description");
      const brand = document.getElementById("product-brand");
      const img = document.getElementById("img-url");
      const price = document.getElementById("product-price");

      name.value = productObj.name;
      description.value = productObj.description;
      brand.value = productObj.brand;
      img.value = productObj.imageUrl;
      price.value = productObj.price;
    })
    .catch((err) =>
      window.alert("An error has occurred. Please consult your developer.")
    );
};

putBtn.onclick = () => {
  const name = document.getElementById("product-name");
  const description = document.getElementById("product-description");
  const brand = document.getElementById("product-brand");
  const img = document.getElementById("img-url");
  const price = document.getElementById("product-price");

  const modProduct = {
    name: name.value,
    description: description.value,
    brand: brand.value,
    img: img.value,
    price: price.value,
  };

  fetch(mainEndpoint + productId, {
    method: "PUT",
    headers: {
      Authorization: authKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modProduct),
  })
    .then((resp) => {
      window.alert("Item successfully modified!");
      window.location.assign("./index.html");
    })
    .catch((err) =>
      window.alert("An error has occurred. Please consult your developer.")
    );
};

removeBtn.onclick = () => {
  if (
    window.confirm("Are you sure to proceed? This operation is irreversible.")
  ) {
    fetch(mainEndpoint + productId, {
      method: "DELETE",
      headers: {
        Authorization: authKey,
      },
    })
      .then((resp) => {
        window.alert("Item deleted.");
        window.location.assign("./backoffice.html");
      })
      .catch((err) =>
        window.alert("An error has occurred. Please consult your developer.")
      );
  }
};

resetBtn.onclick = () => {
  if (window.confirm("Are you sure to proceed?")) {
    form.reset();
  }
};
