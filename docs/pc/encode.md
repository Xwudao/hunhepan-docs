---
outline: deep
---

# 编码 encode

`encode`提供如下常用的方法，用以对字符串进行编码和解码。

## API

```js
md5Encode(str string) string
md5Encode16(str string) string
base64Decode(str string) (string, error)
base64DecodeWithCharset(str string, charset string) (string, error)
base64EncodeByte(bs []byte) string
base64ToBytes(str string) ([]byte, error)
base64Encode(str string) string
stringToBytes(str string) []byte
bytesToString(bytes []byte) string
base64EncodeToByteArray(str string) []byte
base64DecodeToByteArray(str string) ([]byte, error)
hexDecodeToByteArray(hexString string) ([]byte, error)
hexDecodeToString(hexString string) (string, error)
byteToHex(bs []byte) string
hexEncodeToString(utf8String string) string
sha256(str string) string
md5(str string) string
md2(str string) string
sha1(str string) string
sha384(str string) string
sha512(str string) string
hexToBytes(data string) ([]byte, error)
```

> 以上方法名有些奇怪，这是为了尽量兼容 android 的 api

### 用法

```js
var res = encode.md5Encode("i love hhp");
log.log(res); // 19c215287f52bd903b39bd62cce32b21
```
