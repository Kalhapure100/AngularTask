In the angular machine test i have created three component home,registeration page and profile page.
When a user clicks on the "Register" button on the home page, it should trigger an action to open the registration form.
The registration form should include fields for uploading a photo, selecting age using a UI slider, typing interests with the option to remove tags, and entering other necessary information (like first name, address, etc.) with validation.
Upon successful submission of the registration form, the entered data should be sent to the UserService to save it in the db.json file.
After successful registration, the user should be redirected to the profile screen.
The profile screen should display the user's data retrieved from the UserService.
The user should have the ability to edit their profile by clicking on an "Edit Profile" button. This action should populate the profile screen with editable fields containing the user's existing data.
The user should be able to change their photo by clicking an "Edit Photo" button. This action should allow them to upload a new photo, which should also be saved in the db.json file via the UserService.

