<!DOCTYPE html>

<html>

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="stylepredictions.css" />
    <title>Contact</title>
</head>


<body id="body_contact">
    <nav role="navigation">
        <div id="menuToggle">

            <input type="checkbox" />

            <span></span>
            <span></span>
            <span></span>

            <ul id="menu">
                <a href="index.html">
                    <li>Accueil</li>
                </a><br>
                <a href="predictions.php">
                    <li>IA de prédiction</li>
                </a><br>
                <a href="actualites.html">
                    <li>Actualités</li>
                </a><br>
                <a href="projet.html">
                    <li>Le projet</li>
                </a><br>
                <a href="equipe.html">
                    <li>L'équipe</li>
                </a><br>
                <a href="contact.html">
                    <li>Contact</li>
                </a>

                <p id="copyright">© STI'LECTION, 2021 - Tous droits réservés</p>
            </ul>
        </div>
    </nav>

    <div class="projet_corps">
        <div class="projet_titre">
            Contact
        </div>
        <div class="contact_contenu">

            <p>Si vous avez la moindre question n'hésitez pas à nous contacter à l'adresse suivante :</p>
            <form method="post">
                <label>Email</label>
                <br/>
                <input type="email" name="email" required><br>
                <label>Message</label>
                <br />
                <textarea name="message" required></textarea><br>
                <input type="submit">
            </form>
            <?php
                if (isset($_POST['message'])) {
                    $position_arobase = strpos($_POST['email'], '@');
                    if ($position_arobase === false)
                        echo '<p>Votre email doit comporter un arobase.</p>';
                    else {
                        $retour = mail('mailto:nathan.rochas@insa-cvl.fr', 'Envoi depuis la page Contact', $_POST['message']);
                        if($retour)
                            echo '<p>Votre message a été envoyé.</p>';
                        else
                            echo '<p>Erreur</p>';
                    }
                }
            ?>
                <br>
                <br>
                <br>
                <p>Vous pouvez aussi visiter notre git : </p>
                <a href="https://github.com/Anatharr/elections">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
                </a>

        </div>
    </div>
</body>

</html>