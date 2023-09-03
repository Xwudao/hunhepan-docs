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


### rsa加密例子

```js
  var pubKey=`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCNdPxoU6o/2CtgK4/Ik/vNrwZO
/CeFPraklTYVYdi2P9MUjKGsBc1bDV1fMsbYsMjke2HcWG7amfPJiK/e5Aufx3eq
WgP4goeklnbx3e95qsyvgPoSJFto/JBlswVfdmESl0HoW+kThtLm01kLxR7PThwV
KcyFESasDVgEIUFNowIDAQAB
-----END PUBLIC KEY-----`
  
var encodedBase64 = crypto.rsaEncrypt('i love hhp',pubKey,'base64')
log.log(encodedBase64)
// NMeaBcB29/R3UTpT0nwd2HinD8h2qfUxfX3OJt5KwBkbC2ds0BkLSYlC6f553QTMD8ALsx3S87Bf2JXEHJFOPA/oMrDM/oncFJ3Rfvod9yoPqho/gPc8gA69oCspvDYcibXewtcd1LRiiLBlZ2WwrxsPjJjfphbiMSYLhdGgJCg=
var encodedHex = crypto.rsaEncrypt('i love hhp',pubKey,'hex')
log.log(encodedHex)
// 4e748259e3ce914f345ea7e59387656b08fd8280a65d1bee78b74ab8b17eb214ca8a486667fc4c862e25c58021603014717db95c6e8abf6192ee6b10c720437dc4759c9ba34ad770473828f7d696e232220894f1fb28921cec11d0a154ed48e562910e6abd1c6e2bc6fd671e447c353a22590ea8aed4a51e5f6d22c65e9114b1  

```

### rsa解密例子

```js
  var priKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCNdPxoU6o/2CtgK4/Ik/vNrwZO/CeFPraklTYVYdi2P9MUjKGs
Bc1bDV1fMsbYsMjke2HcWG7amfPJiK/e5Aufx3eqWgP4goeklnbx3e95qsyvgPoS
JFto/JBlswVfdmESl0HoW+kThtLm01kLxR7PThwVKcyFESasDVgEIUFNowIDAQAB
AoGAResB62sXJnFplyJQ8lo6xsJxAs9dlV2XFyhtUApJ/GL1qR2Nt6Iyi4PCmBBX
+rj+wvg9OZU4TbJ0rjNygmADYhxmuZ7RoFJbzgIcv4oP0GDn/c79TeOw1gvUnecJ
bOblC0wLMECN3fsUMH+0ZCjSuLd3b57kNoqlXtUzisDospECQQDQadNyiuET1e0U
FknGgl5emBn705eXlp9otU61mF12Yjf41nyavcEi4uEOEIRQGipVObtmfEm+D9J6
ZHoMPEqrAkEArcFs/hjhSBRVsfqZy+01uCwnZIy+ZYxvASwGpDkDzKB3tnrwoPa7
Pz4tliSkl/M42b7RfWvNOtPynSq31CQI6QJARWSHB+Nf79fR2VdWdycfPsXMGQIp
vkpjh1ye+W3i6LDpTAw2bttxfCkooCM1uuoLYFcZo5UMhKEGBsR/sqU8gwJAXw47
X0MjM7iULRroumxaABh/sH1ix9EtBRodxAfA8Vg0Ras6KwTv6ShN7h67wLj5t/2x
Q4kPLIi46IxvJupTyQJABkkzbd8D9T5eR2dbTJ9ZTzPoHIsGT11QSzQzAmvSL82Y
ofGs25wrDXtphjBlr0JNixBwjPHYoJ0slv4DUnu97w==
-----END RSA PRIVATE KEY-----`

var decodedBase64 = crypto.rsaDecrypt('NMeaBcB29/R3UTpT0nwd2HinD8h2qfUxfX3OJt5KwBkbC2ds0BkLSYlC6f553QTMD8ALsx3S87Bf2JXEHJFOPA/oMrDM/oncFJ3Rfvod9yoPqho/gPc8gA69oCspvDYcibXewtcd1LRiiLBlZ2WwrxsPjJjfphbiMSYLhdGgJCg=',priKey,'base64')
log.log(decodedBase64) // i love hhp

var decodedHex = crypto.rsaDecrypt('4e748259e3ce914f345ea7e59387656b08fd8280a65d1bee78b74ab8b17eb214ca8a486667fc4c862e25c58021603014717db95c6e8abf6192ee6b10c720437dc4759c9ba34ad770473828f7d696e232220894f1fb28921cec11d0a154ed48e562910e6abd1c6e2bc6fd671e447c353a22590ea8aed4a51e5f6d22c65e9114b1', priKey,'hex')
log.log(decodedHex)// i love hhp
```

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


aes加解密使用和上面rsa的举例基本一致，这里就不赘述了；