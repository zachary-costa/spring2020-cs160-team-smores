<?php
	$username = htmlentities($_GET["username"]);
	$password = htmlentities($_GET["password"]);

	if("username" != "user" || $password != "pass") {
		echo "error";
	} else {
		session_start();
		$_SESSION["user"] = $username;
		echo "";
	}
?>
