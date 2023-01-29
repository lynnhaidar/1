// concat:

/*
let s1="Java";
let s2="Script";
let sfinal=s1.concat(" ",s2);
console.log(sfinal); 
*/

//Now, the function for concat is:
let s1="Java";
let s2="Script";
function concat(...string){
    return string.join(" ");
}
let sfinal=concat(s1,s2);
console.log(sfinal);



// replaceAll:
/*
let string1="Person number one is a genius Person";
let flag="Person";
let replacedword="Robot";
let stringfinal = string1.replaceAll(flag,replacedword);
console.log(finalstring);
*/

// Now, the function for replaceAll:
let string1="Person number one is a genius Person";
function replaceAll(string1,flag,replacedword){
    let string=string1.split(flag);
    return string.join(replacedword);
}
let stringfinal=replaceAll(string1,"Person","Robot");
console.log(stringfinal);
