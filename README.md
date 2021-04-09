# PlanMyDay
A simple one day work planner

Author: Tomasz Siemion
Project: Plan My Day
LINK: https://rotosti.github.io/PlanMyDay/

This web app is a single day planner.  It uses the MomentJS API and jQuery.  MomentJS is used to get time and easily format it for the user to see, as well as for some calculations to determine the appropriate background color to the time blocks. 

The user can enter in any event/plan into the text area and click on the save button.  That will save what the person has in that specific time block to local storage.

The app dynamically creates the time blocks based on a few variables.  They are created using jQuery syntax and added on dynamically to the page.  When they are added to the page, the div container and the text area inside of each time block is also generated with a unique id for future reference.  The text area id's are stored in an array.

The app then verifies if there was any information in local storage which needs to be uploaded from previous time block saves and adds it to the appropriate time block.

The app uses 2 set timeouts.  One for updating the clock at the top of the page and the other to verify if the background colors of the text area needed to be updated based on time block.