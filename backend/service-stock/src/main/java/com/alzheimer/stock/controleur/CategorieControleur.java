package com.alzheimer.stock.controleur;

import com.alzheimer.stock.dto.CategorieDTO;
import com.alzheimer.stock.service.CategorieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CategorieControleur {

    private final CategorieService categorieService;

    @GetMapping
    public ResponseEntity<List<CategorieDTO>> listerToutesLesCategories() {
        return ResponseEntity.ok(categorieService.listerToutesLesCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategorieDTO> obtenirCategorieParId(@PathVariable Long id) {
        return ResponseEntity.ok(categorieService.obtenirCategorieParId(id));
    }

    @PostMapping
    public ResponseEntity<CategorieDTO> creerCategorie(@Valid @RequestBody CategorieDTO categorieDTO) {
        CategorieDTO creee = categorieService.creerCategorie(categorieDTO);
        return new ResponseEntity<>(creee, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategorieDTO> modifierCategorie(@PathVariable Long id,
                                                           @Valid @RequestBody CategorieDTO categorieDTO) {
        return ResponseEntity.ok(categorieService.modifierCategorie(id, categorieDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerCategorie(@PathVariable Long id) {
        categorieService.supprimerCategorie(id);
        return ResponseEntity.noContent().build();
    }
}
