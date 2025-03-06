const axios = require("axios");

const getFoodInfo = async (req, res) =>{
    try{
        const {barcode} = req.params;
        const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

        const response = await axios.get(apiUrl);
        const product = response.data.product;

        if(!product){
            return res.status(400).json({message: "Food not found."});
        }

        const foodData = {
            name: product.product_name || "Unknown",
            calories: product.nutriments?.energy_kcal || "N/A",
            protein: product.nutriments?.proteins || "N/A",
            fat: product.nutriments?.fat || "N/A",
            carbohydrates: product.nutriments?.carbohydrates || "N/A",
            image: product.image_url || null
        };

        res.json(foodData);
    }catch(err){
        console.error("Error fetching food data: ", err);
        res.status(500).json({message: "Server Error"});
    }
    
}
module.exports = getFoodInfo;