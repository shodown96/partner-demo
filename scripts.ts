const regex = /^Hello, my name is ([A-Za-z ]+), I would love to subscribe to ([A-Za-z_]+)$/i;

// const message = "Hello, my name is Elijah, I would love to subscribe to SENDEET_TEST"
const message = "Hello, my name is {YOUR_NAME}, I would love to subscribe to SENDEET_TEST"
const encodedStr = encodeURIComponent(message);
console.log(`https://wa.me/${234_678_345_98763}?text=${encodedStr}`)
// const match = message.match(regex);

// if (match) {
//     const name = match[1]; // Extracted name
//     const subscription = match[2]; // Extracted subscription keyword
//     console.log("Name:", name);
//     console.log("Subscription:", subscription);
// } else {
//     console.log("No match found.");
// }

// +1 555 149 3786