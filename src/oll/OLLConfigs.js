define('oll/OLLConfigs', ['cube/Cube', 'cube/Interpreter'], function(Cube, Interpreter) {
    "use strict";
    var configs = [];
    configs[49] = [ "   - ",
		   "| x  ",
		   " xxx ",
		   "| x  ",
		   "   - "];
    configs[50] = [ "     ",
		    "| x |",
		    " xxx ",
		    "| x |",
		    "     "];
    configs[51] = [ " -   ",
		    "  x |",
		    " xxx ",
		    " xx  ",
"   - "];
    configs[52] = [ "     ",
		    "| xx ",
		    " xxx ",
		    "  x |",
		    " -   "];
    configs[55] = [ "     ",
		    " xxx ",
		    " xxx ",
		    "  x  ",
		    " - - "];
    configs[56] = [ "   - ",
		    " xx  ",
		    " xxx ",
		    " xx  ",
		    "   - "];
    configs[57] = [ "   - ",
		    " xx  ",
		    " xxx ",
		    "| xx ",
		    "     "];
    configs[ 1] = [ "  -  ",
		    "|   |",
		    "| x |",
		    "|   |",
		    "  -  "];
    configs[ 2] = [ "  -- ",
		    "|    ",
		    "| x |",
		    "|    ",
		    "  -- "];
    configs[ 3] = [ " --  ",
		    "    |",
		    "| x |",
		    " x   ",
		    "  -- "];
    configs[ 4] = [ "  -- ",
		    "|    ",
		    "| x |",
		    "   x ",
		    " --  "];
    configs[ 5] = [ "  -  ",
		    " x x ",
		    "| x |",
		    "|   |",
		    "  -  "];
    configs[ 6] = [ " --- ",
		    "     ",
		    "| x |",
		    " x x ",
		    "  -  "];
    configs[ 7] = [ "  -- ",
		    " x   ",
		    "| x |",
		    "|  x ",
		    "  -  "];
    configs[30] = [ "  -  ",
		    " x x ",
		    "| x |",
		    " x x ",
		    "  -  "];
    configs[47] = [ "  -  ",
		    "|  x ",
		    " xxx ",
		    "|  x ",
		    "  -  "];
    configs[48] = [ " --  ",
		    "   x ",
		    " xxx ",
		    "   x ",
		    " --  "];
    configs[45] = [ "     ",
		    " xx |",
		    "| x |",
		    " xx |",
		    "     "];
    configs[46] = [ "  -  ",
		    "|   |",
		    " xxx ",
		    " x x ",
		    "  -  "];
    configs[20] = [ "     ",
		    "| xx ",
		    "| xx ",
		    "    |",
		    " --  "];
    configs[21] = [ "     ",
		    " xx |",
		    " xx |",
		    "|    ",
		    "  -- "];
    configs[22] = [ " -   ",
		    "  x |",
		    " xx |",
		    " x   ",
		    "  -- "];
    configs[23] = [ "   - ",
		    "| x  ",
		    "| xx ",
		    "   x ",
		    " --  "];
    configs[24] = [ "   - ",
		    " xx  ",
		    "| xx ",
		    "    |",
		    " --  "];
    configs[25] = [ " --  ",
		    "    |",
		    "| xx ",
		    " xx  ",
		    "   - "];
    configs[43] = [ "  -- ",
		    " x   ",
		    " xxx ",
		    "|  x ",
		    "  -  "];
    configs[44] = [ " --  ",
		    "   x ",
		    " xxx ",
		    " x  |",
		    "  -  "];
    configs[ 8] = [ "     ",
		    "| x |",
		    "| x |",
		    "| x |",
		    "     "];
    configs[ 9] = [ " -   ",
		    "  x |",
		    "| x |",
		    "  x |",
		    " -   "];
    configs[10] = [ "  -- ",
		    "|    ",
		    " xxx ",
		    "|    ",
		    "  -- "];
    configs[11] = [ "  -  ",
		    "|   |",
		    " xxx ",
		    "|   |",
		    "  -  "];
    configs[35] = [ " --  ",
		    "   x ",
		    "| xx ",
		    "  xx ",
		    " -   "];
    configs[36] = [ " -   ",
		    "  xx ",
		    "| xx ",
		    "   x ",
		    " --  "];
    configs[37] = [ "     ",
		    " xx |",
		    " xx |",
		    " x  |",
		    "  -  "];
    configs[38] = [ "     ",
		    "| xx ",
		    "| xx ",
		    "|  x ",
		    "  -  "];
    configs[12] = [ "   - ",
		    "| x  ",
		    " xx |",
		    "|    ",
		    "  -- "];
    configs[13] = [ " -   ",
		    "  x |",
		    "| xx ",
		    "    |",
		    " --  "];
    configs[14] = [ "   - ",
		    "| x  ",
		    "| xx ",
		    "|    ",
		    "  -- "];
    configs[15] = [ " -   ",
		    "  x |",
		    " xx |",
		    "    |",
		    " --  "];
    configs[16] = [ "  -  ",
		    "|   |",
		    "| xx ",
		    "| x |",
		    "     "];
    configs[17] = [ "     ",
		    "| x |",
		    "| xx ",
		    "|   |",
		    "  -  "];
    configs[33] = [ " -   ",
		    "  xx ",
		    " xx |",
		    " x  |",
		    "  -  "];
    configs[34] = [ "  -  ",
		    " x  |",
		    " xx |",
		    "  xx ",
		    " -   "];
    configs[18] = [ "   - ",
		    "| x  ",
		    " xx |",
		    "   x ",
		    " --  "];
    configs[19] = [ " --  ",
		    "   x ",
		    " xx |",
		    "| x  ",
		    "   - "];
    configs[31] = [ " -   ",
		    "  xx ",
		    "| xx ",
		    " x  |",
		    "  -  "];
    configs[32] = [ "     ",
		    " xx |",
		    " xx |",
		    "   x ",
		    " --  "];
    configs[26] = [ "  -- ",
		    "|    ",
		    " xxx ",
		    "   x ",
		    " --  "];
    configs[27] = [ " --  ",
		    "   x ",
		    " xxx ",
		    "|    ",
		    "  -- "];
    configs[28] = [ "  -  ",
		    "|  x ",
		    " xxx ",
		    "    |",
		    " --  "];
    configs[29] = [ " --  ",
		    "    |",
		    " xxx ",
		    "|  x ",
		    "  -  "];
    configs[39] = [ "  -  ",
		    " x x ",
		    " xx |",
		    "| x |",
		    "     "];
    configs[40] = [ "  -  ",
		    " x x ",
		    "| xx ",
		    "| x |",
		    "     "];
    configs[41] = [ " - - ",
		    "  x  ",
		    " xx |",
		    " x x ",
		    "  -  "];
    configs[42] = [ "  -  ",
		    " x x ",
		    " xx |",
		    "  x  ",
		    " - - "];
    configs[53] = [ "  -  ",
		    " x x ",
		    " xxx ",
		    " x x ",
		    "  -  "];
    configs[54] = [ "  -  ",
		    " x x ",
		    "| xx ",
		    " xxx ",
		    "     "];

    var trainingTable = ["",
	         "F'U'L'ULF2RUR'U'F'",
		 "RUR'URU2UR'URU2R'",
		 "l'U2LUL'Uly'FURU'R'F'",
		 "FRUR'U'F'yF'U'L'ULF",
		 "FRUR'U'F'rUR'URU2r'",
		 "RUR'U'R'FRURU'R'F'",
		 "FRUR'U'F'y2FURU'R'F'",
		 "FURU'R'F'yFRUR'U'F'",
		 "F'U'L'ULFyFRUR'U'F'",
		 "R'FRUR'U'F'URyFURU'R'F'",
		 "l'U2LUL'UlyFURU'R'F'",
		 "F'U'L'ULFR'U'l'UlF'UR",
		 "rUR'URU2r'FRUR'U'F'",
		 "l'U2LUL'UlFRUR'U'F'",
		 "RUR'URU2R'FRUR'U'F'",
		 "FRUR'U'F'yFRUR'U'F'",
		 "F'U'L'ULFyRUR'URU2R'",
		 "FRUR'U'F'yFURU'R'F'",
		 "FURU'R'F'yFURU'R'F'",
		 "l'U'LURU'r'FFRUR'U'F'",
		 "RUR'U'R'FRF'yFRUR'U'F'",
		 "F'U'L'ULU'L'ULF",
		 "FURU'R'F'rUR'URU2r'",
		 "FURU'R'URU'R'F'",
		 "RUR'URU2R'rUR'URU2r'",
		 "FRUR'U'F'RUR'URU2R'",
		 "rUR'URU2r'yFRUR'U'F'",
		 "l'U'LU'L'U2lRUR'URU2R'",
		 "FRUR'U'RUR'U'F'",
		 "rUR'URU2r'RUR'URU2R'",
		 "RUR'URU2R'y'FRUR'U'F'",
		 "RUR'U'R'FRRUR'U'F'",
		 "l'U2LUL'UlyFRUR'U'F'",
		 "l'U2LUL'UlRU2R'U'RU'R'",
		 "l'U'LU'L'U2lF'U'L'ULF",
		 "rUR'URU2r'FURU'R'F'",
		 "FURU'R'F'yRUR'URU2R'",
		 "FURU'R'F2U'L'ULF",
		 "",
		 "FRUR'U'F'l'U2LUL'Ul",
		 "FURU'R'F'yRUR'U'R'FRF'",
		 "rUR'URU2r'yl'U2LUL'Ul",
		 "RUR'URU2R'l'U'LU'L'U2l",
		 "F'U'L'ULFyF'U'L'ULF",
		 "F'U'L'ULFyFURU'R'F'",
		 "rUR'URU2r'yF'U'L'ULF",
		 "RUR'URU2R'yFRUR'U'F'",
		 "RU2R'U'RU'R'l'U2LUL'Ul",
		 "RUR'URU2R'yrU2R'U'RU'r'",
		 "FRUR'U'F2U'L'ULF",
		 "FRUR'U'F'y2FRUR'U'F'",
		 "l'U2LUL'UlyRUR'URU2R'",
		 "RUR'URU2R'FURU'R'F'",
		 "l'U2LUL'Uly'RUR'URU2R'",
		 "F'U'L'ULFRUR'URU2R'",
		 "l'U'L'URU'LUx'F'U'L'ULF",
		 "l'U'LURU'r'U'L'ULF",
		 "RUR'URU2R'F'U'L'ULF"
		];

    function rotate(coords, rotation) {
	rotation = ((rotation%4) + 4) % 4;
	var i;
	var coords = coords.concat([]);
	coords[0] -= 2;
	coords[1] -= 2;
	switch(rotation) {
	case 0:
	    return [2+coords[0], 2+coords[1]];
	case 1:
	    return [2+coords[1], 2-coords[0]];
	case 2:
	    return [2-coords[0], 2-coords[1]];
	case 3:
	    return [2-coords[1], 2+coords[0]];
	}
    }
    var arrows = [];
    function addArrows(index, tab) {
	if(arrows[1000+index]) {
	    throw new Error('duplicate');
	}
	arrows[1000 + index] = tab;
	configs[1000 + index] = [ "     ",
				  " xxx ",
				  " xxx ",
				  " xxx ",
				  "     "];
    }
    function rotateArrows(arrows, rotation) {
	if(!arrows) return null;
	var result = [];
	var i, arrow;
	for(i = 0; i < arrows.length; i++) {
	    arrow = arrows[i];
	    result.push([rotate(arrow[0],-rotation), arrow[1], rotate(arrow[2],-rotation)]);
	}
	return result;
    }
    addArrows(1, [[[1, 2], '->', [3,2]],
		  [[3,2], '->', [2,3]],
		  [[2,3], '->', [1,2]]]);

    addArrows(2, [[[1, 2], '->', [3,2]],
		  [[3,2], '->', [2,1]],
		  [[2,1], '->', [1,2]]]);

    addArrows(5, [[[2, 1], '<->', [3,2]],
                  [[1,2], '<->', [2,3]]]);

    addArrows(17, [[[1,2], '<->', [3,2]],
		   [[2,1], '<->', [2,3]]]);

    addArrows(3, [[[1, 1], '->', [3,1]],
		  [[3,1], '->', [3,3]],
		  [[3,3], '->', [1,1]]]);

    addArrows(4, [[[3, 1], '->', [1,1]],
		  [[1,1], '->', [3,3]],
		  [[3,3], '->', [3,1]]]);

    addArrows(16, [[[1, 1], '<->', [3,1]],
                  [[1,3], '<->', [3,3]]]);

    addArrows(8, [[[2, 1], '<->', [3,2]],
                  [[1,3], '<->', [3,3]]]);

    addArrows(9, [[[1, 1], '<->', [3,1]],
                  [[2,3], '<->', [3,2]]]);

    addArrows(10, [[[3, 1], '<->', [3,3]],
                  [[2,3], '<->', [3,2]]]);

    addArrows(11, [[[3, 1], '<->', [3,3]],
                  [[2,1], '<->', [3,2]]]);

    addArrows(12, [[[3, 1], '<->', [1,3]],
                  [[1,2], '<->', [3,2]]]);

    addArrows(13, [[[1, 1], '<->', [3,3]],
                  [[1,2], '<->', [3,2]]]);

    addArrows(18, [[[1, 1], '->', [3,1]],
		   [[3,1], '->', [1,3]],
		   [[1,3], '->', [1,1]],
		   [[1,2], '->', [3,2]],
		   [[3,2], '->', [2,1]],
		   [[2,1], '->', [1,2]]]);

    addArrows(19, [[[1,1], '->', [1,3]],
		   [[1,3], '->', [3,3]],
		   [[3,3], '->', [1,1]],
		   [[1,2], '->', [3,2]],
		   [[3,2], '->', [2,3]],
		   [[2,3], '->', [1,2]]]);

    addArrows(20, [[[1, 1], '->', [3,1]],
		   [[3,1], '->', [1,3]],
		   [[1,3], '->', [1,1]],
		   [[2,1], '->', [1,2]],
		   [[1,2], '->', [2,3]],
		   [[2,3], '->', [2,1]]]);

    addArrows(21, [[[1,1], '->', [3,3]],
		   [[3,3], '->', [3,1]],
		   [[3,1], '->', [1,1]],
		   [[2,1], '->', [3,2]],
		   [[3,2], '->', [2,3]],
		   [[2,3], '->', [2,1]]]);

    addArrows(6, [[[1,1], '<->', [3,1]],
                  [[1,2], '<->', [3,2]]]);

    addArrows(7, [[[3,1], '<->', [3,3]],
                  [[1,2], '<->', [3,2]]]);

    addArrows(14, [[[1,1], '<->', [3,3]],
                  [[2,1], '<->', [3,2]]]);

    addArrows(15, [[[1,1], '<->', [3,3]],
                  [[2,1], '<->', [1,2]]]);

    var configToTrainingTable = [];
    configToTrainingTable[49] = 1;
    configToTrainingTable[50] = 2;
    configToTrainingTable[51] = 4;
    configToTrainingTable[52] = 3;
    configToTrainingTable[55] = 40;
    configToTrainingTable[56] = 6;
    configToTrainingTable[57] = 5;
    configToTrainingTable[1] = 42;
    configToTrainingTable[2] = 7;
    configToTrainingTable[3] = 9;
    configToTrainingTable[4] = 8;
    configToTrainingTable[5] = 41;
    configToTrainingTable[6] = 11;
    configToTrainingTable[7] = 10;
    configToTrainingTable[30] = 12;
    configToTrainingTable[47] = 28;
    configToTrainingTable[48] = 34;
    configToTrainingTable[45] = 58;
    configToTrainingTable[46] = 57;
    configToTrainingTable[20] = 18;
    configToTrainingTable[21] = 19;
    configToTrainingTable[22] = 16;
    configToTrainingTable[23] = 17;
    configToTrainingTable[24] = 45;
    configToTrainingTable[25] = 44;
    configToTrainingTable[43] = 27;
    configToTrainingTable[44] = 26;
    configToTrainingTable[8] = 54;
    configToTrainingTable[9] = 23;
    configToTrainingTable[10] = 29;
    configToTrainingTable[11] = 56;
    configToTrainingTable[35] = 21;
    configToTrainingTable[36] = 20;
    configToTrainingTable[37] = 13;
    configToTrainingTable[38] = 15;
    configToTrainingTable[12] = 24;
    configToTrainingTable[13] = 22;
    configToTrainingTable[14] = 31;
    configToTrainingTable[15] = 50;
    configToTrainingTable[16] = 25;
    configToTrainingTable[17] = 30;
    configToTrainingTable[33] = 46;
    configToTrainingTable[34] = 47;
    configToTrainingTable[18] = 36;
    configToTrainingTable[19] = 35;
    configToTrainingTable[31] = 55;
    configToTrainingTable[32] = 14;
    configToTrainingTable[26] = 33;
    configToTrainingTable[27] = 32;
    configToTrainingTable[28] = 53;
    configToTrainingTable[29] = 52;
    configToTrainingTable[39] = 49;
    configToTrainingTable[40] = 48;
    configToTrainingTable[41] = 37;
    configToTrainingTable[42] = 43;
    configToTrainingTable[53] = 51;
    configToTrainingTable[54] = 38;

    var solutions = [];

    function addSolution(type, index, solution) {
	var offset = (type === "PLL" ? 1000 : 0);
	solutions[offset + index] = solution.replace(/2'/g,"2");
    }

    addSolution("OLL", 49, "RU2'R2'U'R2U'R2'U2R");
    addSolution("OLL", 50, "RUR'URU'R'URU2'R'");
    addSolution("OLL", 51, "RUR'URU2'R'");
    addSolution("OLL", 52, "RU2R'U'RU'R'");
    addSolution("OLL", 55, "R2'DR'U2RD'R'U2R'");
    addSolution("OLL", 56, "l'U'LURU'r'F");
    addSolution("OLL", 57, "l'U'L'URU'LUx'");
    addSolution("OLL", 1, "RUx'U'RUl'R'U'l'UlF'");
    addSolution("OLL", 2, "FRUR'U'F'fRUR'U'f'");
    addSolution("OLL", 3, "r'R2UR'UrU2r'UR'r");
    addSolution("OLL", 4, "r'RU'rU2r'U'RU'R2'r");
    addSolution("OLL", 5, "r'RURUR'U'rR2'FRF'");
    addSolution("OLL", 6, "FRUR'Uy'R'U2R'FRF'");
    addSolution("OLL", 7, "RUR'UR'FRF'U2R'FRF'");
    addSolution("OLL", 30, "r'RURUR'U'r2R2'URU'r'");
    addSolution("OLL", 47, "FRUR'U'F'");
    addSolution("OLL", 48, "RUR'U'R'FRF'");
    addSolution("OLL", 45, "R'U'l'UlF'UR");
    addSolution("OLL", 46, "RUR'U'xD'R'URU'Dx'");
    addSolution("OLL", 20, "rU2R'U'RU'r'");
    addSolution("OLL", 21, "l'U2LUL'Ul");
    addSolution("OLL", 22, "rUR'URU2r'");
    addSolution("OLL", 23, "l'U'LU'L'U2'l");
    addSolution("OLL", 24, "rR2'U'RU'R'U2RU'Rr'");
    addSolution("OLL", 25, "r'R2UR'URU2R'UR'r");
    addSolution("OLL", 43, "R'FRUR'U'F'UR");
    addSolution("OLL", 44, "LF'L'U'LUFU'L'");
    addSolution("OLL", 8, "R'U2R2UR'URU2x'U'R'Ux");
    addSolution("OLL", 9, "R'U'RU'R'dR'URB");
    addSolution("OLL", 10, "fRUR'U'RUR'U'f'");
    addSolution("OLL", 11, "r'U'rU'R'URU'R'URr'Ur");
    addSolution("OLL", 35, "RUB'U'R'UlUl'");
    addSolution("OLL", 36, "R'U'FURU'R'F'R");
    addSolution("OLL", 37, "FURU'R'F'");
    addSolution("OLL", 38, "F'U'L'ULF");
    addSolution("OLL", 12, "FRUR'U'RUR'U'F'");
    addSolution("OLL", 13, "F'L'U'LUL'U'LUF");
    addSolution("OLL", 14, "l'UR'U'RlU2x'U'RUl'");
    addSolution("OLL", 15, "R'FR2B'R2'F'R2BR'");
    addSolution("OLL", 16, "r'U'RU'R'URU'R'U2r");
    addSolution("OLL", 17, "rUR'URU'R'URU2'r'");
    addSolution("OLL", 33, "RUR'URU'R'U'R'FRF'");
    addSolution("OLL", 34, "R'U'RU'R'URUlU'R'Ux");
    addSolution("OLL", 18, "R'U'Ry'x'RU'R'FRUl'");
    addSolution("OLL", 19, "RUR'xz'R'URB'R'U'l");
    addSolution("OLL", 31, "R'U2lRU'R'Ul'U2'R");
    addSolution("OLL", 32, "FRU'R'U'RUR'F'");
    addSolution("OLL", 26, "R'FRUl'U'ly'RU'R'");
    addSolution("OLL", 27, "x'RU'R'F'RUR'xyR'UR");
    addSolution("OLL", 28, "LFL'RUR'U'LF'L'");
    addSolution("OLL", 29, "L'B'LR'U'RUL'BL");
    addSolution("OLL", 39, "B'RB'R2'URUR'U'RB2");
    addSolution("OLL", 40, "R2'UR'B'RU'R2'UlUl'");
    addSolution("OLL", 41, "RUR'URU2'R'FRUR'U'F'");
    addSolution("OLL", 42, "R'U'RU'R'U2RFRUR'U'F'");
    addSolution("OLL", 53, "RUR'U'rR'URU'r'");
    addSolution("OLL", 54, "rR'URr'U2rR'URr'");

    addSolution("PLL", 1, "R2'URUR'U'R'U'R'UR'");
    addSolution("PLL", 2, "R2U'R'U'RURURU'R");
    addSolution("PLL", 5, "R'U'RU'RURU'R'URUR2U'R'U2");
    addSolution("PLL", 17, "r2R2'Ur2R2'U2r2R2'Ur2R2'");
    addSolution("PLL", 3, "xR'UR'D2RU'R'D2l2x");
    addSolution("PLL", 4, "xR2D2RUR'D2RU'l");
    addSolution("PLL", 16, "l'U'L'URU'LUR'U'LURU'L'Ux'");
    addSolution("PLL", 8, "RU2'R'U2RB'R'U'RUlUR2'Fx");
    addSolution("PLL", 9, "R'U2RU2'R'FRUR'U'R'F'R2U'");
    addSolution("PLL", 10, "RUR'F'RUR'U'R'FR2U'R'U'");
    addSolution("PLL", 11, "F2'L'U'rU2'l'UR'U'R2x2");
    addSolution("PLL", 12, "RU'LU2'R'UL'RU'LU2'R'UL'U'");
    addSolution("PLL", 13, "L'UR'U2LU'RL'UR'U2LU'RU");
        //"L'UR'U2'LU'L'RUR'U2'LU'R");
    addSolution("PLL", 18, "R2'uR'UR'U'Ru'R2y'R'UR");
    addSolution("PLL", 19, "R2u'RU'RUR'uR2'yRU'R'");
    addSolution("PLL", 20, "RUR'y'R2u'RU'R'UR'uR2");
    addSolution("PLL", 21, "L'U'Ly'R2'uR'URU'Ru'R2");
    addSolution("PLL", 6, "R'URU'R2F'U'FUxRUR'U'R2B'x'");
    addSolution("PLL", 7, "RUR'U'R'FR2U'R'U'RUR'F'");
    addSolution("PLL", 14, "R'UR'U'x2y'R'UR'U'lRU'R'URUx'");
    addSolution("PLL", 15, "FRU'R'U'RUR'F'RUR'U'l'URU'x'");


    var shataroSolutions = [];
    function addShataroSolution(type, index, solution) {
	var offset = (type === "PLL" ? 1000 : 0);
	shataroSolutions[offset + index] = solution.replace(/2'/g,"2");
    }

    addShataroSolution("OLL", 49, "RA TIRITORI TORITIRA");
    addShataroSolution("OLL", 50, "SHATARA TOSHO TIRO");
    addShataroSolution("OLL", 51, "SHATARA TIRO");
    addShataroSolution("OLL", 52, "RATIRO TOSHU");
    addShataroSolution("OLL", 55, "RIDARO TIRADO ROTIRO");
    addShataroSolution("OLL", 56, "LEOTOLA TARATO REOFA");
    addShataroSolution("OLL", 57, "LEOTOLO TARATO LATAMO");
    addShataroSolution("OLL", 1, "RATAMOTO RATALEO ROTOLEO TALEA FO");
    addShataroSolution("OLL", 2, "FASHATOFO FEASHATOFEO");
    addShataroSolution("OLL", 3, "REORI TARO TAREA TIREO TARO REA");
    addShataroSolution("OLL", 4, "REORA TOREA TIREO TORA TORI REA");
    addShataroSolution("OLL", 5, "REORA TASHATO REARI FARAFO");
    addShataroSolution("OLL", 6, "FASHATA NO ROTIRO FARAFO");
    addShataroSolution("OLL", 7, "SHATARO FARA FOTIRO FARAFO");
    addShataroSolution("OLL", 30, "REORA TASHATO REIRI TARATO REO");
    addShataroSolution("OLL", 47, "FA SHATO FO");
    addShataroSolution("OLL", 48, "SHATORO FARAFO");
    addShataroSolution("OLL", 45, "RO TOLEO TALEA FOTARA");
    addShataroSolution("OLL", 46, "SHATO MADO SHOTO DAMO");
    addShataroSolution("OLL", 20, "REATI ROTORA TOREO");
    addShataroSolution("OLL", 21, "LEOTI LATALO TALEA");
    addShataroSolution("OLL", 22, "REATA SHOTIREO");
    addShataroSolution("OLL", 23, "LEO TOLA TOLO TILEA");
    addShataroSolution("OLL", 24, "REARI TOSHUTI RATORA REO");
    addShataroSolution("OLL", 25, "REARI TASHOTI ROTARO REA");
    addShataroSolution("OLL", 43, "ROFASHA TO FOTARA");
    addShataroSolution("OLL", 44, "LAFOLOTO LATAFA TOLO");
    addShataroSolution("OLL", 8, "ROTI RITA SHOTI MOTO ROTAMA");
    addShataroSolution("OLL", 9, "ROTOSHU DEASHOBA");
    addShataroSolution("OLL", 10, "FEA SHATO SHATO FEO");
    addShataroSolution("OLL", 11, "REOTOREA TOSHO TOSHO REOTAREA");
    addShataroSolution("OLL", 35, "RATA BOTORO TALEA TALEO");
    addShataroSolution("OLL", 36, "ROTO FATA SHUFORA");
    addShataroSolution("OLL", 37, "FATA SHUFO");
    addShataroSolution("OLL", 38, "FOTOLO TALAFA");
    addShataroSolution("OLL", 12, "FA SHATO SHATO FO");
    addShataroSolution("OLL", 13, "FO LOTO LATA LOTO LATA FA");
    addShataroSolution("OLL", 14, "LEO SHIRALEA TIMOTO RATALEO");
    addShataroSolution("OLL", 15, "RO FARI BORI FORI BARO");
    addShataroSolution("OLL", 16, "REOTO RATOSHO TORO TIREA");
    addShataroSolution("OLL", 17, "REATA SHOTOSHO TIREO");
    addShataroSolution("OLL", 33, "SHATASHU TORO FARAFO");
    addShataroSolution("OLL", 34, "ROTO RATOSHO TALEA TORO TAMA");
    addShataroSolution("OLL", 18, "ROTORA NOMO SHUFARA TALEO");
    addShataroSolution("OLL", 19, "SHAMAPO SHOBORO TOLEA");
    addShataroSolution("OLL", 31, "ROTI LEA SHUTA LEO TIRA");
    addShataroSolution("OLL", 32, "FA SHUTO SHAFO");
    addShataroSolution("OLL", 26, "ROFARA TALEO TOLEA NOSHU");
    addShataroSolution("OLL", 27, "MO SHUFO SHAMANA SHO");
    addShataroSolution("OLL", 28, "LAFALO SHATO LAFOLO");
    addShataroSolution("OLL", 29, "LOBOLA ROTO RATA LOBALA");
    addShataroSolution("OLL", 39, "BORA BORI TASHATO RABI");
    addShataroSolution("OLL", 40, "RITARO BORA TORI TALEA TALEO");
    addShataroSolution("OLL", 41, "SHATARA TIRO FA SHATO FO");
    addShataroSolution("OLL", 42, "ROTOSHU TIRA FA SHATO FO");
    addShataroSolution("OLL", 53, "SHATO REA SHOTO REO");
    addShataroSolution("OLL", 54, "REASHOREO TI REASHOREO");
    addShataroSolution("PLL", 1, "RI TARA TARO TORO TORO TARO");
    addShataroSolution("PLL", 2, "RI TORO TORA TARA TARA TORA");
    addShataroSolution("PLL", 5, "ROTORA TORATA RATOSHO TARITO ROTI");
    addShataroSolution("PLL", 17, "REIRITA REIRITI REIRITA REIRI");
    addShataroSolution("PLL", 3, " MAROTARO DISHUDI LEIMA");
    addShataroSolution("PLL", 4, " MARIDISHA DIRATO LEA");
    addShataroSolution("PLL", 16, "LEOTOLO TARATOLA SHILA TARATOLO TAMO");
    addShataroSolution("PLL", 8, "RATI ROTI RABORO TORATA LEATARI FAMA");
    addShataroSolution("PLL", 9, "ROTI RATI ROFASHA TORO FORITO");
    addShataroSolution("PLL", 10, "SHAFOSHA TOROFA RITO ROTO");
    addShataroSolution("PLL", 11, "FILOTO REATILEO SHIRIMI");
    addShataroSolution("PLL", 12, "RATOLA TI ROTALO RATOLA TI ROTALO");
    addShataroSolution("PLL", 13, "LOTARO TI LATOLO LOTARO TI LATOLO");
    addShataroSolution("PLL", 18, "RITEARO SHIRA TEORI NOSHO");
    addShataroSolution("PLL", 19, "RITEORA TOSHA TEARI NASHU");
    addShataroSolution("PLL", 20, "SHANORI TEOSHU TARO TEARI");
    addShataroSolution("PLL", 21, "LOTOLANORI TEASHO TORA TEORI");
    addShataroSolution("PLL", 6, "SHOTORI FOTO FATAMA SHATORI BOMO");
    addShataroSolution("PLL", 7, "SHATORO FARITO ROTO SHAFO");
    addShataroSolution("PLL", 14, "ROSHI MINO ROSHI LEARATOSHO TAMO");
    addShataroSolution("PLL", 15, "FASHUTO SHAFOSHA TOLEO TARATOMO");
    

    var OLLConfig = function(index, rotate) {
	this.index = index;
	this.rotate = rotate || 0;
	if(index < 1000) {
	    this.type = "OLL";
	    this.indexInType = index;
	} else {
	    this.type = "PLL";
	    this.indexInType = index - 1000;
	}
    };
    OLLConfig.prototype.isFilledAtPoint = function(x, y) {
	var rotated = rotate([x,y], this.rotate);
	x = rotated[0];
	y = rotated[1];
	var str = configs[this.index][y];
	var car = str.substr(x, 1);
	return car !== " ";
    };
    OLLConfig.prototype.getTrainingSequence = function() {
	return trainingTable[configToTrainingTable[this.index]];
    };
    OLLConfig.prototype.getArrows = function () {
	return rotateArrows(arrows[this.index], this.rotate);;
    };
    OLLConfig.prototype.getSolution = function () {
	return solutions[this.index];
    };
    OLLConfig.prototype.getShataroSolution = function () {
	return shataroSolutions[this.index];
    };
    OLLConfig.prototype.getNiceName = function () {
	return this.type + "#" + this.indexInType;
    };
    OLLConfig.prototype.buildCube = function () {
	var cube = new Cube();
	var i;
	if(this.type === "OLL") { // upper crown needs to be deactivated
	    var tiles = [];
	    var upFace = cube.faces.up;
	    tiles = tiles.concat(upFace.getNeighborEdgeTiles("up"));
	    tiles = tiles.concat(upFace.getNeighborEdgeTiles("down"));
	    tiles = tiles.concat(upFace.getNeighborEdgeTiles("left"));
	    tiles = tiles.concat(upFace.getNeighborEdgeTiles("right"));
	    for(i = 0; i < tiles.length; i++) {
		tiles[i].setIgnoreInSolution(true);
	    }
	}
//	cube = cube.executeCommands(Interpreter.parse("R2'URUR'U'R'U'R'UR'"));
//	console.log(cube.getFillString());
	var commands = Interpreter.parse(this.getSolution(), true);
	cube = cube.executeCommands(commands);
	if(this.rotate) {
	    this.rotate = ((this.rotate % 4) + 4) % 4;
	    for(i = 0; i < this.rotate; i++) {
		cube = cube.executeCommand('y');
	    }
	}
	return cube;
    };
    var OLLConfigs = {
	getConfig: function(configId, rotate) {
	    return new OLLConfig(configId, rotate);
	},
	getAllConfigs: function(pll) {
	    var result = [];
	    var i;
	    for(i = 0; i < this.nbOLLConfigs; i++) {
		result.push(new OLLConfig(i+1));
	    }
	    if(pll) {
		for(i = 0; i < this.nbPLLConfigs; i++) {
		    result.push(new OLLConfig(1001+i));
		}
	    }
	    return result;
	},
	nbOLLConfigs: 57,
	nbPLLConfigs: 21
    };
    return OLLConfigs;
});
