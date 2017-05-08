window.menuData = {
    lang: 'fr',
    navigationRoot: {
	title: "Bienvenue !",
	id: 'index',
	children: [
	    {
		shortTitle: "Notation SHATARO",
		title: "Notation SHATARO",
		id: 'shataro_index',
		children: [
		    {
			id: 'shataro_overview',
			shortTitle: "Vue d'ensemble",
			title: "Vue d'ensemble de la notation SHATARO",
		    },
		    {
			id: 'shataro_specs',
			shortTitle: "Définition de SHATARO",
			title: "Tout savoir sur la notation SHATARO"
		    },
		    {
			id: 'shataro_tools',
			shortTitle: "Outil de traduction",
			title: "Outil de traduction entre SHATARO et notation standard"
		    }
		]
	    },
	    {
		shortTitle: "Solution débutants",
		title: "Méthode de résolution débutant en SHATARO",
		id: 'beginner',
		children: [
		    {
			id: '1stCross',
			shortTitle: "La croix",
			title: "La première croix"
		    },
		    {
			id: '1stCrown',
			shortTitle: "Première couronne",
			title: "Faire la première couronne"
		    },
		    {
			id: '2ndCrown',
			shortTitle: "Deuxième couronne",
			title: "Compléter la deuxième couronne",
		    },
		    {
			id: '2ndCross_1',
			shortTitle: "Deuxième croix 1/2",
			title: "Faire la deuxième croix: étape 1"
		    },
		    {
			id: '2ndCross_2',
			shortTitle: "Deuxième croix 2/2",
			title: "Terminer la deuxième croix"
		    },
		    {
			id: 'yellowFace',
			shortTitle: "Face jaune",
			title: "Compléter la face jaune",
			children: [
			    {
				id: 'yellowFaceSample',
				shortTitle: 'Exemple',
				title: 'Exemple de résolution de la phase jaune'
			    }
			]
		    },
		    {
			id: 'finalPhase',
			shortTitle: "Phase finale",
			title: "Comment terminer le cube"
		    }
		]
	    },
	    {
		shortTitle: "Formules OLL et PLL",
		title: "Formules de résolution OLL et PLL en SHATARO",
		id: 'advanced',
		children: [
		    {
			id: 'oll',
			shortTitle: "OLL",
			title: "Formules SHATARO pour la résolution de la phase «OLL»"
		    },
		    {
			id: 'pll',
			shortTitle: "PLL",
			title: "Formules SHATARO pour la résolution de la phase «PLL»"
		    }
		]
	    },
	    {
		shortTitle: "Outils OLL/PLL",
		title: "Outils d'apprentissage OLL et PLL (langage SHATARO et notation standard)",
		id: 'tools',
		children: [
		    {
			id: 'ollTrainer',
			shortTitle: "OLL Trainer",
			title: "OLL Trainer: s'entraîner à résoudre la phase OLL (cube physique nécessaire)"
		    },
		    {
			id: 'cubelessTrainer',
			shortTitle: "Cubeless Trainer",
			title: "Apprendre ou réviser les formules de résolution OLL et PLL."
		    }
		]
	    }
	]
    }
};
