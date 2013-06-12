Feature: Shuttle Schedules
  In order to get users from place to place
  The users
  Should be able to read a shuttle schedule

Scenario: Show Direction
  Given my localStorage is empty
  And I am on the home page
  And I click "Shuttle"
  And I click "Shuttles By Route"
  And I click "Red"
  And I click "Mission Center Building"
  Then I should see "to 16th St. BART"
  And I should see "to Mission Bay"

Scenario: Get By Location
  Given I am on the home page
  And I click "Shuttle"
  And I click "Shuttles By Location"
  Then I should see "16th St. BART"
  And I should see "VA Medical Center"