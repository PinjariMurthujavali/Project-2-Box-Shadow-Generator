// Selects the preview box element and the code display textarea
const elem = document.getElementById("element");
const code = document.getElementById("code");

// Selects all input sliders and controls
const sliders = document.querySelectorAll(".sliders input");

// Adds event listener to update shadow when sliders change
sliders.forEach((slider) => slider.addEventListener("input", generateShadow));

// Main function to update the box shadow
function generateShadow() {
    const shadowParams = getShadowParams(); // Gets shadow parameters from sliders
    const boxShadow = createBoxShadow(...shadowParams); // Creates CSS shadow string
    applyShadow(elem, boxShadow); // Applies shadow to the preview box
    upadateCode(boxShadow); // Updates the code display
}

// Retrieves values from sliders and inputs
function getShadowParams() {
    const hShadow = parseInt(document.getElementById("h-shadow").value);
    const vShadow = parseInt(document.getElementById("v-shadow").value);
    const blurRadius = parseInt(document.getElementById("blur-radius").value);
    const spreadRadius = parseInt(document.getElementById("spread-radius").value);
    const shadowColor = document.getElementById("shadow-color").value;
    const shadowColorOpacity = parseFloat(
        document.getElementById("shadow-color-opacity").value
    ).toFixed(1);
    const shadowInset = document.getElementById("shadow-inset").checked;

    return [hShadow, vShadow, blurRadius, spreadRadius, shadowColor, shadowColorOpacity, shadowInset];
}

// Converts input values into CSS box-shadow property
function createBoxShadow(hShadow, vShadow, blurRadius, spreadRadius, color, opacity, inset) {
    const shadow = inset ? "inset" : ""; // Adds 'inset' if checkbox is checked
    const rgbaColor = hexToRgba(color, opacity); // Converts HEX to RGBA
    return `${shadow} ${hShadow}px ${vShadow}px ${blurRadius}px ${spreadRadius}px ${rgbaColor}`;
}

// Converts HEX color and opacity to RGBA
function hexToRgba(color, opacity) {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    return `rgba(${r},${g},${b},${opacity})`;
}

// Applies the generated shadow to the preview box
function applyShadow(element, boxShadow) {
    element.style.boxShadow = boxShadow;
}

// Updates the code textarea with the generated box-shadow CSS
function upadateCode(text) {
    code.textContent = `box-shadow: ${text}`;
}

// Copies the generated code to the clipboard
function copyCode() {
    const codeText = code.textContent;
    navigator.clipboard.writeText(codeText).then(() => {
        alert("Code Copied to Clipboard");
    });
}

// Initializes the generator on page load
window.onload = generateShadow;
