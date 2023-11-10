const mainEndpoint = "https://striveschool-api.herokuapp.com/api/product";
const authKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRlMDk4YTMyNWM5NzAwMTg3ZjlmNzEiLCJpYXQiOjE2OTk2MTMwNjYsImV4cCI6MTcwMDgyMjY2Nn0.nUzDxKhVW0nN4whO2juOQRcKV0Xd3tzeR0Qw11i6uIA";

window.onload = () => {
  fetch(mainEndpoint, {
    headers: {
      Authorization: authKey,
    },
  })
    .then((resp) => resp.json())
    .then((productsArr) => {
      productsArr.forEach((productObj) => {
        const imageUrl = productObj.imageUrl;
        const name = productObj.name;
        const description = productObj.description;
        const price = productObj.price;
        const productId = productObj._id;

        cardCreation(imageUrl, name, description, price, productId);
      });
    });
};

const cardCreation = (imageUrl, name, description, price, productId) => {
  const row = document.getElementById("main-row");
  const col = document.createElement("div");
  col.className = "col-3";
  const card = document.createElement("div");
  card.className = "card shadow";
  const cardImg = document.createElement("img");
  cardImg.className = "card-img-top";
  cardImg.src = imageUrl;
  cardImg.alt = name + "image";
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.innerText = name;
  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.innerText = description;
  const cardFooter = document.createElement("div");
  cardFooter.className = "d-flex justify-content-between align-items-center";
  const cardPrice = document.createElement("span");
  cardPrice.className = "fw-bold";
  cardPrice.innerText = price + "€";
  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";
  btnGroup.setAttribute("role", "group");
  const detailsBtn = document.createElement("button");
  detailsBtn.className = "btn btn-primary py-1 px-2";
  detailsBtn.innerText = "Show more";
  const modifyBtn = document.createElement("button");
  modifyBtn.className = "btn btn-success py-1 px-2 modify";
  modifyBtn.innerText = "Edit Item";
  modifyBtn.addEventListener("click", () => {
    window.location.assign("./backoffice.html?prId=" + productId);
  });

  btnGroup.appendChild(detailsBtn);
  btnGroup.appendChild(modifyBtn);
  cardFooter.appendChild(cardPrice);
  cardFooter.appendChild(btnGroup);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardFooter);
  card.appendChild(cardImg);
  card.appendChild(cardBody);
  col.appendChild(card);
  row.appendChild(col);
};
