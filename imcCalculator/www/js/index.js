function calculerIMC(){
    let heightElement = document.getElementById("height");
    let weightElement = document.getElementById("weight");
    let resultElement = document.getElementById("result");
    let resultContainerId = document.getElementById("resultContainerId");
    let imcValueElement = document.getElementById("imcValue");
    let errorElement = document.getElementById("error");

    if(isNaN(heightElement.value) == false && isNaN(weightElement.value) == false){
        let height = Number(heightElement.value);
        let weight = Number(weightElement.value);

        if(height > 0 && weight > 0){
            let imc = weight/Math.pow(height/100, 2);
            let message = null;

            if(imc < 16.5){
                message = "Dénutrition ou anoréxie";
            }
            else if(imc >= 16.5 && imc < 18.5){
                message = "Maigreur";
            }
            else if(imc >= 18.5 && imc < 25){
                message = "Poids mormal";
            }
            else if(imc >= 25 && imc < 30){
                message = "Surpoids";
            }
            else if(imc >= 30 && imc < 35){
                message = "Obésité modérée";
            }
            else if(imc >= 35 && imc < 40){
                message = "Obésité sévère";
            }
            else{
                message = "Obésité morbite ou massive";
            }
            errorElement.style.display = "none";
            resultContainerId.style.display = "block";

            imcValueElement.innerHTML = "Votre IMC est évalué à : "+Math.round(imc * 100) / 100;
            resultElement.innerHTML = "Vous êtes donc en état de : <b>"+message+"</b>";
            heightElement.value = "";
            weightElement.value = "";
        }
        else{
            resultContainerId.style.display = "none";
            errorElement.style.display = "block";
            errorElement.innerHTML = "Veuillez donner des valeurs positives non nulles";
        }
        
    }else{
        resultContainerId.style.display = "none";
        errorElement.style.display = "block";
        errorElement.innerHTML = "Veuillez donner des nombres valides";
    }
    
}