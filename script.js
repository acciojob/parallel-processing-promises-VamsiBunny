const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener("click",download);

function download(){

function loadimg(image){
   
    return new Promise((resolve,reject)=>{
        const img=new Image();
        img.src=image.url;

        img.onload=()=>resolve(img);
        img.onerror=()=>reject(`Failed to download the image ${image.src}`);
    })
 
} Promise.all(images.map(loadimg))
.then(images=>{
    images.forEach(img=>{
       output.appendChild(img);
    })
}).catch(error=>{
    const err=document.createElement("p")
    err.innerText="Failed to download the image"
    output.appendChild(err);
})
}