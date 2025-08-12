import * as tmImage from "@teachablemachine/image";

// Укажи путь к папке, где лежат model.json, metadata.json, weights.bin
const MODEL_URL = '/modals/fishs/';

let model: tmImage.CustomMobileNet;
let maxPredictions: number;


/** Загружает модель рыбы из локальной папки */
export async function loadModel() {
    model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
    maxPredictions = model.getTotalClasses();
}



/** Выполняет предсказание по изображению для модели рыбы */
export async function predictFromImage(image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement) {
    if (!model) await loadModel();

    const prediction = await model.predict(image);
    prediction.sort((a, b) => b.probability - a.probability);
    return prediction[0]; // возвращает наиболее вероятный класс
}



// Пример вызова функций
/*async function analyzeImage(imageElement) {
    const fishPrediction = await predictFromImage(imageElement);
    const baitPrediction = await predictFromImageBaits(imageElement);
    
    console.log('Рыба:', fishPrediction);
    console.log('Наживка:', baitPrediction);
}*/