## Message Formatting

```ts
const message =
   "Hello, my name is {YOUR_NAME}, I would love to subscribe to SENDEET_TEST";
const encodedStr = encodeURIComponent(message);
console.log(`https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedStr}`);
```

Please note that when numbers are used, they are without + symbols, and spaces, for instance, +1 (234)-463-9872 would become 12344639872 as a string

To be able to pass around the clientId, and other possible details, you can use paystack's metadata.

## Extra links

https://wa.link/963poy
https://wa.me/whatsappphonenumber?text=urlencodedtext
https://wa.me/2349876578904?text=Hello%2C%20my%20name%20is%20%7BYOUR_NAME%7D%2C%20I%20would%20love%20to%20subscribe%20to%20SENDEET_TEST

https://developers.facebook.com/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media
