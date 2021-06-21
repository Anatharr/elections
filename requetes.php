<?php
// Connexion, sélection de la base de données
$dbconn = pg_connect("host=localhost dbname=electionsdb user=pi password=estilections")
    or die('Connexion impossible : ' . pg_last_error());

// Exécution de la requête SQL
$query = 'SELECT * FROM t1_2015_cantons WHERE (num_departement="1" and code_canton=1)';
$result = pg_query($query) or die('Échec de la requête : ' . pg_last_error());

// Affichage des résultats en HTML
echo "<table>\n";
while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
    echo "\t<tr>\n";
    foreach ($line as $col_value) {
        echo "\t\t<td>$col_value</td>\n";
    }
    echo "\t</tr>\n";
}
echo "</table>\n";

// Libère le résultat
pg_free_result($result);

// Ferme la connexion
pg_close($dbconn);
?>