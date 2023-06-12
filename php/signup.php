<?php
    session_start();
    include_once "config.php";
    $fname = mysqli_real_escape_string($conn, $_POST['fname']);
    $lname = mysqli_real_escape_string($conn, $_POST['lname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    if(!empty($fname) && !empty($lname) && !empty($email) && !empty($password)){
        // Now let's check the users email is valid or not
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            $sql = mysqli_query($conn, "SELECT email FROM users WHERE email = '{$email}'");
            if(mysqli_num_rows($sql) > 0){ // Checking if the email is already exist or not
                echo "$email - This email already exist!";
            }else{
                if(isset($_FILES['image'])){ // checking he file is uploaded or not
                    $img_name = $_FILES['image']['name']; // Getting uploaded image
                    $tmp_name = $_FILES['image']['tmp_name']; // This is temporary name that used to save file on ourfolders

                    // Exploding the image and getting the last  extension like jpg png
                    $img_explode = explode('.', $img_name);
                    $img_ext = end($img_explode); // Getting the extension

                    $extensions = ['png', 'jpeg', 'jpg']; // Extansions we gonna approve
                    if(in_array($img_ext, $extensions) === true){
                        $time = time(); // This will return current time
                        $new_img_name = $time.$img_name;

                        if(move_uploaded_file($tmp_name, "images/".$new_img_name)){
                            $status = "Active now"; // Once an user signed up then this status  will be active
                            $random_id = rand(time(), 10000000);

                            // Inserting all users data into the table 
                            $sql2 = mysqli_query($conn, "INSERT INTO users (unique_id, fname, lname, email, password, img, status) VALUES ({$random_id}, '{$fname}', '{$lname}', '{$email}', '{$password}', '{$new_img_name}', '{$status}')");
                            if($sql2){
                                $sql3 = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
                                if(mysqli_num_rows($sql3) > 0){
                                    $row = mysqli_fetch_assoc($sql3);
                                    $_SESSION['unique_id'] = $row['unique_id']; //using this session we used user unique_id in other php file 
                                    echo "success";
                                }
                            }else{
                                echo "Something went wrong!";
                            }
                        }
                        

                    }else{
                        echo "Please select an Image file - jpeg, jpg, png";
                    }
                    
                }else{
                    echo "Please select an Image file!";
                }
            }
        }else{
            echo "$email - This is not a valid email!";
        }
    }else{
        echo "All input fields are required!";
    }
?>