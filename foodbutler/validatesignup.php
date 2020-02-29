<?php
	$username = htmlentities($_GET["username"]);
	$password = htmlentities($_GET["password"]);

	session_start();


	$_SESSION["user"] = $username;
	header("Location:home.html");

 



?>
