export default class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
}

export function sayHello(person) {
    console.log(`${person.name} says Hi`);
}