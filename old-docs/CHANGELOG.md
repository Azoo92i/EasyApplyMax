# Changelog - LinkedIn Auto Apply

Toutes les modifications importantes de ce projet seront documentées dans ce fichier.

## [1.1.1] - 2025-10-03

### 🐛 Corrections Critiques

#### Fix: Détection des Offres LinkedIn
- **Problème:** "Aucune offre trouvée sur cette page" sur LinkedIn
- **Cause:** Sélecteurs CSS obsolètes (LinkedIn a changé sa structure)
- **Solution:** Ajout de 10 sélecteurs différents incluant les nouveaux (2024+)

#### Sélecteurs Ajoutés
```javascript
'ul.scaffold-layout__list-container li'     // LinkedIn 2024+
'li[data-occludable-job-id]'                // Nouveau attribut
'div.jobs-search-results-list ul li'
'ul.jobs-search-results__list li'
'ul[role="list"] > li'                      // Générique
```

#### Extraction d'ID Améliorée
- Méthode 1: Attribut `data-occludable-job-id` (nouveau LinkedIn)
- Méthode 2: Attribut `data-job-id`
- Méthode 3: URL avec `currentJobId=`
- Méthode 4: URL avec `/view/`

#### Détection Bouton Easy Apply
- 10 sélecteurs au lieu de 5
- Vérification du texte ET de l'aria-label
- Support multi-langues (Easy Apply, Postuler, etc.)
- Vérification de visibilité (`offsetParent !== null`)

### 🔧 Améliorations Techniques

#### Logs de Débogage
- Logs détaillés avec émojis (✅/❌)
- Messages d'aide contextuel
- Compte du nombre de sélecteurs essayés
- Suggestions quand aucune offre trouvée

#### Filtrage Intelligent
- Validation que l'élément est bien une offre
- Vérification de la présence d'un lien `/jobs/`
- Vérification des attributs `data-*`

### 📝 Documentation
- Ajout de `diagnostic.js` - Script de diagnostic
- Ajout de `GUIDE_DIAGNOSTIC.md` - Guide de dépannage complet
- Ajout de `FIX_DETECTION.md` - Explications du fix
- Ajout de `ACTIONS_A_FAIRE.txt` - Instructions rapides

### 📊 Statistiques
- Sélecteurs d'offres: 3 → 10 (+233%)
- Méthodes d'extraction ID: 1 → 4 (+300%)
- Sélecteurs Easy Apply: 5 → 10 (+100%)
- Taille content.js: 15KB → 18KB (+20%)
- Lignes de code: ~480 → 598 (+25%)

---

## [1.1.0] - 2025-10-03

### 🎉 Nouvelles Fonctionnalités

#### Système de Blacklist
- Ajout d'un système de filtrage par mots-clés
- Champ "Mots-clés blacklist" dans l'interface
- Ignore automatiquement les offres contenant les mots bannis
- Compteur "Jobs ignorés (blacklist)" dans l'interface
- Logs détaillés des offres ignorées

#### Enchaînement Automatique
- Option "Passer automatiquement à la page suivante"
- Parcourt automatiquement toutes les pages de résultats
- S'arrête à la dernière page ou à la limite de candidatures
- Navigation fluide entre les pages avec délais aléatoires

#### Limite de Candidatures
- Champ "Nombre maximum de candidatures" (1-100)
- Valeur par défaut: 50 (limite quotidienne LinkedIn)
- Arrêt automatique à la limite
- Logs d'information lors de l'arrêt

#### Options Supplémentaires
- Checkbox "Ignorer formulaires multi-étapes complexes"
- Meilleure organisation de l'interface
- Sections dédiées pour chaque type de configuration

### 🔧 Améliorations Techniques

#### content.js
- Nouvelle fonction `isJobBlacklisted()` pour vérifier la blacklist
- Logique de pagination automatique intégrée
- Vérification de limite de candidatures dans la boucle principale
- Compteur de jobs ignorés persistant
- Arrêt automatique intelligent

