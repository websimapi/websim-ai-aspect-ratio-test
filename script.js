const promptInput = document.getElementById('prompt');
const aspectRatioSelect = document.getElementById('aspect-ratio');
const generateBtn = document.getElementById('generate-btn');
const imageContainer = document.getElementById('image-container');
const resultImage = document.getElementById('result-image');
const loader = document.getElementById('loader');

async function generateImage() {
    const prompt = promptInput.value;
    const aspectRatio = aspectRatioSelect.value;

    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }

    // Show loader and hide image
    loader.style.display = 'block';
    resultImage.style.display = 'none';
    generateBtn.disabled = true;

    try {
        const result = await websim.imageGen({
            prompt: prompt,
            aspect_ratio: aspectRatio,
        });

        if (result && result.url) {
            resultImage.src = result.url;
            resultImage.onload = () => {
                // Hide loader and show image
                loader.style.display = 'none';
                resultImage.style.display = 'block';
                generateBtn.disabled = false;
            };
            resultImage.onerror = () => {
                // Handle image load error
                console.error("Error loading image from URL:", result.url);
                alert("Failed to load the generated image.");
                loader.style.display = 'none';
                generateBtn.disabled = false;
            };
        } else {
            throw new Error("Invalid response from image generation API.");
        }
    } catch (error) {
        console.error("Error generating image:", error);
        alert("An error occurred while generating the image. Please try again.");
        loader.style.display = 'none';
        generateBtn.disabled = false;
    }
}

generateBtn.addEventListener('click', generateImage);

// Generate an image on initial page load
document.addEventListener('DOMContentLoaded', () => {
    generateImage();
});

