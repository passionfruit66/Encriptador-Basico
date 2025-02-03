const fs = require('fs');
const { exec } = require('child_process');

console.clear();
function showAsciiLogo() {
    console.log(" ███▄    █  ██ ▄█▀ █     █░▓█████   ██████ ▄▄▄█████▓\n" +
                " ██ ▀█   █  ██▄█▒ ▓█░ █ ░█░▓█   ▀ ▒██    ▒ ▓  ██▒ ▓▒\n" +
                "▓██  ▀█ ██▒▓███▄░ ▒█░ █ ░█ ▒███   ░ ▓██▄   ▒ ▓██░ ▒░\n" +
                "▓██▒  ▐▌██▒▓██ █▄ ░█░ █ ░█ ▒▓█  ▄   ▒   ██▒░ ▓██▓ ░ \n" +
                "▒██░   ▓██░▒██▒ █▄░░██▒██▓ ░▒████▒▒██████▒▒  ▒██▒ ░ \n" +
                "░ ▒░   ▒ ▒ ▒ ▒▒ ▓▒░ ▓░▒ ▒  ░░ ▒░ ░▒ ▒▓▒ ▒ ░  ▒ ░░   \n" +
                "░ ░░   ░ ▒░░ ░▒ ▒░  ▒ ░ ░   ░ ░  ░░ ░▒  ░ ░    ░    \n" +
                "   ░   ░ ░ ░ ░░ ░   ░   ░     ░   ░  ░  ░    ░      \n" +
                "         ░ ░  ░       ░       ░  ░      ░           ");
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function textToBinary(text) {
    return text.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
}

function binaryToText(binary) {
    return binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
}

function binaryToEmoji(binary) {
    return binary.replace(/1/g, '⬛').replace(/0/g, '⬜');
}

function textToMorse(text) {
    const morseCode = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
        'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
        'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
        'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
        'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
        'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
        '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
        '0': '-----', ' ': '/' 
    };
    return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
}

function morseToText(morse) {
    const morseCodeReversed = {
        '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
        '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
        '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
        '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
        '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
        '--..': 'Z', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
        '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9',
        '-----': '0', '/': ' ' 
    };
    return morse.split(' ').map(code => morseCodeReversed[code] || code).join('');
}

function showMenu() {
    console.clear();
    showAsciiLogo();
    console.log("Seleccione una opción:");
    console.log("1 - Convertir texto a binario");
    console.log("2 - Convertir binario a texto");
    console.log("3 - Convertir binario a emojis");
    console.log("4 - Convertir texto a Morse");
    console.log("5 - Convertir Morse a texto");
    console.log("6 - Salir");
    rl.question("Ingrese su opción: ", function(option) {
        if (option === "6") {
            console.log("Saliendo del programa...");
            rl.close();
            return;
        }

        let promptText = "";
        let processFunction;

        if (option === "1") {
            promptText = "Ingrese un texto (o ingrese 'salir1' para volver al menú): ";
            processFunction = textToBinary;
        } else if (option === "2") {
            promptText = "Ingrese un código binario (o ingrese 'salir1' para volver al menú): ";
            processFunction = binaryToText;
        } else if (option === "3") {
            promptText = "Ingrese un código binario (o ingrese 'salir1' para volver al menú): ";
            processFunction = binaryToEmoji;
        } else if (option === "4") {
            promptText = "Ingrese un texto (o ingrese 'salir1' para volver al menú): ";
            processFunction = textToMorse;
        } else if (option === "5") {
            promptText = "Ingrese un código Morse (o ingrese 'salir1' para volver al menú): ";
            processFunction = morseToText;
        } else {
            console.log("Opción no válida. Intente de nuevo.");
            return showMenu();
        }

        rl.question(promptText, function(input) {
            if (input === "salir1") {
                return showMenu();
            }
            const result = processFunction(input);
            fs.writeFileSync('resultado.txt', result);
            console.log("Guardado en un txt");
            exec('node "' + __filename + '"');
            process.exit();
        });
    });
}

showMenu();
