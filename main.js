Prediction_1=" ";
Prediction_2=" ";

Webcam.set({
    width:350,
    height: 300,
    image_format: "Jpeg",
    jpeg_quality: 90
});

camera=document.getElementById("camera");
Webcam.attach(
    '#camera'
);

function takesnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";
    });
}

console.log("version ml5 working", ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/T9b2uNLmr/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_one="The first prediction is "+Prediction_1;
    speak_data_two="The second prediction is "+Prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_one+speak_data_two);
    synth.speak(utterThis);
    
    //var Ssythensis=window.speechSynthesis;
    //speak_data_prediction1="The first prediction is"+""+Prediction_1;
   // speak_data_prediction2="The second prediction is"+" "+Prediction_2;
  //  utterthis=new SpeechSynthesisUtterance(speak_data_prediction1+speak_data_prediction2);
  //  Ssythensis.speak(utterthis);
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("results_emotion_one").innerHTML=results[0].label;
        document.getElementById("results_emotion_two").innerHTML=results[1].label;
        Prediciton_1=results_emotion_one;
        Prediction_2=results[1].label;
        speak();
        if(results[0].label=="happy"){
            document.getElementById("update_emoji_one").innerHTML="&#128513";
        }
        if(results[0].label=="sad"){
            document.getElementById("update_emoji_one").innerHTML="&#128577";
        }
        if(results[0].label=="angry"){
            document.getElementById("update_emoji_one").innerHTML="&#128545";
        }
        if(results[0].label=="surprise"){
            document.getElementById("update_emoji_one").innerHTML="&#128562";
        }



        if(results[1].label=="happy"){
            document.getElementById("update_emoji_two").innerHTML="&#128513";
        }
        if(results[1].label=="sad"){
            document.getElementById("update_emoji_two").innerHTML="&#128577";
        }
        if(results[1].label=="angry"){
            document.getElementById("update_emoji_two").innerHTML="&#128545";
        }
        if(results[1].label=="surprise"){
            document.getElementById("update_emoji_two").innerHTML="&#128562";
        }

    }
}