var img
var objects = []
var statusAtual = false

function preload() {
    img = loadImage("NOSSA_BASE.jpg")
}

function setup() {
    canvas = createCanvas(630, 440)
    canvas.center()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "status : detectando produtos da wepink"
}

function modelLoaded(){
    console.log("modelo carregado")
    objectDetector.detect(img, gotResult)
    statusAtual = true
}

function gotResult(error, results){
 if(error){
    console.error(error)
 }
 else{
    console.log(results)
    objects = results
 }

}

function draw() {
    image(img, 0, 0, 630, 440)
    if(statusAtual){
        document.getElementById("status").innerHTML = "status : virginia detectada"
        for(var e = 0; e < objects.length; e++){
            nome = objects[e].label
            confianca = floor(objects[e].confidence * 100)
            x = floor(objects[e].x) + 100
            y = floor(objects[e].y) + 150
            largura = floor(objects[e].width) 
            altura = floor(objects[e].height) 
            text(nome + " " + confianca + "%", x, y)
            stroke("#ffc0cb")
            rect(x, y, largura, altura)
            noFill()
        }
    }
}