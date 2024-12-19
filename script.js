const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener("click", download);

function download() {
    output.innerHTML = "";  // Clear the output div before starting

    function loadImage(image) {
        return new Promise((resolve, reject) => {
            const img = new Image();  // Create a new <img> element
            img.src = image.url;  // Set the source URL of the image

            img.onload = () => {
                resolve(img);  // Resolve the promise when image is successfully loaded
            };
            img.onerror = () => reject(`Failed to download the image at ${image.url}`);  // Reject if image fails to load
        });
    }

    // Load all images in parallel
    Promise.all(images.map(loadImage))
        .then(loadedImages => {
            // Once all images are loaded, append them to the output div
            loadedImages.forEach(img => {
                output.appendChild(img);  // Append the <img> elements to the div
            });
        })
        .catch(error => {
            // If any image fails to load, show an error message
            const err = document.createElement("p");
            err.innerText = error;
            output.appendChild(err);
        });
}

