class MyArray {

    constructor() {
        this.array = [];
    }

    push(val) {
        this.array.push(val);
    }

    get(index) {
        return this.array[index];
    }

    forEach(fn) {
        for (let i = 0; i < this.array.length; i++) {
            fn(this.array[i]);
        }
    }

    filter(functionToRunOnEachElementOfArray) {
        let arrayOfElementsThatSatisfyGivenFunction = [];
        for (let element of this.array) {
            if (functionToRunOnEachElementOfArray(element)) {
                arrayOfElementsThatSatisfyGivenFunction.push(element);
            };
        };
        return arrayOfElementsThatSatisfyGivenFunction;
    };

    map(fn) {
        let newArr = [];

        for (let element of this.array) {
            newArr.push(fn(element));
        };

        return(newArr);
    };

}

let arr = new MyArray();
arr.push(4);
arr.push(-1);
arr.push(9);
arr.push(2);

// console.log(arr);

let greaterThanOneArray = arr.filter((currentElement) => {
    if (currentElement > 1) {
        return true;
    }
    return false;
});

let doubledArr = arr.map((num) => {
    return num * 2;
});

console.log(arr.array);
console.log(doubledArr);