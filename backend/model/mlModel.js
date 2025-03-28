const ort = require("onnxruntime-node");

async function loadModel() {
    const session = await ort.InferenceSession.create("models/model.onnx");
    return session;
}

async function predict(inputData) {
    const session = await loadModel();
    const inputTensor = new ort.Tensor("float32", inputData, [1, inputData.length]);

    const feeds = { input: inputTensor };
    const results = await session.run(feeds);
    
    return results.output.data;  // Assuming 'output' is the name of the output tensor
}

module.exports = { predict };
