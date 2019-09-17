require(["quagga"], async quagga => {
  try {
    let devices = await navigator.mediaDevices.enumerateDevices();
    let videoDevices = devices.filter(d => d.kind == "videoinput");
    videoDevices = videoDevices.reverse();
    for (let i = 0; i < videoDevices.length; i++) {
      let videoDevice = videoDevices[i];
      const video = createVideo();
      let stream = await navigator.mediaDevices.getUserMedia({
        // video: { facingMode: "environment", width: 1024 * 3 }
        video: { deviceId: videoDevice.deviceId }
      });
      // log(stream.getVideoTracks().map(a => JSON.stringify(a.label)));
      video.srcObject = stream;
    }
  } catch (e) {
    log("ERROR: " + e);
  }
});

function log(message) {
  let error = document.getElementById("error");

  error.innerHTML += `<h2>${message}</h2>`;
}

function createVideo() {
  let videoContainer = document.getElementById("video-container");
  let video = document.createElement("video");
  video.autoplay = true;
  video.width = 500;
  videoContainer.appendChild(video);
  return video;
}
