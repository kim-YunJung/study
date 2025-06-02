import {sayHello, sayBye, ROCK, PAPER, SCISSORS, months, User} from './data.js';

//함수 호출
sayHello('nakja');
sayBye('sangmir');

//상수 사용
console.log("Com", ROCK);
console.log("User", PAPER);

//배열 사용
months.forEach(element => {
    console.log(element);
});

//클래스 사용
let user = new User('유겸이');
console.log('이름->', user.name);
