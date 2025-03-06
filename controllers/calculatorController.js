const calculateTDEE = (req, res) => {
    const { weight, height, age, activityLevel } = req.body;
    let tdee = 10 * weight + 6.25 * height - 5 * age + 5;
    
    if (activityLevel === "sedentary") tdee *= 1.2;
    else if (activityLevel === "active") tdee *= 1.55;
    
    res.json({ tdee });
  };
  
  const calculateBMI = (req, res) => {
    const { weight, height } = req.body;

    if(!weight || !height){
        return res.status(400).json({message: "All fields are mandatory!"});
    }
    const bmi = weight / (height ** 2).toFixed(2);

    let category = "";
    if(bmi < 18.5 ){
        category ="Underweight";
    }
    else if(bmi < 24.9){
        category ="Normal";
    }
    else if(bmi < 29.9){
        category ="Overweight";
    }
    else{
        category = "Obese";
    }
    res.json({ bmi, category });
  };

module.exports = { calculateTDEE, calculateBMI };