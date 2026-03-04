// part(1) question  1 
let num = Number("123") + 7
console.log (num)


// 2
function checkfalsy(value){
    return !value ? "invalid" : "valiad"
}
console.log(checkfalsy(0))


// 3
for (let i=1; i<=10; i++ ){
    if (i % 2 === 0) continue;
    console.log(i)
}


// 4
let arr = [1, 2, 3, 4, 5]
let evennumbers = arr.filter(num => num % 2===0)
console.log(evennumbers)


// 5
let arr1 =[1, 2, 3]
let arr2 =[4, 5, 6]
let merged = [...arr1, ...arr2]
console.log(merged)


// 6
function getday(num) {
    switch (num){
        case 1: return "sunday";
        case 2: return "monday";
        case 3: return "tuesday";
        case 4: return "wednesday";
        case 5: return "thursday";
        case 6: return "friday";
        case 7:return "sunday";
        default : return "invalid day";
    }
}
console.log(getday(2))



// 7
let strings = ["a", "ab", "abc"]
let lengths = strings.map(str => str.length)
console.log(lengths)


 // 8
function checks(num){
    return (num % 3===0 && num % 5===0) ? "divisible by both" : "not divisbie"
}
console.log(checks(15))



// 9
const square = num => num * num
console.log(square(5))



// 10
function personinfo(name, age){
    return `${name} is ${age} years old`
    
}
console.log(personinfo("john", 25 ))



// 11
function sum(...nums){
    let total = 0
    for (let num of nums){
        total +=num
    }
    return total
}
console.log(sum(1, 2, 3, 4))



// 12
function success() {
    setTimeout ( () => {
        console.log("success")
    }, 3000 )
}
success()


// 13
function findlargest(arr){
    return Math.max(...arr)
}
console.log(findlargest([1, 3, 7, 2, 4]))



// 14
function getkeys(obj){
    return Object.keys(obj)
}
console.log(getkeys({ name : "john" , age : 30}))



// 15
function splitwords(str){
    return str.split(" ")
}
console.log(splitwords("the quick brown fox"))





 // part(2) question 1
// foreach work at arrays only && مينفعش نستخدم continue , break
// for...of work at array ,string , map && ينفع نستخدم  continue , break 




// question2 TDZ  let  const هى الفترة بين بداية الاسكوب وتعريف المتغير ب 
//console.log(a)   error
//let a = 5



// question3  == فقط value بيشيك على 
//   === value, Data tayp بيشيك على 


// question5  conversion تحويل صريح  number("5")
// coercion  "5" * 2  //10  تحويل تلقائى


