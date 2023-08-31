---
outline: deep
---

# 编码 encode

```js
fun md5Encode(str: String): String
fun md5Encode16(str: String): String


fun base64Decode(str: String?): String
fun base64Decode(str: String?, charset: String): String
fun base64Encode(str: String): String?

fun stringToBytes(str: String): ByteArray // @since 0.8.8
fun bytesToString(bytes: ByteArray): String // @since 0.8.8

fun base64EncodeToByteArray(str: String): ByteArray // @since 0.8.8
fun base64DecodeToByteArray(str: String?): ByteArray?
fun base64DecodeToByteArray(str: String?, flags: Int): ByteArray?



/* HexString 解码为字节数组 */
fun hexDecodeToByteArray(hex: String): ByteArray? 
/* hexString 解码为utf8String*/
fun hexDecodeToString(hex: String): String? 
/* utf8 编码为hexString */
fun hexEncodeToString(utf8: String): String? 

fun sha256(str: String): String 
fun md5(str: String): String
fun md2(str: String): String 
fun sha1(str: String): String
fun sha384(str: String): String
fun sha512(str: String): String
```