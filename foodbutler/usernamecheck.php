<?php
	if(isset($_GET["username"])) {
		$username = htmlentities($_GET["username"]);

		if($username === "user") {
			echo "Username has been taken";
		} else {
			echo "";
		}
	}
?>
