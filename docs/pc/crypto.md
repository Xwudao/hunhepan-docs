---
outline: deep
---

# crypto

你可以在JS作用域内使用`crypto`全局变量，它提供了一些加密相关的方法；

```js
rsaEncrypt(data string, pubKey string, outputType string) string
rsaDecrypt(data string, priKey string, inputType string) string

easyEncrypt(easyType, plainText, key, iv string) string
easyDecrypt(easyType, cipherText, key, iv string) string

rc4(data, key string) string
```

## RSA加解密

RSA加解密使用
```js
rsaEncrypt(data string, pubKey string, outputType string) string
rsaDecrypt(data string, priKey string, inputType string) string
```
两个方法；

其中`outputType`和`inputType`可以是`base64`或`hex`

顾名思义，inputType是指解密时输入的数据形式，outputType是指加密后输出的数据形式；

## AES/DES加解密

AES/DES加解密使用
```js
easyEncrypt(easyType, plainText, key, iv string) string
easyDecrypt(easyType, cipherText, key, iv string) string
```

参数 `easyType` 应该为以下格式:cryptoType/mode/padding 或 cryptoType/mode/padding/transcode

例如：
```js
easyEncrypt("des/CFB/Pkcs7/Base64", plaintext, key, iv)
easyDecrypt("des/CFB/Pkcs7/Base64", ciphertext, key, iv)

easyEncrypt("aes/CTR/Pkcs7", plaintext, key, iv)
easyDecrypt("aes/CTR/Pkcs7", ciphertext, key, iv)

easyEncrypt("3des/ECB/Pkcs5/Hex", plaintext, key, iv)
easyDecrypt("3des/ECB/Pkcs5/Hex", ciphertext, key, iv)
```
