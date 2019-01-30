API inspi : https://heads-up-api.herokuapp.com/

Notre idée :
À la base nous avons voulu reproduire un jeu de société adapté à une application mobile. Le but est assez simple : il faut faire deviner des mots à propos d'un thème choisi à une autre personne. Chaque mot deviné raporte un point.

Afin d'enrichir l'application nous avons décidé de réaliser plusieurs mini-jeux (jeu du pendu, snake, memory, quizz,...).
Nous avons tenu à nous challenger en produisant nous-même l'algorithme de l'intégralité des mini-jeux. Nous n'avons effectué aucun copié/collé car cela ne nous aurait rien apporté. Ainsi nous pouvons utiliser pleinement ce que nous avons appris (navigation entre les vues, states, props, ...) et même d'autres méthodes (ex: SetNativeProps pour éviter de re-rendre l'ingralité du composant etc.).


Chaque mini-jeu possède un tableau de bord (LaunchGame) qui permet de gérer plusieurs informations : 
- Nom du jeu
- Règles du jeu
- Statistiques (dernière partie, meilleure partie, nombre de parties terminées)

Si aucun score n'est enregistré, les règles du jeu sont ouvertes par défaut (sinon on peut les ouvrir/fermer en cliquant dessus avec un effet toggle).

Tous les mini-jeux utilisent les mêmes fonctions pour mettre à jour le système de score. Chaque action est stockée (partie commencée, partie terminée). Nous pouvons donc afficher un large choix de stats (meilleurs scores, score moyen, nombre de parties lancées, nombre de parties gagnées...) sur l'ensemble des jeux.