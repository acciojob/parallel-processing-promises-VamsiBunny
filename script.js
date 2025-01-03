const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener("click", download);

function download() {
    output.innerHTML = ""; // Clear the output div before starting

    function loadImage(image) {
        return new Promise((resolve, reject) => {
            const img = new Image(); // Create a new <img> element
            img.src = image.url; // Set the source URL of the image

            img.onload = () => resolve(img); // Resolve when image loads successfully
            img.onerror = () => reject(`Failed to load image's URL: ${image.url}`); // Reject if image fails to load
        });
    }

    // Load all images in parallel using Promise.all
    Promise.all(images.map(loadImage))
        .then(loadedImages => {
            // Append all successfully loaded images to the output div
            loadedImages.forEach(img => {
                output.appendChild(img);
            });
        })
        .catch(error => {
            // Display error if any image fails
            const err = document.createElement("p");
            err.innerText = error;
            output.appendChild(err);
        });
}
