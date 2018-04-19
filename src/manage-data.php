<?php

   // Define database connection parameters
   $hn      = 'localhost';
   $un      = 'id5388841_matekadev';
   $pwd     = 'TCCUlbra2507';
   $db      = 'id5388841_denteapp';
   $cs      = 'utf8';

   // Set up the PDO parameters
   $dsn 	= "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt 	= array(
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                       );
   // Create a PDO instance (connect to the database)
   $pdo 	= new PDO($dsn, $un, $pwd, $opt);


   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
   $key     =  strip_tags($obj->key);


   // Determine which mode is being requested
   switch($key)
   {

      // Add a new record to the usuario table
      case "create":

         // Sanitise URL supplied values
         $email   = filter_var($obj->usr_email, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $senha	  = filter_var($obj->usr_senha, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $nome    = filter_var($obj->usr_nome, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

         // Attempt to run PDO prepared statement
         try {
            $sql 	= "INSERT INTO Usuario(usr_email, usr_senha, usr_nome) VALUES(:email, :senha, :nome)";
            $stmt 	= $pdo->prepare($sql);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':senha', $senha, PDO::PARAM_STR);
            $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
            $stmt->execute();

            echo json_encode(array('message' => 'Congratulations the record ' . $email . ' was added to the database'));
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;

      // Update an existing record in the Usuario table
      case "update":

         // Sanitise URL supplied values
         $email 	= filter_var($obj->usr_email, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $senha 	= filter_var($obj->usr_senha, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $nome      = filter_var($obj->usr_nome, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $cod    	= filter_var($obj->usr_cod, FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $sql 	= "UPDATE Usuario SET usr_email = :email, usr_senha = :senha, usr_nome = :nome WHERE id = :cod";
            $stmt 	=	$pdo->prepare($sql);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':senha', $senha, PDO::PARAM_STR);
            $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
            $stmt->bindParam(':cod', $cod, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode('Congratulations the record ' . $email . ' was updated');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;

      // Remove an existing record in the Usuario table
      case "delete":

         // Sanitise supplied record ID for matching to table record
         $cod	=	filter_var($obj->usr_cod, FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $pdo 	= new PDO($dsn, $un, $pwd);
            $sql 	= "DELETE FROM Usuario WHERE id = :cod";
            $stmt 	= $pdo->prepare($sql);
            $stmt->bindParam(':cod', $cod, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode('Congratulations the record ' . $email . ' was removed');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;
   }

?>