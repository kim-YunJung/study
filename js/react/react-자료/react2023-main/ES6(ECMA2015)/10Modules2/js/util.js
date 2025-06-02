export const add = (numbers) => {
    return numbers.reduce((acc, cur) => {
        return acc + cur;
    }, 0);
}