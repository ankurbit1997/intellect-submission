# Intellect Submission 

This repo has assignment of first two questions given for the round.



How to run the project locally
```js
1. Clone the Project 
2. yarn 
3. yarn dev

to run the test cases 
4. yarn test
```

1. WellBeing Widget 

   #Assumptions
 
   - The Widget pops up on clicking on Check-in Button
   - When Initially if user click on back icon Widget closes
   - Once user has selected any mood and clicked Continue the selected mood is shown
   - At this point back button takes user to selection state
   - Further additonal behaviour can be added as required
   - Smallest mobile size till which UI should fine is 340px however it wont break until 310px
   - Responsiveness is maintained by own understanding.


  #Features
   - This is Present in home i.e / URL
   - user can click Check in Button to check in the daily mood 
   - user will be shown 5 moods on a scale with respective UI
   - hover effect to show the hovered card
   - Selected State on the card
   - After Picking up the Mood user can click on Continue to Confirm the selection.
   - Responsive UI for phone/tablet/desktop.

   [Live Link 1](https://intellect-submission.vercel.app/)



2. Scheduler Component

   #Assumptions
 
   - The Component is There from the start as no back button or entry point was provided
   - User can select one Date at a time 
   - User can pick multiple slots for a single date at once 
   - if user changes date old selected picked time slots for other dates will be cleared
   - no further handling was seen in UI, only UI selection and deselction interactons are done.
   - Smallest mobile size till which UI should fine is 340px however it wont break until 310px
   - Responsiveness is maintained by own understanding.


  #Features
   - This submission is present in /2 URL endpoint. e.g localhost:3000/2
   - user can Change date and see available time slots
   - user can pick time slots for a date 
   - user can pick multiple slots for single day at once, not necessarily consecutive slots
   - hover effect to show the hovered slots
   - previously selected slots cleared on changing date.
   - Selected State on the slots
   - Responsive UI for phone/tablet/desktop.

   [Live Link 2](https://intellect-submission.vercel.app/2)





