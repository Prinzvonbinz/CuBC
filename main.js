// --- Modus Umschalten ---
const binaryModeBtn = document.getElementById("binaryMode");
const caesarModeBtn = document.getElementById("caesarMode");
const binarySection = document.getElementById("binarySection");
const caesarSection = document.getElementById("caesarSection");

binaryModeBtn.addEventListener("click", () => {
    binarySection.style.display = "block";
    caesarSection.style.display = "none";
    binaryModeBtn.classList.add("active");
    caesarModeBtn.classList.remove("active");
});

caesarModeBtn.addEventListener("click", () => {
    binarySection.style.display = "none";
    caesarSection.style.display = "block";
    caesarModeBtn.classList.add("active");
    binaryModeBtn.classList.remove("active");
});

// --- Text ↔ Binär ---
function textToBinary(text) {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8,'0');
    }).join(' ');
}

function binaryToText(binary) {
    return binary.split(' ').map(bin => {
        return String.fromCharCode(parseInt(bin, 2));
    }).join('');
}

document.getElementById("toBinary").addEventListener("click", () => {
    const input = document.getElementById("binaryInput").value;
    document.getElementById("binaryOutput").value = textToBinary(input);
});

document.getElementById("toText").addEventListener("click", () => {
    const input = document.getElementById("binaryInput").value;
    document.getElementById("binaryOutput").value = binaryToText(input);
});

// --- Caesar Verschlüsselung ---
function caesarEncrypt(text, shift) {
    return text.split('').map(char => {
        let code = char.charCodeAt(0);
        if(code >= 65 && code <= 90) { // A-Z
            return String.fromCharCode((code - 65 + shift) % 26 + 65);
        } else if(code >= 97 && code <= 122) { // a-z
            return String.fromCharCode((code - 97 + shift) % 26 + 97);
        } else {
            return char;
        }
    }).join('');
}

function caesarDecrypt(text, shift) {
    return caesarEncrypt(text, (26 - shift) % 26);
}

document.getElementById("encrypt").addEventListener("click", () => {
    const text = document.getElementById("caesarInput").value;
    const shift = parseInt(document.getElementById("caesarShift").value) || 0;
    document.getElementById("caesarOutput").value = caesarEncrypt(text, shift);
});

document.getElementById("decrypt").addEventListener("click", () => {
    const text = document.getElementById("caesarInput").value;
    const shift = parseInt(document.getElementById("caesarShift").value) || 0;
    document.getElementById("caesarOutput").value = caesarDecrypt(text, shift);
});

// --- Copy to Clipboard ---
document.getElementById("copyBinary").addEventListener("click", () => {
    document.getElementById("binaryOutput").select();
    document.execCommand("copy");
});

document.getElementById("copyCaesar").addEventListener("click", () => {
    document.getElementById("caesarOutput").select();
    document.execCommand("copy");
});
