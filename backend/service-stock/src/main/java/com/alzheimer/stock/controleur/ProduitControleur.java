package com.alzheimer.stock.controleur;

import com.alzheimer.stock.dto.ProduitDTO;
import com.alzheimer.stock.service.ProduitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProduitControleur {

    private final ProduitService produitService;

    @GetMapping
    public ResponseEntity<List<ProduitDTO>> listerTousLesProduits() {
        return ResponseEntity.ok(produitService.listerTousLesProduits());
    }

    @GetMapping("/categorie/{categorieId}")
    public ResponseEntity<List<ProduitDTO>> listerProduitsParCategorie(@PathVariable Long categorieId) {
        return ResponseEntity.ok(produitService.listerProduitsParCategorie(categorieId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProduitDTO> obtenirProduitParId(@PathVariable Long id) {
        return ResponseEntity.ok(produitService.obtenirProduitParId(id));
    }

    @PostMapping
    public ResponseEntity<ProduitDTO> creerProduit(@Valid @RequestBody ProduitDTO produitDTO) {
        ProduitDTO cree = produitService.creerProduit(produitDTO);
        return new ResponseEntity<>(cree, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProduitDTO> modifierProduit(@PathVariable Long id,
                                                       @Valid @RequestBody ProduitDTO produitDTO) {
        return ResponseEntity.ok(produitService.modifierProduit(id, produitDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerProduit(@PathVariable Long id) {
        produitService.supprimerProduit(id);
        return ResponseEntity.noContent().build();
    }
}
