# ✅ Testing Checklist - EasyApplyMax

## 🔍 Vérification de cohérence (COMPLÈTE)

### Fichiers essentiels
- ✅ manifest.json - Présent et valide
- ✅ popup.html - Présent (13K)
- ✅ popup.css - Présent (20K)
- ✅ popup.js - Présent (14K)
- ✅ content-simple.js - Présent (54K)
- ✅ background.js - Présent (952B)

### Icônes
- ✅ icons/icon16.png - Présent (359B)
- ✅ icons/icon48.png - Présent (683B)
- ✅ icons/icon128.png - Présent (1.7K)

### Correspondance des IDs HTML ↔ JavaScript
- ✅ `firstName` ↔ `getElementById('firstName')`
- ✅ `lastName` ↔ `getElementById('lastName')`
- ✅ `email` ↔ `getElementById('email')`
- ✅ `phone` ↔ `getElementById('phone')`
- ✅ `phoneCountryCode` ↔ `getElementById('phoneCountryCode')`
- ✅ `city` ↔ `getElementById('city')`
- ✅ `yearsOfExperience` ↔ `getElementById('yearsOfExperience')`
- ✅ `maxYearsRequired` ↔ `getElementById('maxYearsRequired')`
- ✅ `blacklistKeywords` ↔ `getElementById('blacklistKeywords')`
- ✅ `maxApplications` ↔ `getElementById('maxApplications')`
- ✅ `autoNextPage` ↔ `getElementById('autoNextPage')`
- ✅ `start-btn` ↔ `getElementById('start-btn')`
- ✅ `stop-btn` ↔ `getElementById('stop-btn')`
- ✅ `export-csv-btn` ↔ `getElementById('export-csv-btn')`
- ✅ `reset-counters-btn` ↔ `getElementById('reset-counters-btn')`
- ✅ `clear-applied-jobs` ↔ `getElementById('clear-applied-jobs')`
- ✅ `autosave-indicator` ↔ `getElementById('autosave-indicator')`
- ✅ `applied-jobs-list` ↔ `getElementById('applied-jobs-list')`
- ✅ `applied-jobs-count` ↔ `getElementById('applied-jobs-count')`

### Communication Popup ↔ Content Script
- ✅ `action: 'start'` - popup.js (L131) → content-simple.js (L1324)
- ✅ `action: 'stop'` - popup.js (L152) → content-simple.js (L1349)
- ✅ `action: 'exportJobs'` - popup.js (L217) → content-simple.js (L1357)
- ✅ `action: 'resetCounters'` - popup.js (L257) → content-simple.js (L1360)
- ✅ `action: 'clearAppliedJobs'` - popup.js (L379) → content-simple.js (L1368)

---

## 🧪 Tests fonctionnels à effectuer

### 1. Installation et chargement
- [ ] Charger l'extension dans Chrome (`chrome://extensions/`)
- [ ] Vérifier que l'icône apparaît dans la toolbar
- [ ] Cliquer sur l'icône → Le popup s'ouvre
- [ ] Vérifier qu'il n'y a pas d'erreurs dans la console (F12)

### 2. Interface utilisateur
- [ ] Le header s'affiche avec gradient bleu
- [ ] Les 3 tabs sont visibles : Personal Info, Settings, Applied Jobs
- [ ] L'onglet actif est bien mis en évidence (gradient bleu)
- [ ] Les status cards affichent : Status, Applied (0), Skipped (0)
- [ ] Les boutons Start et Stop sont visibles
- [ ] Le bouton Stop est désactivé par défaut (grisé)

### 3. Auto-save (Personal Info)
- [ ] Taper dans "First Name" → Attendre 500ms
- [ ] Badge vert "Saved" apparaît en bas des tabs ✅
- [ ] Badge disparaît après 2 secondes
- [ ] Fermer et rouvrir le popup
- [ ] Vérifier que le prénom est toujours là (sauvegardé)
- [ ] Tester tous les champs : lastName, email, phone, city, yearsOfExperience
- [ ] Changer le country code → Sauvegarde immédiate

