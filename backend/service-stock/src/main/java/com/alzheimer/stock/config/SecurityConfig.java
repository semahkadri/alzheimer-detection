package com.alzheimer.stock.config;

import com.alzheimer.stock.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                // Public — auth endpoints
                .requestMatchers("/api/auth/**").permitAll()
                // Public — OpenAPI / Swagger
                .requestMatchers("/api/v3/api-docs/**", "/api/swagger-ui/**", "/api/swagger-ui.html").permitAll()
                // Public — Actuator
                .requestMatchers("/actuator/**").permitAll()
                // Admin only — user management
                .requestMatchers(HttpMethod.GET, "/api/utilisateurs").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/utilisateurs/stats").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/utilisateurs/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/utilisateurs").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/utilisateurs/*/role").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/utilisateurs/*/activer").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/utilisateurs/*").hasRole("ADMIN")
                // Authenticated — own profile
                .requestMatchers("/api/utilisateurs/me", "/api/utilisateurs/me/**").authenticated()
                // Everything else is PUBLIC (products, categories, cart, orders, etc.)
                .anyRequest().permitAll()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
