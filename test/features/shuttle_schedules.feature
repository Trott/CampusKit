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

Scenario: Get timetable for E/R stop
  Given I am on the home page
  And I click "Shuttle"
  And I click "Shuttles By Route"
  And I click "VA"
  And I click "Parnassus E/R"
  Then I should see "Previous Day"
  And I should see "Next Day"
  Then I should not see "Trip Planner"
  And I should not see "Shuttles By Route"
  And I should not see "Shuttles By Location"

Scenario: Get shuttles for Surge/Woods
  Given I am on the home page
  And I click "Shuttle"
  And I click "Shuttles By Location"
  And I click "Surge/Woods"
  Then I should see "Bronze"
  And I should not see "Trip Planner"
  And I should not see "Shuttles By Route"
  And I should not see "Shuttles By Location"

Scenario: Show stop order
  Given I am on the home page
  And I click "Shuttle"
  And I click "Shuttles By Route"
  And I click "Gold"
  Then I should see "Parnassus - Mt. Zion - Mission Bay - SFGH"