### 4. Onglet Settings
- [ ] Cliquer sur "Settings"
- [ ] L'onglet devient actif (gradient bleu)
- [ ] Contenu de Personal Info disparaît
- [ ] Contenu de Settings apparaît
- [ ] Taper dans "Blacklist Keywords" → Auto-save après 500ms
- [ ] Changer "Max Years Required" → Auto-save
- [ ] Changer "Max Applications" → Auto-save
- [ ] Toggle "Auto next page" → Sauvegarde immédiate

### 5. Onglet Applied Jobs
- [ ] Cliquer sur "Applied Jobs"
- [ ] L'onglet devient actif
- [ ] Message "No applications yet" s'affiche (si aucune application)
- [ ] Icône de briefcase visible
- [ ] Bouton "Clear All" visible

### 6. Démarrage du bot (sur LinkedIn)
- [ ] Aller sur LinkedIn Jobs : https://www.linkedin.com/jobs
- [ ] Activer le filtre "Easy Apply"
- [ ] Ouvrir l'extension
- [ ] Cliquer sur "Start"
- [ ] Bouton Start se désactive (grisé)
- [ ] Bouton Stop s'active (rouge)
- [ ] Status change de "Stopped" à "Running"
- [ ] Le bot commence à traiter des jobs
- [ ] Les compteurs Applied/Skipped augmentent

### 7. Logs et monitoring
- [ ] Ouvrir la console (F12)
- [ ] Vérifier les logs "[LinkedIn Bot]" apparaissent
- [ ] Logs indiquent les actions du bot
- [ ] Pas d'erreurs JavaScript critiques

### 8. Détection limite quotidienne
- [ ] Si LinkedIn affiche "You've reached today's Easy Apply limit"
- [ ] Le bot s'arrête automatiquement
- [ ] Status repasse à "Stopped"
- [ ] Message dans les logs : "🚫 DAILY LIMIT REACHED!"
- [ ] Statistiques affichées dans les logs

### 9. Applied Jobs list
- [ ] Après quelques applications
- [ ] Aller sur l'onglet "Applied Jobs"
- [ ] Liste des jobs appliqués s'affiche
- [ ] Chaque job affiche : Title, Company, Location (si dispo), Time ago
- [ ] Liens "View on LinkedIn" fonctionnent
- [ ] Compteur "(X)" correspond au nombre de jobs

### 10. Export CSV
- [ ] Cliquer sur "Export Applied Jobs (CSV)"
- [ ] Fichier CSV se télécharge
- [ ] Nom du fichier : `linkedin-applied-jobs-[date].csv`
- [ ] Ouvrir le CSV : colonnes Date, Job Title, Company, Link
- [ ] Données correctes et complètes

### 11. Reset Counters
- [ ] Cliquer sur "Reset Counters"
- [ ] Confirmation popup apparaît
- [ ] Accepter
- [ ] Compteurs Applied et Skipped repassent à 0
- [ ] Applied Jobs list est vidée
- [ ] Badge vert de confirmation apparaît

### 12. Clear Applied Jobs
- [ ] Dans l'onglet "Applied Jobs"
- [ ] Cliquer sur "Clear All"
- [ ] Confirmation popup apparaît
- [ ] Accepter
- [ ] Liste vidée
- [ ] Compteur repasse à "(0)"
- [ ] Message "No applications yet" réapparaît

### 13. Discord button
- [ ] Section "Join Our Community" visible
- [ ] Logo Discord affiché
- [ ] Texte explicatif présent
- [ ] Cliquer sur "Join Discord Community"
- [ ] S'ouvre dans un nouvel onglet : https://discord.gg/xWaCXBZbws

### 14. Instructions
- [ ] Section "How to use" en bas
- [ ] Cliquer pour dérouler
- [ ] 5 étapes affichées clairement
- [ ] Instructions compréhensibles

