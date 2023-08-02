harry_potter = "";
peter_pan = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

leftWristScore = 0;
rightWristScore = 0;

SongStatus1 = 0;

function preload() {
    harry_potter = loadSound("HarryPotter.mp3");
    peter_pan = loadSound("PeterPan.mp3");

}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.position(700, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red")
    stroke("black");
      
    if (rightWristScore > 0.2) {
        circle(rightWristX, rightWristY, 20);
        harry_potter.stop();
        peter_pan.play();
        SongStatus1 = peter_pan.isPlaying();
        if (SongStatus1 == true) {
            document.getElementById("song_name").innerHTML = "Song Name = Peter Pan";
        }
    }
    
    if (leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 20);
        peter_pan.stop();
        harry_potter.play();
        SongStatus1 = harry_potter.isPlaying();
        if (SongStatus1 == true) {
            document.getElementById("song_name").innerHTML = "Song Name = Harry Potter";
        }
    }
}

function modelLoaded() {
    console.log("PoseNet is initialised");

}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY);
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;

    }
}