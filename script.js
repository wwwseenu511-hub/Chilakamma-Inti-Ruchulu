import { db, ref, push, set } from "./firebase.js";

const products = [
  { name: "Chicken Pickle (Bone)", price: 450, weight: "250g" },
  { name: "Chicken Pickle (Boneless)", price: 600, weight: "250g" },
  { name: "Mutton Pickle", price: 600, weight: "250g" },
  { name: "Prawn Pickle", price: 650, weight: "250g" },
];

const productList = document.getElementById("product-list");

products.forEach((p) => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <h3>${p.name}</h3>
    <p>₹${p.price} / ${p.weight}</p>
    <button onclick="orderNow('${p.name}', ${p.price})">Order Now</button>
  `;
  productList.appendChild(div);
});

window.orderNow = function (name, price) {
  const options = {
    key: "YOUR_RAZORPAY_KEY_ID",
    amount: price * 100,
    currency: "INR",
    name: "Chilakamma Home Foods",
    description: name,
    handler: function (response) {
      const orderRef = ref(db, "orders");
      push(orderRef, { product: name, price, payment_id: response.razorpay_payment_id });
      alert("Order successful! Thank you for choosing Chilakamma.");
    },
    prefill: { name: "Customer", email: "test@example.com", contact: "9999999999" },
  };
  new Razorpay(options).open();
};
