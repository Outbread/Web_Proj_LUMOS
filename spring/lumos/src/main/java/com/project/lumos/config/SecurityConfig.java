package com.project.lumos.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.project.lumos.jwt.JwtAccessDeniedHandler;
import com.project.lumos.jwt.JwtAuthenticationEntryPoint;
import com.project.lumos.jwt.TokenProvider;

@EnableWebSecurity
public class SecurityConfig {
   
   private final TokenProvider tokenProvider;
   private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
   private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
   
   @Autowired
   public SecurityConfig(TokenProvider tokenProvider, 
		   				 JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
		   				 JwtAccessDeniedHandler jwtAccessDeniedHandler) {
      this.tokenProvider = tokenProvider;
      this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
      this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
   }
   
   /* 1. 암호화 처리를 위한 PasswordEncoder*/
   @Bean
   public BCryptPasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
   }
   /* 2. 시큐리티 설정을 무시 할 정적 리소스 등록 */
   @Bean
   public WebSecurityCustomizer webSecurityCustomizer() {
      return (web) -> web.ignoring().antMatchers("/css/**", "/js/**", "/images/**",
                                               "/lib/**", "/productimgs/**");
   }
   
   /* 3. HTTP요청에 대한 권한별 설정 */
   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      http.csrf().disable()
         .exceptionHandling()
         .authenticationEntryPoint(jwtAuthenticationEntryPoint)
         .accessDeniedHandler(jwtAccessDeniedHandler)
          .and()
          .authorizeRequests()
             .antMatchers("/").authenticated()
             .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()   
             .antMatchers("/auth/**").permitAll()
             .antMatchers("/api/v1/products/**").permitAll() 
             .antMatchers("/api/v1/revies/**").permitAll()
             .antMatchers("/api/v1/company-management/**").hasRole("ADMIN")
             .antMatchers("/api/v1/shop-management/**").hasRole("ADMIN")
             .antMatchers("/api/v1/question-management/**").hasRole("ADMIN")
             .antMatchers("/api/v1/order-management/**").hasRole("ADMIN")
             .antMatchers("/api/v1/order-dashboard/**").hasRole("ADMIN")
             .antMatchers("/api/v1/cart/**").hasRole("USER")
             .antMatchers("/api/v1/mypage-order/**").hasRole("USER")
             .antMatchers("/api/v1/profileUpdate/**").permitAll() 
          .and()
             .sessionManagement()
             .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
          .and()
             .cors()
          .and()
          
             /* jwt 토큰 방식을 쓰겠다는 설정 */
             .apply(new JwtSecurityConfig(tokenProvider));
      
      return http.build();
   }
   
   /* 4. CORS 설정용 Bean(허용 할 origin과 httpMethod 종류와 header 값) */
   //origin이 달라도 사용가능하도록 만들어주기위해 설정한다.
   @Bean
   CorsConfigurationSource corsConfigurationSource() {
      CorsConfiguration configuration = new CorsConfiguration();
      
      configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
      configuration.setAllowedMethods(Arrays.asList("GET", "PUT", "POST", "DELETE"));
      configuration.setAllowedHeaders(Arrays.asList("Access-Control-Allow-Origin", "Content-type"
                                       , "Access-Control-Allow-Headers", "Authorization"
                                       , "X-Requested-With"));
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", configuration);
      return source;
   }
}