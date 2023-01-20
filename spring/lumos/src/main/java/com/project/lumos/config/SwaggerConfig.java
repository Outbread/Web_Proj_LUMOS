package com.project.lumos.config;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(
<<<<<<< HEAD
		info = @Info(title = "메뉴 조회 및 주문 서비스 API 명세서",
					 description = "React부터 Spring Data Jpa까지 진행하는 서비스 API 명세서",
					 version="v1"
					)
				)
=======
		info = @Info(title = "쇼핑몰 서비스 API 명세서",
					description = "React부터 Spring Data Jpa까지 진행하는 서비스 API 명세서",
					version = "v1"))

>>>>>>> origin/master
@Configuration
public class SwaggerConfig {
	
	@Bean
	public GroupedOpenApi chatOpenApi() {
<<<<<<< HEAD
		String [] paths = {"/api/v1/**", "/auth/**"};		// Swagger에서 처리 되었으면 하는 경로 설정
		
		return GroupedOpenApi.builder()
							 .group("주문 서비스 API v1")
=======
		String [] paths = {"/api/v1/**", "/auth/**"};	// Swagger에서 처리 되었으면 하는 경로 설정
		
		return GroupedOpenApi.builder()
							 .group("쇼핑몰 API v1")
>>>>>>> origin/master
							 .pathsToMatch(paths)
							 .build();
	}
}
