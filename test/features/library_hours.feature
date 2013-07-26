Feature: Library Hours
  In order to know when to go to the library
  The users
  Should be able to see the library's hours

Scenario: Parnassus library hours
  Given I am on the home page
  And I click "Library"
  And I click "Hours and Locations"
  And I click "Parnassus"
  Then I should see "am - "
  And I should see "pm"