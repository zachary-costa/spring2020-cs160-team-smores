<?php
	session_start();
	$username = htmlentities($_POST["username"]);
	$password = htmlentities($_POST["password"]);
	$_SESSION["username"] = $username;
	$_SESSION["password"] = $password;

	if($username == "user" && $password == "pass") {
		header("Location: home.html");			
	} else {
		header("Location: login.html");
	}


?>
