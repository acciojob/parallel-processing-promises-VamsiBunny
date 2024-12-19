const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener("click", download);

function download() {
    // Clear the output div before starting the download
    output.innerHTML = "";

    function loadimg(image) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image.url;

            img.onload = () => resolve(img);  // Resolve when image is loaded
            img.onerror = () => reject(`Failed to download the image at ${image.url}`);  // Use image.url
        });
    }

    Promise.all(images.map(loadimg))
        .then(loadedImages => {
            loadedImages.forEach(img => {
                output.appendChild(img);
            });
        })
        .catch(error => {
            const err = document.createElement("p");
            err.innerText = error;  // Show specific error
            output.appendChild(err);
        });
}
