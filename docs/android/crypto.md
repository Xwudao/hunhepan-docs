---
outline: deep
---

# 加解密 encode

## 对称加密

```js
fun createSymmetricCrypto(
    transformation: String,
    key: ByteArray?,
    iv: ByteArray?
): SymmetricCrypto

fun createSymmetricCrypto(
    transformation: String,
    key: ByteArray
): SymmetricCrypto

fun createSymmetricCrypto(
    transformation: String,
    key: String
): SymmetricCrypto

fun createSymmetricCrypto(
    transformation: String,
    key: String,
    iv: String?
): SymmetricCrypto
```

- transformation
  - AES/CBC/PKCS5Padding
  - AES/CBC/NoPadding
  - AES/ECB/PKCS5Padding
  - AES/ECB/NoPadding
  - AES/CFB/NoPadding
  - AES/CFB/PKCS5Padding
  - AES/OFB/NoPadding
  - AES/OFB/PKCS5Padding
  - AES/CTR/NoPadding
  - AES/CTR/PKCS5Padding
  - DES/CBC/PKCS5Padding
  - DES/CBC/NoPadding
  - DES/ECB/PKCS5Padding
  - DES/ECB/NoPadding
  - DES/CFB/NoPadding
  - DES/CFB/PKCS5Padding
  - DES/OFB/NoPadding
  - DES/OFB/PKCS5Padding
  - DES/CTR/NoPadding
  - DES/CTR/PKCS5Padding


主要参考：https://hutool.cn/docs/#/crypto/%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86-SymmetricCrypto

混合盘使用`hutool`的`SymmetricCrypto`


## 非对称加密（RSA）
对于对称加密，目前我们仅提供了rsa相关函数：

since 0.5.2

```js
fun rsaEncryptBase64(    data: String,    publicKey: String,): String 

fun rsaEncryptHex(    data: String,    publicKey: String,): String

fun rsaDecryptBase64(    data: String,    privateKey: String,): String

fun rsaDecryptHex(    data: String,    privateKey: String,): String
```


## 非对称加密（RSA）（新）@since v0.8.8

预计在v0.8.8及之后提供新的的非对称加密支持！

提供全局类AsymmetricCrypto，其拥有的方法如下：

```js
fun setPublicKey(key: ByteArray): T
fun setPublicKey(key: String): T
fun setPrivateKey(key: ByteArray): T
fun setPrivateKey(key: String): T

  

fun decrypt(data: Any, usePublicKey: Boolean? = true): ByteArray?
fun decryptStr(data: Any, usePublicKey: Boolean? = true): String?

  

fun encrypt(data: Any, usePublicKey: Boolean? = true): ByteArray?
fun encryptHex(data: Any, usePublicKey: Boolean? = true): String?
fun encryptBase64(data: Any, usePublicKey: Boolean? = true): String?
```

其中`new AsymmetricCrypto(algorithm: String)`

algorithm:

- RSA
- RSA/ECB/PKCS1Padding
- RSA/ECB/NoPadding
- RSA/None/NoPadding


使用举例：

1. 使用公钥加密字符串：

```js
var rsa = new AsymmetricCrypto('RSA/ECB/PKCS1Padding')  
rsa.setPublicKey('MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMbdeu9xLfvZg8E3h0vzQuN0VTzvaojqOOaXppoUQZ92vEAu7IFmbMoTGvfECdus3ivHOPJ2i/rmS1OnrNZ5UrkCAwEAAQ==');
var res = rsa.encryptBase64('123123', true)
log.log(res)
```

输出：`Pl4nKRHJ3akKtyE6eT4xhrWGhkFThsmeiBUKClnDF+OCKoLR3WoCsB1Xlp29Q+Dm9wCwpAWJ2pQolSpiVKWOZg==`

**注意点：**

- 公钥不需要加`-----BEGIN PUBLIC KEY-----`，且中间没有换行
- 公钥是Base64格式


2. 使用私钥解密字符串

```js
var rsa = new AsymmetricCrypto('RSA/ECB/PKCS1Padding')
rsa.setPrivateKey('MIIBPAIBAAJBAMbdeu9xLfvZg8E3h0vzQuN0VTzvaojqOOaXppoUQZ92vEAu7IFmbMoTGvfECdus3ivHOPJ2i/rmS1OnrNZ5UrkCAwEAAQJBAKunF2tAvVlril+oR5+WTYE5tC2R1tpxmkXoVsUegPpborrXE/SP1TIivtojkNHNnA93kKxNkrBmwTpqB4YGBYECIQD3cweJ2KiMfx9kWZOnzhDungftFFYyfDvqNw866uGNCQIhAM28qyPiP10lPeGGMp0/tVntso1UMIvTsTEa4RHUy7QxAiEAooLAQ66v2z2tvzj5OS6jfiL5b6F4jsV6j/LDJN2XbgkCIH5/yxq9OgijpXDNesGFMpSgunB7m33eI8z1of28waOBAiEA8q24KumgJ+8T9YRLcGUYpNK/bePIAwKY/LgPE6GhZFA=');
var res = rsa.decryptStr('wbbrCmI05ff3Gqt9P1yB7/Ht1ELI8HPR0c8l88CmgMbi6SE/yOx8mkBHoGO4cUs+x5DXdwQMF3qRdDt0bpL4eQ==', false)
log.log(res)
```

