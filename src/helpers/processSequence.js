/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import { allPass } from "ramda";
import Api from "../tools/api";

const api = new Api();

// Чистые функции для валидации
const validLength = (str) => str.length > 2 && str.length < 10;
const isPositive = (str) => parseFloat(str) > 0;
const isNumber = (str) => /^[0-9]+\.?[0-9]*$/.test(str);

const rules = allPass([validLength, isPositive, isNumber]);

// Общая функция валидации
const validate = (str) => {
    if (!rules(str)) {
        throw new Error("ValidationError");
    }
    return str;
};
// Функция перевода к числу
const toNumber = (str) => Math.round(parseFloat(str));

// Функция вызова API для получения числа в двоичном виде
const convertToBinary = async (number) => {
    try {
        const response = await api.get("https://api.tech/numbers/base", {
            number,
            from: 10,
            to: 2,
        });
        return response.result;
    } catch (e) {
        throw new Error(e);
    }
};

// Функция вызова API для получения животного по ID
const getAnimal = async (id) => {
    try {
        const response = await api.get(`https://animals.tech/${id}`, {});
        return response.result;
    } catch (e) {
        throw new Error(e);
    }
};

// Получение длины строки
const getLength = (str) => str.length;

// Возведение в квадрат
const square = (number) => number * number;

// Остаток от деления на 3
const mod3 = (number) => number % 3;

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const writeLogAsync = (num) => {
        writeLog(num);
        return num;
    };
    const main = (initialStr) => {
        Promise.resolve(initialStr)
            .then(writeLogAsync)
            .then(validate)
            .then(toNumber)
            .then(writeLogAsync)
            .then(convertToBinary)
            .then(writeLogAsync)
            .then(getLength)
            .then(writeLogAsync)
            .then(square)
            .then(writeLogAsync)
            .then(mod3)
            .then(writeLogAsync)
            .then(getAnimal)
            .then((name) => handleSuccess(name))
            .catch((error) => handleError(error.message));
    };

    main(value);
};

export default processSequence;
