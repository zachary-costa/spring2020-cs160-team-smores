<?php
	session_start();
	if (!empty($_POST["username"]) && !empty($_POST["password"])) {
		$username = htmlentities($_POST["username"]);
		$password = htmlentities($_POST["password"]);
		$_SESSION["username"] = $username;
		$_SESSION["password"] = $password;
	}

	header("Location: home.html");
?>
