package com.project.base64;

import java.security.Key;
import java.util.Base64;

import javax.crypto.spec.SecretKeySpec;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.DefaultJwtSignatureValidator;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

/* 비밀키 생성 및 해당 비밀 키로 JWT 생성 후 유효성 확인 */
public class JsonWebTokenSecretKey {
	public static void main(String[] args) {
		
		/* JWT의 비밀키 생성(HMAC-SHA 알고리즘 적용) - 최소한의 길이로 랜덤키 생성 됨 */
		Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
//		Key key = Keys.hmacShaKeyFor();
		
		/* BASE64로 인코딩 */
		String secretKey = Encoders.BASE64.encode(key.getEncoded());
		System.out.println("생성된 비밀 키: " + secretKey);

		/* jwt 토큰 생성 */
		String jws = Jwts.builder().setSubject("{\"name\": \"dragon\"}").signWith(key).compact();
		System.out.println("생성된 JWT 토큰: " + jws);
		
		/* secretKey */
		if(verifyToken(jws, secretKey)) {
			System.out.println("토큰 인증 됨");
		}
	}
	
	/* https://www.baeldung.com/java-jwt-token-decode */
	private static boolean verifyToken(String accessToken, final String secretKey) {

		boolean validation = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken).getBody().getSubject().equals("{\"name\": \"dragon\"}");
		
		if (!validation) {
		    throw new RuntimeException("토큰 인증 되지 않음");
		}
		
		return true;
	}
}
