# agambier.github.io

Site GitHub Pages de agambier.

- `fitpacer/` : app FitPacer (stable) et `fitpacer/dev/` (développement), copiées automatiquement par le
  déploiement du dépôt `fitpacer`. Ne pas modifier à la main.
- `apk/` : apps Android FitPacer et FitPacer DEV, copiées par le workflow « App Android » de `fitpacer`.
- `.well-known/assetlinks.json` : lien entre les apps Android et ce site (empreinte de la clé de signature).

Publication : GitHub Pages, branche `main`, dossier racine (`.nojekyll` : pas de traitement Jekyll).

Si une publication reste bloquée « en file d'attente » dans Actions, un nouveau commit sur `main` en relance une.
