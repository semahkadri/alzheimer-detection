package com.alzheimer.user.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthReponseDTO {

    private String accessToken;
    private String refreshToken;

    @Builder.Default
    private String type = "Bearer";

    private UtilisateurDTO utilisateur;
}
