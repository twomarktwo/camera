let errors = document.querySelector("#errors");

function log(message) {
  errors.innerHTML += `<p>${message}</p>`;
}

async function quaggaInit() {
  const constraints = {
    width: {
      min: 640
    },
    height: {
      min: 480
    },
    aspectRatio: {
      min: 1,
      max: 2
    },
    focusMode: "continuous"
    //...(!this.props.cameraId && { facingMode: 'environment' }),
    //...(this.props.cameraId && { deviceId: this.props.cameraId }),
  };

  return new Promise((resolve, reject) => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: document.querySelector("#scannerViewport"),
          constraints
        },
        locator: {
          patchSize: "medium",
          halfSample: true
        },
        numOfWorkers: window.navigator.hardwareConcurrency || 2,
        decoder: {
          readers: ["upc_reader", "ean_reader"]
        },
        locate: true, //this.props.camScanLocate,
        area: {
          top: "25%",
          right: "0%",
          left: "0%",
          bottom: "25%"
        }
      },
      function(error) {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
}

async function run() {
  try {
    await quaggaInit();
    //Quagga.start();
    log("INITED");
    let video = document.querySelector("video");
    let mediaStream = video.srcObject;
    let track = mediaStream.getVideoTracks()[0];
    log(track + "");

    let intervalId = null;
    let height = 300;
    setInterval(async () => {
      await track.applyConstraints({
        //advanced: [{ torch: true }]
        height: (height += 100)
      });
      log("height=" + height);
      if (height > 2000) {
        clearInterval(intervalId);
      }
    }, 3000);
  } catch (e) {
    console.error(e);
    errors.innerHTML += `<p>Error: ${e}</p>`;
  }
}

run();
