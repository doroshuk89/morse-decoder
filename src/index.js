const MORSE_TABLE = {
    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.": "f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    "-----": "0",
};

function decode(expr) {
    const exprArr = expr.split("");

    // Разделяем массив по блокам 10 знаков.
    const data = [];
    for (let i = 0; i < exprArr.length; i += 10) {
        data.push(exprArr.slice(i, i + 10));
    }

    // Убираем начальные нули
    const dataCode = data.map((value) => {
        for (let j = 0; j < value.length; j++) {
            if (value[j] === "1") {
                value.splice(0, j);
                return value;
            } else if (value[j] === "*") {
                return value;
            }
        }
    });

    // Преобразуем в точки-тире
    const Morse = dataCode.map((value) => {
        let strMorse = "";
        for (let j = 0; j < value.length; j += 2) {
            if (value[j] === "*") {
                strMorse += "space";
                break;
            }
            if (value[j] + value[j + 1] === "10") {
                strMorse += ".";
            } else if (value[j] + value[j + 1] === "11") {
                strMorse += "-";
            }
        }
        return strMorse;
    });

    // Преобразуем в сообщение
    const message = Morse.reduce((string, element) => {
        if (element === "space") {
            string += " ";
        } else {
            string += MORSE_TABLE[element];
        }
        return string;
    }, "");

    return message;
}

module.exports = {
    decode,
};
