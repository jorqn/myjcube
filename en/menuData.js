window.menuData = {
    lang: 'en',
    title: "myJCube.com : rubik's cube solving",
    navigationRoot: {
	title: "Welcome !",
	id: 'index',
	children: [
	    {
		shortTitle: "The SHATARO convention",
		title: "The SHATARO convention",
		id: 'shataro_index',
		children: [
		    {
			id: 'shataro_overview',
			shortTitle: "Overview",
			title: "SHATARO overview",
		    },
		    {
			id: 'shataro_specs',
			shortTitle: "SHATARO specification",
			title: "Everything to know about SHATARO notation"
		    },
		    {
			id: 'shataro_tools',
			shortTitle: "Translation tool",
			title: "SHATARO / standard notation translation tool"
		    }
		]
	    },
	    {
		shortTitle: "A beginner solution",
		title: "A SHATARO beginner solution",
		id: 'beginner',
		children: [
		    {
			id: '1stCross',
			shortTitle: "First cross",
			title: "The first cross"
		    },
		    {
			id: '1stCrown',
			shortTitle: "First crown",
			title: "Complete the first crown"
		    },
		    {
			id: '2ndCrown',
			shortTitle: "Second crown",
			title: "Complete the secont crown",
		    },
		    {
			id: '2ndCross_1',
			shortTitle: "Second cross (step 1)",
			title: "Perform the second cross: first step",
			children: [
			    {
				id: '2ndCrossSample',
				shortTitle: 'Example',
				title: 'Sample resolution: 2nd cross - phase 1'
			    }
			]
		    },
		    {
			id: '2ndCross_2',
			shortTitle: "Second cross (step 2)",
			title: "Complete the second cross"
		    },
		    {
			id: 'yellowFace',
			shortTitle: "Yellow face",
			title: "Finish the yellow face",
			children: [
			    {
				id: 'yellowFaceSample',
				shortTitle: 'Example',
				title: 'Sample yellow face resolution'
			    }
			]
		    },
		    {
			id: 'finalPhase',
			shortTitle: "Final phase",
			title: "Finally, complete the whole cube"
		    }
		]
	    },
	    {
		shortTitle: "OLL and PLL formulas",
		title: "SHATARO formulas for OLL and PLL steps",
		id: 'advanced',
		children: [
		    {
			id: 'oll',
			shortTitle: "OLL",
			title: "SHATARO formulas for \"OLL\" phase"
		    },
		    {
			id: 'pll',
			shortTitle: "PLL",
			title: "SHATARO formulas for \"PLL\" phase"
		    }
		]
	    },
	    {
		shortTitle: "OLL/PLL tools",
		title: "OLL and PLL tools (SHATARO and standard)",
		id: 'tools',
		children: [
		    {
			id: 'ollTrainer',
			shortTitle: "OLL Trainer",
			title: "OLL Trainer on a real cube"
		    },
		    {
			id: 'cubelessTrainer',
			shortTitle: "Cubeless Trainer",
			title: "Learn or review OLL and PLL formulas"
		    }
		]
	    }
	]
    }
};
