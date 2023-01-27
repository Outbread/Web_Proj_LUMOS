package com.greedy.base64;

import java.security.Key;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

/*
 * JWT(JSON Web Token)의 구조
 * 1. 헤더(Header)
 * 	- typ: 토큰의 타입 지정(JWT)
 * 	- alg: 해싱 알고리즘으로 Signature에서 사용 됨
 * 
 * 2. 내용 또는 정보(Payload)
 * 	- 토큰에 담을 정보가 들어 있음
 *  - 담는 정보의 한 조각을 클레임(claim - name과 value의 쌍으로 구성)이라 칭함
 * 		a. 등록된 클레임(registered claim)
 * 		   : 토큰에 대한 정보가 담김
 *           (iss: 토큰 발급자(issuer)
 *            sub: 토큰 제목(subject)
 *            aud: 토큰 대상자(audience)
 *            exp: 토큰의 만료시간(expiration)
 *            nbf: 토큰 활성화(발급) 날짜(not before)
 *            iat: 토큰 활성화(발급) 시간(issued at))
 *      b. 공개 클레임(public claim)
 *      c. 비공개 클레임(private claim)
 * 3. 서명(Signature)
 * 	- Header 인코딩 값과 Payload 인코딩 값을 합쳐서 비밀키로 해쉬하여 생성 
 */

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