### 15. Arrêt du bot
- [ ] Pendant que le bot tourne
- [ ] Cliquer sur "Stop"
- [ ] Bot s'arrête immédiatement
- [ ] Status repasse à "Stopped"
- [ ] Bouton Start se réactive
- [ ] Bouton Stop se désactive

### 16. Persistance (page refresh)
- [ ] Démarrer le bot
- [ ] Rafraîchir la page LinkedIn (F5)
- [ ] Le bot continue automatiquement
- [ ] Compteurs conservés
- [ ] Logs indiquent "AUTO-RESTART"

### 17. Stuck detection
- [ ] Si le bot reste bloqué 2 minutes
- [ ] Message "SCRIPT STUCK DETECTED"
- [ ] Page rafraîchie automatiquement
- [ ] Bot reprend

### 18. Gestion des erreurs
- [ ] Si un job échoue
- [ ] Bot passe au suivant
- [ ] Compteur "Skipped" augmente
- [ ] Logs expliquent la raison

---

## 🐛 Bugs connus à surveiller

### Potentiels
- [ ] Auto-save peut déclencher plusieurs fois (vérifier debounce)
- [ ] Applied Jobs list peut être lente avec 100+ jobs
- [ ] CSV export avec caractères spéciaux (émojis, quotes)
- [ ] Popup peut se fermer si clic en dehors

### À tester spécifiquement
- [ ] Formulaires LinkedIn multilingues (FR, EN, DE, ES)
- [ ] Jobs avec questions personnalisées
- [ ] Jobs nécessitant upload de CV
- [ ] Jobs avec captcha

---

## 📊 Performance

### Métriques à observer
- [ ] Temps de chargement du popup : < 500ms
- [ ] Temps de sauvegarde auto : < 100ms
- [ ] Temps entre 2 applications : 2-5 secondes (délai humain)
- [ ] Mémoire utilisée : < 50MB

### Chrome DevTools
- [ ] Ouvrir DevTools (F12)
- [ ] Onglet Performance
- [ ] Enregistrer pendant 30 secondes
- [ ] Vérifier : pas de memory leaks
- [ ] Vérifier : CPU usage raisonnable

---

## 🔒 Sécurité & Confidentialité

- [ ] Données stockées uniquement en local (Chrome Storage)
- [ ] Aucune requête vers serveurs externes
- [ ] Permissions limitées à LinkedIn uniquement
- [ ] Pas de tracking/analytics
- [ ] Code open source

---

## ✅ Checklist finale avant release

- [ ] Tous les tests fonctionnels passent
- [ ] Aucune erreur dans la console
- [ ] Documentation à jour (README.md)
- [ ] CHANGELOG.md complet
- [ ] Version dans manifest.json correcte
- [ ] Screenshots ajoutés dans /screenshots/
- [ ] Discord link testé
- [ ] Icons générés et beaux
- [ ] Git commit clean
- [ ] Prêt pour GitHub push

---

## 📝 Notes pour les testeurs

### Scénario de test complet (15 min)

1. **Setup (2 min)**
   - Installer l'extension
   - Remplir les infos personnelles
   - Tester l'auto-save

2. **Application (5 min)**
   - Aller sur LinkedIn Jobs
   - Activer Easy Apply filter
   - Démarrer le bot
   - Laisser appliquer à 5-10 jobs

3. **Monitoring (3 min)**
   - Observer les logs
   - Vérifier les compteurs
   - Tester Stop/Start

4. **Applied Jobs (2 min)**
   - Voir la liste
   - Tester les liens
   - Export CSV

5. **Reset (1 min)**
   - Clear la liste
   - Reset les compteurs

6. **Feedback (2 min)**
   - Noter ce qui a bien fonctionné ✅
   - Noter ce qui a mal fonctionné ❌
   - Suggérer des améliorations 💡

---

<div align="center">

**Tout est prêt pour les tests ! 🚀**

Version: 1.0.0
Last updated: 2024-10-29

</div>