#### popup.js
- Gestion des nouveaux champs de configuration
- Sauvegarde/chargement de `blacklistKeywords`, `maxApplications`, etc.
- Mise à jour du compteur de jobs ignorés
- Listener pour `updateSkippedCount`

#### background.js
- Ajout de `skippedCount` dans le storage local
- Nouveau message `incrementSkippedCount`
- Initialisation des nouveaux compteurs

#### Interface (popup.html)
- Section "Options d'automatisation" ajoutée
- Champ blacklist avec helper text
- Affichage du compteur de jobs ignorés
- Meilleure organisation visuelle

### 📝 Documentation
- Ajout de `NOUVELLES_FONCTIONNALITES.md`
- Ajout de `VERSION_1.1.0_RESUME.md`
- Ajout de `START_HERE.md`
- Ajout de `CHANGELOG.md`
- Mise à jour de `test.html` avec tests blacklist
- Mise à jour de `QUICK_START.md`

### 🐛 Corrections
- Meilleure gestion de l'arrêt automatique
- Logs plus clairs et informatifs
- Gestion d'erreurs améliorée

---

## [1.0.0] - 2025-10-03

### 🎉 Version Initiale

#### Fonctionnalités Principales
- Automatisation des candidatures LinkedIn Easy Apply
- Remplissage automatique des formulaires
- Simulation de comportement humain (délais aléatoires)
- Interface utilisateur complète (popup)
- Système de logs en temps réel
- Sauvegarde de configuration

#### Formulaire
- Gestion des informations personnelles (nom, email, téléphone)
- Gestion de l'expérience et du salaire
- Gestion de la localisation
- Support des champs texte, email, téléphone, nombre
- Support des dropdowns/select

#### Automatisation
- Détection des boutons "Easy Apply"
- Remplissage multi-étapes des formulaires
- Gestion des erreurs et retry
- Scroll automatique vers les éléments
- Multiples méthodes de clic (standard, JavaScript, ActionChains)

#### Interface
- Popup avec configuration complète
- Statut en temps réel
- Compteur de candidatures
- Container de logs avec historique
- Design responsive et moderne
- Icônes personnalisées

#### Tests
- Page de test `test.html` avec formulaires simulés
- Cartes de jobs de test
- Modale de candidature simulée
- Instructions de test détaillées

#### Documentation
- `README.md` - Documentation technique complète
- `GUIDE_INSTALLATION.md` - Guide d'installation et tests
- `QUICK_START.md` - Démarrage rapide
- `LISEZMOI.txt` - Instructions en français

#### Sécurité
- Permissions limitées (storage, activeTab, scripting)
- Exécution uniquement sur linkedin.com
- Données stockées localement
- Code transparent et auditable

---

## Prochaines Versions Planifiées

### [1.2.0] - À venir
- [ ] Export CSV des candidatures
- [ ] Statistiques détaillées par jour
- [ ] Filtres avancés (salaire min/max, télétravail)
- [ ] Support multi-langues (EN, FR, ES, DE)
- [ ] Mode "pause et reprendre"

### [1.3.0] - À venir
- [ ] Intégration API IA pour réponses personnalisées
- [ ] Génération automatique de lettres de motivation
- [ ] Dashboard de statistiques avancées
- [ ] Synchronisation cloud (optionnelle)

---

## Format du Changelog

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

### Types de Changements
- `Ajouté` pour les nouvelles fonctionnalités
- `Modifié` pour les changements aux fonctionnalités existantes
- `Déprécié` pour les fonctionnalités bientôt supprimées
- `Supprimé` pour les fonctionnalités supprimées
- `Corrigé` pour les corrections de bugs
- `Sécurité` pour les vulnérabilités

---

**Merci d'utiliser LinkedIn Auto Apply! 🚀**
