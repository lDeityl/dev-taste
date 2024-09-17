export function formatNumber(number: number) {
    // Преобразуем число в строку
    let [integerPart, fractionalPart] = number.toFixed(2).split('.');

    // Используем регулярное выражение для добавления пробелов как разделителей
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    // Убираем лишние нули в дробной части, если они есть
    if (fractionalPart) {
        fractionalPart = fractionalPart.replace(/0+$/, ''); // Удаляем все нули в конце дробной части
        if (fractionalPart.length === 0) {
            return formattedIntegerPart; // Если дробная часть пустая, возвращаем только целую часть
        }
        return `${formattedIntegerPart}.${fractionalPart}`;
    }

    // Возвращаем только целую часть, если дробной части нет

}