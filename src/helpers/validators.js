/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import { conforms, every, values, countBy } from "lodash";

const isWhite = (value) => value === "white";
const isOrange = (value) => value === "orange";
const isGreen = (value) => value === "green";
const isRed = (value) => value === "red";
const isBlue = (value) => value === "blue";

const notColors = (value, ...colors) => {
    for (const color of colors) {
        if (color(value)) return false;
    }
    return true;
};

const colorsCount = (value) => countBy(values(value));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (shapes) => {
    const conditions = conforms({
        circle: isWhite,
        square: isGreen,
        triangle: isWhite,
        star: isRed,
    });

    return conditions(shapes);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (shapes) => {
    return colorsCount(shapes).green >= 2;
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (shapes) => {
    return colorsCount(shapes).red === colorsCount(shapes).blue;
};

// 4. Синий круг, красная звезда, оранжевый квадрат, треугольник любого цвета
export const validateFieldN4 = (shapes) => {
    const conditions = conforms({
        circle: isBlue,
        square: isOrange,
        star: isRed,
    });

    return conditions(shapes);
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (shapes) => {
    return Object.entries(colorsCount(shapes))
        .filter((i) => i[0] !== "white")
        .map((i) => i[1])
        .filter((i) => i >= 3).length;
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (shapes) => {
    return every([colorsCount(shapes).green === 2, isGreen(shapes.triangle), colorsCount(shapes).red === 1]);
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (shapes) => {
    return every(values(shapes), isOrange);
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({ star }) => {
    return notColors(star, isRed, isWhite);
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (shapes) => {
    return every(values(shapes), isGreen);
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({ triangle, square }) => {
    return every([notColors(triangle, isWhite), notColors(square, isWhite), triangle === square]);
};
