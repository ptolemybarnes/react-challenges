# Javascript Cheatsheet

## How do I declare a function?

### Named function

This is the traditional method of declaring a function, using the `function` keyword followed by a name. Note that functions declared in this way are hoisted.

``` js
function fooBar(a, b, c) {
 // ...
 // requires explicit return at the end.
 return a + b + c;
}
```

### Anonymous function

Same as above, except the function is not named.

```js
function(a, b, c) {
 // ...
}
```

### Arrow functions

Introduced with ECMAScript 6, this style is preferred to the above. There are a few different ways of declaring an arrow function.

#### Arrow function with traditional C-style braces.
```js
const fooBar = (a, b, c) => {
  // requires explicit return
  return a + b + c
}
```

### Arrow function w/out braces
```js
// no braces, return implicit
const fooBar = (a, b, c) => a + b + c

// though usually written on one line, it can be spread across multiple lines.
const fooBar = (a, b, c) =>
  a + b + c
```

### Arrow function returning object

This is really a variation on the arrow function one-liner. But it's so common that it's worth listing here.

```js
// no braces, return implicit. The surrounding () are to tell the interpreter that the '{}' means an object, not a block (I guess :-p).
const fooBar = (a, b, c) => ({
  result: a + b + c
})

console.log(fooBar(1, 2, 3)) // => { result: 6 }
```

## How do functions take arguments?

### Positional arguments

```js
const fooBar = (one, two, three) => {
  // ...
}
fooBar(1, 2, 3)
```

### Named/keyword arguments

Here you pass values inside an object, which can be deconstructed in the argument list.

```js
const fooBar = ({ baz, quux }) => {
  return `${baz}, ${quux}`
}

fooBar({ baz: 'Hello', quux: 'World!' })
// 'Hello, World!'

// or...
const args = { baz: 'Hello', quux: 'World!' }
fooBar(args)
// 'Hello, World!'
```

### Positional + Named/keyword arguments

The two styles above can coexist.

```js
const fooBar = ({ baz, quux }, logger) => {
  logger(`${baz}, ${quux}`)
}

fooBar({ baz: 'Hello', quux: 'World!' }, logToCloudWatch)
// => 'Hello, World!'
```


## Destructuring assignment

## Object destructuring

```js
const user = {
  id: 42,
  isVerified: true
};

const { id, isVerified } = user;

console.log(id); => // 42
console.log(isVerified); => // true
```

## Array destructuring

```js
const user = ['Amy', 32]
const [ name, age ] = user;

console.log(name); => // 'Amy'
console.log(age); => // 32
```