const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

const products = [
    {
        "id": 1,
        "name": "brandMe Men's Leather Blazer Genuine Soft Lambskin Coat Jacket BB25",
        "image": "https://www.62icon.com/client/assets/img/like-icon.svg",
        "price": 11585.84,
        "discount": 12
    },
    {
        id: 2,
        name: "KL Koza Leathers Men’s Genuine Lambskin Leather Jacket KP005",
        image: "https://www.62icon.com/client/assets/img/like-icon.svg",
        price: 11252.44,
        discount: 15
    },
    {
        id: 3,
        name: "KL Koza Leathers Men’s Genuine Lambskin Leather Jacket KP005",
        image: "https://www.62icon.com/client/assets/img/like-icon.svg",
        price: 11252.44,
        discount: 15
    },
    {
        id: 4,
        name: "KL Koza Leathers Men’s Genuine Lambskin Leather Jacket KP005",
        image: "https://www.62icon.com/client/assets/img/like-icon.svg",
        price: 11252.44,
        discount: 15
    },
    {
        id: 5,
        name: "KL Koza Leathers Men’s Genuine Lambskin Leather Jacket KP005",
        image: "https://www.62icon.com/client/assets/img/like-icon.svg",
        price: 11252.44,
        discount: 15
    },
    {
        id: 6,
        name: "KL Koza Leathers Men’s Genuine Lambskin Leather Jacket KP005",
        image: "https://www.62icon.com/client/assets/img/like-icon.svg",
        price: 11252.44,
        discount: 15
    },
    {
        id: 7,
        name: "KL Koza Leathers Men’s Genuine Lambskin Leather Jacket KP005",
        image: "https://www.62icon.com/client/assets/img/like-icon.svg",
        price: 11252.44,
        discount: 15
    },
    {
        id: 8,
        name: "KL Koza Leathers Men’s Genuine Lambskin Leather Jacket KP005",
        image: "https://www.62icon.com/client/assets/img/like-icon.svg",
        price: 11252.44,
        discount: 15
    },
];

app.use(cors());

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
