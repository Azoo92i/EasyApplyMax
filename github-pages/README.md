# 📄 GitHub Pages - Privacy Policy

Ce dossier contient la Privacy Policy hébergée sur **GitHub Pages**.

## 🌐 URL Finale

Une fois GitHub Pages activé, votre Privacy Policy sera accessible à :
```
https://YOUR-USERNAME.github.io/EasyApplyMax/privacy-policy.html
```

Cette URL sera utilisée dans votre soumission Chrome Web Store.

---

## 🚀 Comment Activer GitHub Pages ?

### Étape 1 : Pousser sur GitHub

```bash
# Assurez-vous que le dossier github-pages/ est commité
git add github-pages/
git commit -m "Add privacy policy for GitHub Pages"
git push origin main
```

### Étape 2 : Activer GitHub Pages

1. Allez sur votre repository GitHub : `https://github.com/YOUR-USERNAME/EasyApplyMax`
2. Cliquez sur **Settings** (⚙️)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Dans **Source**, sélectionnez :
   - **Branch :** `main`
   - **Folder :** `/docs`
5. Cliquez sur **Save**

### Étape 3 : Attendez le Déploiement

- GitHub va construire et déployer votre site (1-2 minutes)
- Une notification apparaîtra : "Your site is published at https://..."
- Cliquez sur le lien pour vérifier

### Étape 4 : Testez l'URL

Visitez : `https://YOUR-USERNAME.github.io/EasyApplyMax/privacy-policy.html`

✅ Si la page s'affiche correctement, c'est prêt !

---

## 📋 Fichiers dans ce Dossier

```
github-pages/
├── index.html              - Redirige vers privacy-policy.html
├── privacy-policy.html     - Privacy Policy complète (HTML)
└── README.md               - Ce fichier
```

---

## 🔗 Utilisation dans Chrome Web Store

Lorsque vous soumettez l'extension sur le Chrome Web Store, utilisez cette URL :

**Privacy Policy URL :**
```
https://YOUR-USERNAME.github.io/EasyApplyMax/privacy-policy.html
```

Remplacez `YOUR-USERNAME` par votre nom d'utilisateur GitHub réel.

---

## 🎨 Personnalisation (Optionnelle)

### Modifier les Liens

Dans `privacy-policy.html`, remplacez :

```html
<!-- Ligne ~569 -->
<a href="https://github.com/YOUR-USERNAME/EasyApplyMax/issues" target="_blank">GitHub Issues</a>

<!-- Ligne ~594 -->
<a href="https://github.com/YOUR-USERNAME/EasyApplyMax" target="_blank">GitHub</a>
```

Par votre vrai repository URL.

### Modifier le Design

Vous pouvez personnaliser les couleurs dans la section `<style>` de `privacy-policy.html` :

```css
/* Couleur principale (bleu LinkedIn) */
background: linear-gradient(135deg, #0a66c2 0%, #378fe9 100%);

/* Couleur du gradient de fond */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

---

## ✅ Vérification

Avant de soumettre au Chrome Web Store :

- [ ] GitHub Pages activé dans Settings
- [ ] Privacy Policy accessible publiquement
- [ ] Tous les liens fonctionnent
- [ ] Page responsive (testez sur mobile)
- [ ] Aucune information sensible visible
- [ ] URL copiée pour le Chrome Web Store

---

## 🔄 Mises à Jour

Pour mettre à jour la Privacy Policy :

1. Modifiez `privacy-policy.html`
2. Mettez à jour la date "Last Updated"
3. Commit et push :
   ```bash
   git add github-pages/privacy-policy.html
   git commit -m "Update privacy policy"
   git push origin main
   ```
4. GitHub Pages se met à jour automatiquement (1-2 minutes)

---

## 📞 Support

Si GitHub Pages ne fonctionne pas :

1. Vérifiez que le dossier `github-pages/` est bien dans la branche `main`
2. Vérifiez Settings > Pages > Source = `main` + `/docs`
3. Attendez 2-3 minutes après activation
4. Consultez la documentation : https://docs.github.com/pages

---

## 🎉 C'est Tout !

Votre Privacy Policy est maintenant hébergée professionnellement sur GitHub Pages, gratuitement ! 🚀

**URL finale :** `https://YOUR-USERNAME.github.io/EasyApplyMax/privacy-policy.html`

Utilisez cette URL dans votre soumission Chrome Web Store.
