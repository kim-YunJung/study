// 배열 내보내기
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 상수 내보내기
export const ROCK = 1;
export const PAPER = 2;
export const SCISSORS = 3;

// 클래스 내보내기
export class User {
    constructor(name) {
        this.name = name;
    }
}

function sayHello(user) {
    alert(`Hello, ${user}!`);
}
function sayBye(user) {
    alert(`Bye, ${user}!`);
}
export {sayHello, sayBye};