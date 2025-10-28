# Guide d'installation et de test - LinkedIn Auto Apply

## 📋 Prérequis

- Google Chrome (ou navigateur basé sur Chromium)
- Compte LinkedIn actif
- Windows, macOS ou Linux

## 📦 Installation de l'extension

### Étape 1: Vérifier les fichiers

Assurez-vous que le dossier `C:\ExtensionAutojob` contient tous ces fichiers:

```
✅ manifest.json
✅ popup.html
✅ popup.css
✅ popup.js
✅ content.js
✅ background.js
✅ README.md
✅ test/test.html
✅ icons/create_icons.md
```

### Étape 2: Charger l'extension dans Chrome

1. **Ouvrez Chrome** et tapez dans la barre d'adresse:
   ```
   chrome://extensions/
   ```

2. **Activez le mode développeur**
   - En haut à droite de la page, activez le bouton "Mode développeur"

3. **Chargez l'extension**
   - Cliquez sur "Charger l'extension non empaquetée"
   - Naviguez vers `C:\ExtensionAutojob`
   - Sélectionnez le dossier et cliquez sur "Sélectionner le dossier"

4. **Vérification**
   - L'extension "LinkedIn Auto Apply" devrait apparaître dans la liste
   - Une icône devrait apparaître dans votre barre d'outils Chrome
   - Si vous ne voyez pas l'icône, cliquez sur l'icône puzzle 🧩 et épinglez l'extension

### Étape 3: Configuration initiale

1. **Cliquez sur l'icône de l'extension** dans la barre d'outils

2. **Remplissez vos informations personnelles**:
   ```
   Prénom: Théo
   Nom: Antonelli
   Email: votre.email@example.com
   Téléphone: 0643135640
   Ville: Annecy, France
   Pays: France
   ```

3. **Configurez vos paramètres de recherche**:
   ```
   Années d'expérience: 3
   Salaire souhaité: 50000
   Période de préavis: 30
   Mots-clés: développeur, ingénieur
   Localisation: France
   ```

4. **Cliquez sur "Sauvegarder la configuration"**

## 🧪 Tests de l'extension

### Test 1: Page de test locale

1. **Ouvrez le fichier de test**:
   - Naviguez vers `C:\ExtensionAutojob\test\test.html`
   - Double-cliquez pour ouvrir dans Chrome
   - OU tapez dans la barre d'adresse: `file:///C:/ExtensionAutojob/test/test.html`

2. **Test du remplissage automatique**:
   - Ouvrez l'extension (cliquez sur l'icône)
   - Vérifiez que votre configuration est sauvegardée
   - Cliquez sur "Démarrer"
   - Observez si les formulaires de test se remplissent automatiquement

3. **Vérification**:
   - Les champs doivent se remplir avec vos informations
   - Les logs doivent s'afficher dans le popup de l'extension
   - Cliquez sur "Vérifier le remplissage" pour voir le score

### Test 2: Test sur LinkedIn (Simulation)

**⚠️ ATTENTION**: Pour ce test, l'extension va observer LinkedIn mais ne soumettra PAS de vraies candidatures.

1. **Connexion à LinkedIn**:
   ```
   https://www.linkedin.com/login
   ```
   - Connectez-vous avec vos identifiants LinkedIn

2. **Recherchez des offres d'emploi**:
   ```
   https://www.linkedin.com/jobs/
   ```
   - Tapez un mot-clé (ex: "développeur")
   - Sélectionnez une localisation
   - **IMPORTANT**: Activez le filtre "Easy Apply"

3. **Test de détection**:
   - Ouvrez la console Chrome (F12)
   - Ouvrez l'extension
   - Cliquez sur "Démarrer"
   - Observez les logs dans la console et le popup

4. **Arrêtez rapidement**:
   - Cliquez sur "Arrêter" après 10-15 secondes
   - Vérifiez les logs pour voir ce qui a été détecté

### Test 3: Vérification des fonctionnalités

Cochez chaque fonctionnalité testée:

- [ ] L'extension apparaît dans Chrome
- [ ] Le popup s'ouvre correctement
- [ ] La configuration se sauvegarde
- [ ] Les logs s'affichent
- [ ] Le content script se charge (vérifiez dans la console)
- [ ] Les boutons Easy Apply sont détectés
- [ ] Les formulaires peuvent être remplis
- [ ] Le bouton Arrêter fonctionne
- [ ] Le compteur de candidatures s'affiche

## 🔧 Débogage

### Problème: L'extension ne s'affiche pas

