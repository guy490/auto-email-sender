# auto-email-sender

This program developed for create executable file for sending automaticly few files from differenct directories to your own email.

# Usage

You MUST fill the file `details.txt` with the existing template.
The template is going to be extended but for now there is 4 options:

- email and password are required for the sending email action.
- if you dont want to enter your oun real email details you can create a fake one and enter it in 'details.txt'
- you can create a fake one and enter it in 'details.txt', and make your own email address as destination

options:

     email - must
     password - must
     paths - must - MUST BE FULL PATHS
     destination - optional

- after every option must be entered a colon character `:` just like in the example below

The file `details.txt` MUST be saved NEAR the execution file.

     ~/some-folder
          execution-file.exe
          details.txt

# Downloads

If you are not interested in the code you can just download the execution files.
BE AWARE THAT YOU MUST CREATE `details.txt` file just like the above template.

MAC OS: [Download](https://ufile.io/a5gbn3ve)
LINUX OS:[Download](https://ufile.io/48ci250m)
WINDOWS OS:[Download](https://ufile.io/qhlfgtv0)

# Example

example of `details.txt` file:

     email: example@email.com
     password: example-password
     destination: destinationemail@email.com - optional
     paths: C:\Users\User\Desktop\FOLDER1,C:\Users\User\Desktop\FOLDER2,C:\Users\User\Desktop\FOLDER3, ...
