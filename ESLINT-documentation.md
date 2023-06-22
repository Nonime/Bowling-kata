# ESLint

### Installation de l'outil

L'utilité d'un Linter tel qu'ESLint vient de la praticité de se faire soumettre nos erreurs de code en amont, ce afin d'éviter des problèmes récurrent lors du développement. Les problèmes qu'il peut gérer sont par exemple les soucis de syntaxe, les erreurs de construction de nos blocs d'instruction ansi que des problèmes stylistiques. Que l'on soit en train de faire du front-end ou du back-end, le principe du linter peut s'appliquer. ESLint est le linter le plus populaire pour le Javascript, en grande partie venant du fait qu'il soit hautement configurable. En plus de nous soumettre nos problèmes, il est possible, lors de l'appel à ESLint via les lignes de commandes, de lui demander de tenter de résoudre nos erreurs automatiquement. 

La méthode de fonctionnement d'ESLint passe par l'utilisation de Espree pour le parsing du code Javascript ainsi que du principe de l'AST (Abstract Syntax Tree). Les patterns dans le code seront évalués et l'ensemble de nos règles de paramétrage seront ensuite appliquées, chacune d'entre elles agissant comme une sorte de plugin. 

Pour installer ESLint, il nous faut tout d'abord avoir Node.js d'installé sur notre machine. Pour la suite, il y a deux façon d'ajouter ESLint, globalement ou localement. Dans les deux cas, cette étape passera par l'utilisation d'une ligne de commande:

```bash
# Pour installer globalement
npm install eslint -g

# Pour installer localement
npm install eslint --save-dev
```

Pour pouvoir ajouter ESlint à notre projet, il est également possible de réaliser la simple ligne de commande ci-dessous: 

```bash
npm init @eslint/config
```

Une série de question va ensuite nous être posé, et la réponse à ces dernières va provoquer ensuite la création d'un fichier de condif. Si l'on a choisi de la formeter en JSON, alors on aura potentiellement ce genre de résultat:

```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
}
```

* La première section, `env`, nous informe sur le type d'environnement sur lequel notre Javascriot va être exécuté. 
* `parserOptions` va nous permettre de par exemple informer ESLint que nous allons utiliser un système de fichiers compatibles avec le navigateur et qu'ainsi les mots-clés `import` et `export` peuvent être utilisés.
* `extends` sert au linter à savoir qu'il prend une base de règles avant d'y ajouter les notres. Ici, il s'agit des règles de base du Javascript qui seront étendues par notre configuration personnelle.
* `rules` sert quant à elle a répertorier les différentes règles que l'on veut se voir être appliquées dans notre linter. Dans les règles, leur définition passe par un Array dont la première valeur est la façon dont ESLint va nous informer que la règle n'est pas respectée (un warning, une erreur ou rien du tout).

Dans le cas d'une installation globale d'ESLint, il est possible d'utiliser la commande `eslint --fix` pour que le linter tente de lui même de réparer les erreurs. Certaines, comme par exemple une variable en trop, ne seront cependant pas modifiées et il nous faudra manuellement modifier notre code. Si notre installation est locale, il nous suffit d'ajouter la commande dans notre liste des scripts du fichier `package.json` puis d'entrer la commande d'exécution de script adéquate. 

---

### Nos propres règles

Si l'on le veut, il est possible d'utiliser ESLint pour apporter à toute une équipe une même façon de coder dans des projets d'entreprise. Pour cela, il est par exemple, via les règles vues précédemment, possible de:

* `indent` : Définir le style d'indentation ainsi que la taille de ce dernier (par exemple 4 espaces)
* `linebreak-style`; Définir le type de retour chariot (Windows utilise le WRLF et les systèmes Unix le LF)
* `quotes`; Si l'on veut utiliser des simples ou des doubles guillemets
* `semi`; Veut-on forcer les développeurs à utiliser le caractère `;` en fin d'instruction ?

