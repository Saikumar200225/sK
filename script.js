const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const grayscale = document.getElementById('grayscale');
const sepia = document.getElementById('sepia');

const download = document.getElementById('download');
let image = new Image();

// Upload Image
upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Draw Image on Canvas
image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
};

// Apply Filters
function applyFilters() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = `
        brightness(${brightness.value}%)
        contrast(${contrast.value}%)
        grayscale(${grayscale.value}%)
        sepia(${sepia.value}%)
    `;
    ctx.drawImage(image, 0, 0);
}

[brightness, contrast, grayscale, sepia].forEach((filter) => {
    filter.addEventListener('input', applyFilters);
});

// Download Edited Image
download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
});