**Solution**:
1. Vérifiez que le mode développeur est activé
2. Rechargez l'extension dans `chrome://extensions/`
3. Vérifiez qu'il n'y a pas d'erreurs dans `chrome://extensions/`

### Problème: Le popup ne s'ouvre pas

**Solution**:
1. Faites un clic droit sur l'icône → "Inspecter le popup"
2. Vérifiez les erreurs dans la console
3. Rechargez l'extension

### Problème: Le content script ne fonctionne pas

**Solution**:
1. Ouvrez LinkedIn
2. Appuyez sur F12 pour ouvrir la console
3. Cherchez le message: `[LinkedIn Auto Apply] Content script chargé et prêt`
4. Si absent, rechargez la page LinkedIn

### Problème: Les formulaires ne se remplissent pas

**Solution**:
1. Vérifiez que la configuration est complète
2. Vérifiez les logs dans la console
3. Les sélecteurs LinkedIn peuvent avoir changé
4. Testez d'abord avec `test.html`

## 📊 Console de débogage

Pour voir tous les logs détaillés:

1. Ouvrez Chrome sur LinkedIn
2. Appuyez sur `F12` ou `Ctrl+Shift+I`
3. Allez dans l'onglet "Console"
4. Démarrez l'extension
5. Tous les logs commenceront par `[LinkedIn Auto Apply]`

### Logs attendus:

```
[LinkedIn Auto Apply] Content script chargé et prêt
[LinkedIn Auto Apply] Automatisation démarrée
[LinkedIn Auto Apply] Démarrage de la boucle principale
[LinkedIn Auto Apply] Bouton Easy Apply cliqué
[LinkedIn Auto Apply] Candidature soumise avec succès! Total: 1
```

## ⚠️ Avertissements importants

### Avant utilisation réelle:

1. **Testez d'abord avec test.html** pour vérifier que tout fonctionne
2. **LinkedIn peut détecter l'automatisation** - utilisez avec modération
3. **Ne lancez pas l'extension sur des centaines d'offres** - commencez petit
4. **Vérifiez vos candidatures** après pour vous assurer qu'elles sont correctes
5. **Respectez les limites LinkedIn** - max 50 candidatures Easy Apply par jour

### Recommandations:

- ✅ Testez sur 2-3 offres au début
- ✅ Vérifiez que vos informations sont correctes
- ✅ Surveillez les logs pour détecter les erreurs
- ✅ Arrêtez immédiatement si quelque chose ne va pas
- ✅ Utilisez pendant les heures de travail normales

## 🎯 Checklist de test complète

### Phase 1: Installation
- [ ] Extension installée dans Chrome
- [ ] Aucune erreur dans chrome://extensions/
- [ ] Icône visible dans la barre d'outils

### Phase 2: Configuration
- [ ] Popup s'ouvre correctement
- [ ] Tous les champs se remplissent
- [ ] Configuration se sauvegarde
- [ ] Configuration persiste après fermeture

### Phase 3: Test local
- [ ] test.html s'ouvre correctement
- [ ] Content script détecté dans console
- [ ] Formulaires se remplissent automatiquement
- [ ] Boutons fonctionnent
- [ ] Logs s'affichent

### Phase 4: Test LinkedIn (observation)
- [ ] Content script se charge sur LinkedIn
- [ ] Boutons Easy Apply détectés
- [ ] Extension démarre sans erreur
- [ ] Extension s'arrête correctement
- [ ] Logs cohérents dans console

### Phase 5: Test réel (optionnel)
- [ ] Choisir 1 seule offre test
- [ ] Lancer l'extension
- [ ] Vérifier le remplissage en temps réel
- [ ] Arrêter avant soumission
- [ ] Vérifier que les données sont correctes

## 📝 Rapport de test

Après vos tests, notez:

```
Date du test: _____________
Version Chrome: _____________

Tests réussis:
- [ ] Installation
- [ ] Configuration
- [ ] Test local
- [ ] Test LinkedIn

Problèmes rencontrés:
_________________________________
_________________________________

Notes:
_________________________________
_________________________________
```

## 🆘 Support

Si vous rencontrez des problèmes:

1. Consultez la section Débogage ci-dessus
2. Vérifiez la console Chrome (F12)
3. Relisez le README.md
4. Rechargez l'extension
5. Redémarrez Chrome

## ✅ Prochaines étapes

Une fois tous les tests réussis:

1. Créez des icônes personnalisées (voir `icons/create_icons.md`)
2. Ajustez les délais dans `content.js` si nécessaire
3. Utilisez l'extension prudemment sur LinkedIn
4. Surveillez vos candidatures

**Bonne chance avec votre recherche d'emploi! 🚀**
