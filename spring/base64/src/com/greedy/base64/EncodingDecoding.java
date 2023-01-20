package com.greedy.base64;

import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

/* 자바에서 base64로 인코딩 및 디코딩 */
public class EncodingDecoding {
	public static void main(String[] args) {
		
		/* java 8에서 제공하는 기본 Base64 Encoder와 Decoder */
		Encoder encode = Base64.getEncoder();
		Decoder decode = Base64.getDecoder();

		/* encode */
		String testStr = "base64로인코딩한비밀키";
		byte[] testStrToByteArr = testStr.getBytes();
		
		byte[] encodeByte = encode.encode(testStrToByteArr);
		
		String encodedStr = new String(encodeByte);
		System.out.println("인코딩: " + encodedStr);
		
		/* decode */
		byte[] decodeByte = decode.decode(encodedStr);
		System.out.println("디코딩: " + new String(decodeByte));
	}
}