A ces règles peuvent également s'en ajouter d'autres, dont la liste complète est disponible à [cette adresse](https://eslint.org/docs/latest/rules/). Par exemple, si l'on veut que les imports de packages soient limités à certains, on peut ajouter la règle `no-rectricted-imports` en ajoutant la liste des packages à interdire dans le tableau des paramètres. 

---

### AST

L'Abstract Syntax Tree est un objet Javascript decrivant notre code. Il y a plusieurs outils qui en font usage, comme les Webpack, les linters, les minifiers, la coloration syntaxique, etc... Si l'on utilise ESLint, il va se servir de ESpree pour convertire le code javascript en une version compatible avec AST. cette version transformé sera une sorte d'arbre à multiples embranchement, chaque brance pouvant être une ligne d'instruction et les différents éléments présents dans la ligne (un appel de fonction, ses paramètres, les objets, leurs méthodes, etc...) se verront traités comme des idéntifiants, des paramètres ou autre.

> En allant sur le site web [AST Explorer](https://astexplorer.net), il est possible de voir la construction en tant réel de notre arbre en fonction du parser utilisé.

Une fois transformé de la sorte, ESLint va pouvoir parcourir les différents éléments pour pouvoir corriger les problèmes éventuels. En ayant une connaissance du fonctionnement de l'AST, il nous est possible de rédiger nos propres règles compatibles avec ESLint. Pour créer une règle, il va nous falloir rédiger du code Javascript en suivant un format particulier. Notre règle se trouvera dans le return de la méthode `create()`, qui devra, sous la forme d'un objet possédant une méthode portant le nom du type d'élément AST à tester, gérer un objet de context obtenu en paramètre. Une fois géré, cet objet de context peut, via sa méthode `.report()`, informer ESLint qu'un soucis s'est produit et offrir en complément un message d'information. Par exemple, la règle suivante informera de la dépréciation d'une fonction utilise le contexte pour créer une règle ESLint concernant les appel d'une fonction dans le but d'informer de sa dépréciation: 

```js
module.exports = {
    create(context) {
        return {
            CallExpression(node) {
                if (node.callee.name === "getPayments") {
                    context.report({
                        node: node,
                        message: "getPayments is deprecated, use getLatestPayments"
                    });
                }
            }
        };
    }
};
```

Pour que la règle se voit ensuite être appliquée, il nous faudra l'ajouter à la liste des règles disponibles dans le fichier de configuration d'ESLinter et de lancer son exécution via l'option `--rulesdir` avec en paramètre le chemin vers le dossier contenant nos règles maison.

Lorsque l'on modifiait des règles de bases d'ESLint, on a remarqué qu'il était possible de passer, en plus du niveau de correction de la règle, des paramètres via les autres valeurs d'un tableau de chaines de caractères. Pour faire de même dans le cadre de nos règles personalisées, il va nous falloir utiliser par exemple `context.options`. Ainsi, pour créer une règle qui aurait pour effet d'empêcher l'ajout de commentaires dans notre code contenant des mots-clés spécifiques, on pourrait utiliser la règle suivante: 

```js
module.exports = {
    create(context) {

        function findComments(comment) {
            if (context.options.indexOf(comment.value.trim().toLowerCase()) >= 0) {
                context.report(comment, `${comment.value} is not allowed in comments`);
            }
        }

        return {
            Program(node) {
                var sourceCode = context.getSourceCode();
                var comments = sourceCode.getAllComments();
                for (const comment of comments) {
                    findComments(comment)
                }
            }
        }
    }
}
```
---

### Résoudre automatiquement les problèmes

Dans le cas où l'on défini nos propres règles de fonctionnement pour ESLint, il est également possible et intéressant de permettre l'utilisation de l'option `--fix` en complément de `--rulesdir`. Pour ce faire, il nous faut ajouter la propriété `fix` à l'objet mit en paramètre de `context.report()` de la sorte:

```js
context.report({
    node: node,
    message: "getPayments is deprecated, use getLatestPayments",
    fix: function(fixer) {
        return fixer.replaceText(node.callee, "getLastestPayments");
    }
});
```

Cette propriété va ainsi prendre en valeur une fonction faisant intervenir un objet, le `fixer`. Cet objet possède plusieurs méthodes telles que `replaceText()` pour ensuite, via un retour, permettre la modification des éléments dans notre code Javascript directement en fonction de l'erreur. Ici, on remplacera par exemple le texte `getPayments` par `getLatestPayments` dans le but d'éviter l'utilisation de fonction dépréciées.

---

### Partager notre config'

Dans le cas où l'on voudrait désormais partager avec des tierces personnes notre ensemble de règles et la configuration d'ESLint, il va nous falloir pour cela créer soit une configuration partageable, soit un plugin. Dans le premier cas, il s'agit de partager un objet de configuration qui se trouverait par exemple dans notre fichier `eslintrc.json`. Dans le second cas, il s'agit de créer un fichier de plugin, ce fichier se trouvant être l'ensemble des règles que l'on peut importer et utiliser. 

ESLint recommande de son côté l'utilisation des fichiers de config', avec dans l'ordre le chargement des règles de base puis l'override de certaines par nos propres règles. Pour les plugins, il s'agit au final d'ajouter dans l'objet de configuration la propriété `plugins` alimentée par un tableau des noms de plugins que l'on veut ajouter

Pour les conventions de nommage, on a:
* Pour les fichiers de configuration: `eslint-config-*`
* Pour les plugins: `eslint-plugin-*`

---

### Importer un plugin ESLint

Ainsi, dans le cas où l'on veut utiliser le plugin spécifique sur les promesses, il suffit de l'installer via la commande `npm i -D eslint-plugin-promise` puis de modifier le fichier de configuration de sorte à ce qu'il contienne: 

```json
{
    "plugins": ["promise"],
    "rules": {
        "promise/catch-or-return": "error"
    }
}
```

---

### Ajouter un fichier de configuration externe

Si l'on veut maintenant importer une configuration venant d'un exterieur, alors il est possible de l'installer dans un premier temps avec npm. Par exemple, pour ajouter le fichier de configuration d'AirBNB, il est possible d'utiliser `npx install-peerdeps --dev eslint-config-airbnb-base` puis de modifier notre propre fichier de config de sorte à ce qu'il comprenne:

```json
{
    "extends": "airbnb-base"
}
```

---

### Créer un plugin exportable

Pour créer un plugin exportable, il va nous falloir utiliser Yeoman. Pour l'installer, vous pouvez utiliser la ligne `npm i -g yo` suivit de `npm i -g generator-eslint`. 

Une fois installé, il nous est possibl de créer un plugin vierge via `yo eslint:plugin`. Dans le cas où l'on souhaite faire uniquement une règle, il est possible de le faire via `yo eslint:rule`. 

Enfin, une fois le plugin rempli, on peut créer localement un lien symbolique via la commande `npm link` pour par la suite le lier dans un autre projet via `npm link nom-du-plugin`.

Les règles devront être ajoutées à un autre projet via la syntaxe suivante:

```json
{
    "extends": "nom-du-plugin",
    "rules": {
        "nom-du-plugin/nom-regle": "error"
    }
}
```

Si l'on veut offrir à notre plugin la possibilité d'être utilisé via de multiples configurations, il va nous falloir, dans le fichier `index.js`, avoir un export du type: 

```js
module.exports.configs = {
    configA: {
        rules: {
            // Nos règles de base
        }
    },
    configB: {
        rules: {
            // Nos autres règles
        }
    }
}
```

L'import de la config souhaitée dans le projet passera par l'extension via la syntaxe suivante:

```json
{
    "extends": ["plugin:nom-plugin/nom-config"] 
}
```

---

### Linter à la fois le code serveur et le code client

Si, dans notre dossier de projet, nous avons au final deux projets distincts, l'un en Javascript Serveur et l'autre en Javascript Client, alors il va nous falloir gérer ESLint différemment. En effet, au cas où nous n'aurions qu'une seule configuration pour ce dernier, seulement une partie de notre projet va être correcte du point de vue d'ESLint (les applications clients et serveur en Javascript n'ont pas la même syntaxe ni le même fonctionnement vis à vis des modules).

Pour cela, il va nous falloir fixer des contraintes à ESLint pour lui indiquer qu'une hierarchie de fichier devra être concernée par un ensemble de règles et une autre hierarchie par un autre ensemble de règles. 

Pour réaliser cela, il suffit de créer d'autres fichier `eslintrc.json` dans les dossiers concernés. Ces dossier contiendront les spécificités du dossier où se trouve le fichier.

Par la suite, si l'on veut, on peut également ajouter des options de lancement pour le fichier node `package.json`. Par exemple, on peut demander l'execution de `npm lint:front` qui sera relié à `eslint dossier-front`

---

### Utiliser ESLint dans un projet de type Angular

Si l'on veut maintenant pouvoir utiliser ESLint dans le cadre d'un projet Angular en lieu et place d'une potentielle ancienne installation de TSLint (lequel est actuellement déprécié), il va falloir utiliser un module qui se nomme `angular-eslint`. Pour l'ajouter à notre projet Angular, il nous suffit d'utiliser la ligne de commande `ng add @angular-eslint/schematics` et le tour est joué !

Dans la cas où notre projet date d'une version d'Angular antérieure à la version 12, il va cependant falloir le convertir pour pouvoir utiliser ESLint (anciennement, Angular supportait par défaut TSLint). Pour cela, il est possible d'utiliser la ligne de commande:  

```bash
ng g @angular-eslint/schematics:convert-tslint-to-eslint --remove-tslint-if-no-more-tslint-targets
```

Une fois fait, il nous faudra lancer `ng lint` pour voir les soucis dans notre projet Angular, les corriger et enfin supprimer le fichier `tslintrc.json` ainsi que desinstaller la dépendance via `npm uninstall tslint --save`.

Le fichier se sert d'une propriété `override` qui contiendra un tableau d'objets comportant des propriétés `files` permettant de spécifier sur quels patterns de fichiers serrront appliquées les autres propriétés de l'objet. Via ce procédé, ESLint peut appliquer des règles sur les fichiers portant l'extension `.ts` indépendamment de ceux portant l'extension `.html`.

---