输出：`123123`

**同样：**

- 私钥不需要加`-----BEGIN RSA PRIVATE KEY-----` 和 `-----END RSA PRIVATE KEY-----`
- 私钥中间没有换行
- 私钥是Base64格式
- decryptStr第二个参数是false，代表是使用私钥，这主要作内部使用


## 使用CryptoJS @since v0.8.6

@since v0.8.6

估计在v0.8.6及以上版本，会引入CryptoJS；

这样做的好处是：大多数网站进行加解密的库也是使用的CryptoJS，天然兼容性好！

CryptoJS的官网：https://cryptojs.gitbook.io/docs/

一些细节可以参考官网；下面，将以常见的加密方式举例；


### MD5

```js
var res = CryptoJS.MD5('123456')
log.log(res.toString())
```

Output: `e10adc3949ba59abbe56e057f20f883e`

### ShaX

```js
var hash = CryptoJS.SHA1("123456");
log.log(hash.toString()) // 7c4a8d09ca3762af61e59520943dc26494f8941b
log.log(hash.toString(CryptoJS.enc.Base64)) // fEqNCco3Yq9h5ZUglD3CZJT4lBs=

var hash = CryptoJS.SHA256("123456");
log.log(hash.toString()) // 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
log.log(hash.toString(CryptoJS.enc.Base64)) // jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=

var hash = CryptoJS.SHA512("123456");
log.log(hash.toString()) 
//a3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413
log.log(hash.toString(CryptoJS.enc.Base64)) 
// ujJTh2rta8ItSm/1PYQGxq2GQZXtFEq1yHYhtsIztUi66uaVbfNG7IwX9eoQ817jy8UUeX7X3dMUVGTioLq0Ew==
```

### Sha3


```js
var hash = CryptoJS.SHA3("123456", { outputLength: 512 });
log.log(hash.toString())
```

Output:
`808d63ba47fcef6a7c52ec47cb63eb1b747a9d527a77385fc05c8a5ce8007586265d003b4130f6b0c8f3bb2ad89965a5da07289ba5d1e35321e160bea4f766f8`


### HmacX

```js
var hash = CryptoJS.HmacMD5("Message", "Secret Passphrase");
log.log(hash.toString())//5e03d0c1b42ef0b7e61fb333f3993949
log.log(hash.toString(CryptoJS.enc.Base64))//XgPQwbQu8LfmH7Mz85k5SQ==

var hash = CryptoJS.HmacSHA1("Message", "Secret Passphrase");
log.log(hash.toString())//e90f713295ea4cc06c92c9248696ffafc5d01faf
log.log(hash.toString(CryptoJS.enc.Base64))//6Q9xMpXqTMBskskkhpb/r8XQH68=

var hash = CryptoJS.HmacSHA256("Message", "Secret Passphrase");
log.log(hash.toString())//32c647602ab4c4c7543e9c50ae25e567c3354e1532b11649ce308e6e2568d205
log.log(hash.toString(CryptoJS.enc.Base64))//MsZHYCq0xMdUPpxQriXlZ8M1ThUysRZJzjCObiVo0gU=

var hash = CryptoJS.HmacSHA512("Message", "Secret Passphrase");
log.log(hash.toString()) //c03f82cd6f9d03920d95caeedfa722d4e42325a18b049942ee5560787ad2aa394be6b95849c563ecdd37495726cd6236529a721b563b9778dd6119939bcab7e1
log.log(hash.toString(CryptoJS.enc.Base64)) //wD+CzW+dA5INlcru36ci1OQjJaGLBJlC7lVgeHrSqjlL5rlYScVj7N03SVcmzWI2UppyG1Y7l3jdYRmTm8q34Q==

```


### AES

aes是目前网站最常见的加密方式，其需要key, iv,mode

下面以加密字符串：`123456` 举例：

```js
var key = CryptoJS.enc.Utf8.parse("1234567890009876");
var iv = CryptoJS.enc.Utf8.parse("1234567890009876");
var encrypted = CryptoJS.AES.encrypt("123456", key, {
  iv: iv,
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7
});
log.log(encrypted.toString()) // Base64
var hexStr = encrypted.ciphertext.toString(); // Hex
log.log(hexStr)
```

Output:

`fUp2G0ORpNqhmWpiTVhxPg==`

`7d4a761b4391a4daa1996a624d58713e`

如上所写，aes加解密主要有两种格式，一种是Base64,一种是Hex（二进制）


mode可选：

- CBC
- CFB
- CTR
- OFB
- ECB


Padding可选：

- Pkcs7
- Iso97971
- AnsiX923
- Iso10126
- ZeroPadding
- NoPadding


### DES

```js
var key = CryptoJS.enc.Utf8.parse("1234567890009876");
var iv = CryptoJS.enc.Utf8.parse("1234567890009876");
var encrypted = CryptoJS.DES.encrypt("123456", key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
});
log.log(encrypted.toString()) // Base64
var hexStr = encrypted.ciphertext.toString(); // Hex
log.log(hexStr)
```


Output:

`HUX+7VtHgb0=`

`1d45feed5b4781bd`


**注意：**

内置的CryptoJS不并不是支持所有原生的方法，如果提示：

`Error: Native crypto module could not be used to get secure random number. (crypto.js#56)`

也就说明不支持！
