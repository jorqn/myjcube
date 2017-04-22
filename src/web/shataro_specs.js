(function() {
    function insertRow(R, Rp, RA, RO) {
	//	document.write("<tr><td><a href='javascript:playFormula(\"formulaTest\", \""+R+"'

	document.writeln('<tr>');
	document.writeln('<td><a class="discrete" href="javascript:playFormula(\'formulaTest\', \''+R+'\');">'+R+'</a> / <a class="discrete" href="javascript:playFormula(\'formulaTest\', \''+Rp+'\');">'+R+'\'</a></td>');
	document.writeln('<td><a class="discrete" href="javascript:playFormula(\'formulaTest\', \''+R+'\');">'+RA+'</a> / <a class="discrete" href="javascript:playFormula(\'formulaTest\', \''+Rp+'\');">'+RO+'</a></td>');
	      // <td><a class="discrete" href="javascript:playFormula('formulaTest', 'R');">RA</a> / <a class="discrete" href="javascript:playFormula('formulaTest', 'Rp');">RO</a></td>
	document.writeln('</tr>');
    }
    function insertTable(tableData, clear) {
	var i;
	document.writeln('<table style="clear: '+clear+'"><tr><th>Standard</th><th>SHATARO</th></tr>');
	for(i = 0; i < tableData.length; i++) {
	    insertRow(tableData[i][0], tableData[i][1], tableData[i][2], tableData[i][3]);
	}
	document.writeln('</table>');
    };

    window.insertTables = function() {
	var tableData1 = [
	    [ "R", "Rp", "RA", "RO"],
	    [ "L", "Lp", "LA", "LO"],
	    [ "U", "Up", "TA", "TO"],
	    [ "D", "Dp", "DA", "DO"],
	    [ "F", "Fp", "FA", "FO"],
	    [ "B", "Bp", "BA", "BO"]
	];
	insertTable(tableData1, 'none');
	var tableData2 = [
	    [ "r", "rp", "REA", "REO"],
	    [ "l", "lp", "LEA", "LEO"],
	    [ "u", "up", "TEA", "TEO"],
	    [ "d", "dp", "DEA", "DEO"],
	    [ "f", "fp", "FEA", "FEO"],
	    [ "b", "bp", "BEA", "BEO"]
	];
	insertTable(tableData2, 'none');
	var tableData3 = [
	    [ "x", "xp", "MA", "MO"],
	    [ "y", "yp", "NA", "NO"],
	    [ "z", "zp", "PA", "PO"],
	];
	insertTable(tableData3, 'both');
    }
})();
