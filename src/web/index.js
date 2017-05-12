(function()  {
    window.insertRandomFigure = function() {
	var formulaTable = ["U2F2R2U'L2DBR'BR'BR'D'L2U'",
			    "L'R2F'L'B'UBLFRU'R2FB'UD'RL'",
			    "U'R2D'B'DR'D'BDR'U",
			    "D2F'D2R2FRF'RU2L'BLD2U2F",
			    "RFR2B'DB2D'BR2F'RB2R2",
			    "BL'D2LDF'D2FD'B'",
			    "L'FB'URF2R'D'L'U'F2URF",
			    "FR'ULF'L'FU'RUL'U'LF'",
			    "FU2LFL'BLUB'R'L'UR'D'F'BR2",
			    "U2R2L2F2B2U2R2L2F2B2",
			    "R'L2F2B2U2R2L2F2B2D2R'",
			    "UF2R2F2U'DL2B2L2D'",
			    "F2R2B2F2R2B2",
			    "RLU2R'L'FBU2F'B'U2",
			    "FBLRFBLRFBLRU2D2",
			    "U'R2D'B'DR'D'BDR'URL'FB'UD'RL'RL'FB'UD'RL'",
			    "RL'FB'UD'RL'",
			    "FBUDR'L'FB",
			    "FBUDR'L'FBRLUDB'F'RL",
			    "U2F2R2B2D2F2D2R2D2F2",
			    "F'B'RLF'B'RLF'B'RL",
			    "U'R'F2RFURU2R'F'F'U'R2URFUF2U'R'",
			    "R2L'U2RLU2RULF2L'FD2F'LF2L'U'",
			    "F'D'B'L'BU'B'R'B2R'B'D'BL'B'U'F'",
			    "L'RU'DL'RU'DL'RU'D",
			    "UR2FBRB2RU2LB2RU'D'R2FR'LB2U2F2",
			    "BRL'D'R2DLR'B'R2UB2U'DR2D'",
			    "BRL'D'R2DLR'B'R2UB2U'DB2RLU2L'R'B2D'",
			    "U'R'F2RFURU2R'F2U'R2URFUF2U'L'FB'UD'RL'",
			   ];
	var index = Math.floor(Math.random()*formulaTable.length);
	console.log("formula: " + index);
	window.insertFormulaPlayer({ name: "nice", noButtons: true,
				     startFormula: formulaTable[index],
				     width: 300, height: 300, style: "float: right; margin-top: 0x"});
    }
})();
