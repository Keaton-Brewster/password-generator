03-hw-assignment3
====
### Password Generator

Home work assignment #3 was to set up the logic for a password generator that used the following criteria:

>GIVEN I need a new, secure password    
>WHEN I click the button to generate a password    
>THEN I am presented with a series of prompts for password criteria    
>WHEN prompted for password criteria    
>THEN I select which criteria to include in the password    
>WHEN prompted for the length of the password    
>THEN I choose a length of at least 8 characters and no more than 128 characters    
>WHEN prompted for character types to include in the password    
>THEN I choose lowercase, uppercase, numeric, and/or special characters    
>WHEN I answer each prompt    
>THEN my input should be validated and at least one character type should be selected    
>WHEN all prompts are answered    
>THEN a password is generated that matches the selected criteria    
>WHEN the password is generated    
>THEN the password is either displayed in an alert or written to the page    

Here is where I note that, while I have satisfied all the criteria, I have not done it in the exact way described.    
Notable changes that I chose to make include:    
* Using checkboxes to determine which character-sets would be used in the generation of the password, instead of JS confirms.      
* Using a range input (slider) to set the desired length of the password, instead of a JS prompt      

While these changes do make it such that the criteria given is not met exactly, I took my own liberty to improve over all user-experience by avoiding the use of JS prompts and confirms.





View deployed version here: https://keaton-brewster.github.io/03-hw-assignment3/