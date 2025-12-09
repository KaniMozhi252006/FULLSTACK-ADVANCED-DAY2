// Day 1
//Declaration
let name="Kanimozhi"
const age=19
var country="India" 

//Operators
var c=5+6
var d=10-5
var e=35*4
var f=48/12
console.log(c,d,e,f) //printing statement
console.log(c==d)
console.log(f!=d)
// "=="->checks values are equal or not
// "==="->checks both values and its data type
console.log(5=="5")
console.log(5==="5")

//Function creation
function greet(name){
    console.log("Hello "+name)
}
//function calling
greet("Kanimozhi")

const Age=19
function majmin(age){
    if(age>=18){
        console.log("Major")
    }
    else{
        console.log("Minor")
    }
}
majmin()

//Loops
//for loop
for(let i=0;i<4;i++){
    console.log(i)
}

//Object Arrays
let fruits=["Apple","Orange","Grapes","MuskMelon"]
let car={brand:"Tyota",model:"Camry",year:2020}
console.log(fruits[0])
console.log(car.brand)

//Accessing the value even before declaring it
//Hoisting-can access the value before declaration
console.log(x)
var x=5 //output: undefined ->can access the value before declaration but shows undefined
// let x=5//issue occurs

//let - cannot re-declare [use often]
//var- can re-declare [will get confused if often used],hoisting
//const - once declared,cannot change

let q=null;
let q1;
console.log(q)
console.log(q1) //values not declared , therefore output shows "undefined"


//switch case  (get user input-doubt)
let fru= "orange"
switch(fru){
    case "orange":
        console.log("Orange is selected")
        break
    case "apple":
        console.log("apple is selected")
        break
    case "grapes":
        console.log("grape is selected")
        break
    default:
        console.log("Invalid")
}

//Creating object
let person={
    firstname:"Kani",
    Age:19,
    city:"Namakkal",
}

for (let key in person){
    console.log(key + ":" + person[key])
}

let pazhams=["Apple","Orange","Grape","Banana"]
for(let pazham of pazhams){
    console.log(pazham)
}

//Ternary operator
let vayasu=25
console.log(vayasu>=18 ? "accessible" : "not allowed")

//Arrow function 1 (person object pushed inside but no output) !!DOUBT
const arrow=(person)=>{
    console.log("Hello "+firstname)
}

//Arrow funstion 2
//cannot use 'this' instruction 
const greets=(Name)=>{
    return `Hello, ${Name}`
}
console.log(greets("kani"))

//Spread operator
//if we single value for each variable like
//name="kani",age=19
//it will ask us to change the age value to string in order to iterate
//output would be:k,a,n,i
//so give it in 
const number=[1,2,3];
const moreNum=[4,5,6];
// const allNum=[...number,...moreNum]
const allNum=[0,...number,4,5,6]
console.log(allNum)
//console.log(number+moreNum)

let kani=["Mozhi",19]
let koushi=["Shree",19,"Theni"]
let renduperum=[...kani,...koushi]
console.log(renduperum)

//Array de-structuring
const n=[1,2,3]
const[a,b,j]=n
console.log(a,b,j)

const [first, ,third]=n
console.log(first,third)

const [x1,y1,...rest]=n
console.log(x1,y1)
console.log(rest)

const p1={per:"Kanimozhi",ageuh:19,cityyyy:"Salem"}
const{per,ageuh}=person;
console.log(per,ageuh)

//Map,Filter,Reduce
//map-creates new data type,donot change values
//for loop changes value
const numm=[1,2,3,4,5]
const numm1=numm.map(numm=>numm*numm)
console.log(numm1)
//Filter
const evenNum=numm.filter(num=>num%2==0)
console.log(evenNum)
//reducer
const sum=numm.reduce((accumulator,currenTValue)=>accumulator+currenTValue,0)
console.log(sum)

//Rest parameters - simalr to spread operators
//rest - used in function
//spread - used in operators

function sum1(...numbers){
    return numbers.reduce((total,numm)=>total+numm,0)
}
console.log(sum1(1,2,3))

//Array operations
console.log("Array operations")
const arr=[1,2,3,4]
console.log(arr)
//push-add elements at the last
arr.push(5)
console.log(arr)
arr.push(5,6)
console.log(arr)
//pop - delete element at the last
arr.pop()
console.log(arr)
//shift-first element deletion
//unshift-add element to the front/start/first area
arr.shift()
console.log(arr)
arr.unshift(0)
console.log(arr)

//Synchronous
console.log("String operations")
let str="Hello World!" //includes "space" too
console.log(str.length)//12
console.log(str.charAt(0))//H
const str1="hello"
const str2="world"
console.log(str1.concat(str2))//helloworld
console.log(str.includes("World")) //checks whether the given content is available in the variable
console.log(str.indexOf("world"))//-1
console.log(str.substring(0,5))//Hello

//In order to use the javascript outside the browser we need node.js
//npm-node package management
