Feature: Shuttle Schedules
  In order to get users from place to place
  The users
  Should be able to read a shuttle schedule

Scenario: Show Direction for Red Shuttle
  Given my localStorage is empty
  And I am on the home page
  And I click "Shuttle"
  And I click "Shuttles By Route"
  And I click "Red"
  And I click "Mission Center Building"
  Then I should see "to 16th St. BART"
  And I should see "to Mission Bay"

Scenario: Show Direction for Purple Shuttle
  Given my localStorage is empty
  And I am on the home page
  And I click "Shuttle"
  And I click "Shuttles By Route"
  And I click "Purple"
  And I click "3360 Geary"
  Then I should see "to Mt. Zion"
  And I should see "to Parnassus"

Scenario: Show Direction for Green Shuttle
  Given my localStorage is empty
  And I am on the home page
  And I click "Shuttle"
  And I click "Shuttles By Route"
  And I click "Green"
  And I click "Mission Bay (west side of street)"
  Then I should see "to China Basin"
  And I should see "to 654 Minnesota St."

Scenario: Do Not Show Duplicate Shuttles
  Given my localStorage is empty
  And I am on the home page
  And I click "Shuttle"
  And I click "Shuttles By Route"
  And I click "Red"
  And I click "16th St. BART"
  Then I should not see "to 16th St. BART"

Scenario: Get By Location
  Given I am on the home page
  And I click "Shuttle"
  And I click "Shuttles By Location"
  Then I should see "16th St. BART"
  And I should see "VA Medical Center"

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

Scenario: Show GPS-based predictions for Grey shuttle
  Given I am on the home page
  And I click "Shuttle"
  And I click "Shuttles By Route"
  And I click "Grey"
  And I click "401 Parnassus (LPPI)"
  Then I should see "GPS"
  And I should see "Shuttle in:"
  And I should see "minutes"

Scenario: Do not show stops that are drop-off only on Bronze route
  Given I am on the home page
  And I click "Shuttle"
  And I click "Shuttles By Route"
  And I click "Bronze"
  Then I should see "(LPPI)"
  And I should not see "(ACC)"
  And I should not see "Parnassus Library"

Scenario: Do not show "to Mission Bay" if we're at Mission Bay
  Given I am on the home page
  And I click "Shuttle"
  And I click "Shuttles By Route"
  And I click "Red"
  And I click "Mission Bay (east side of street)"
  Then I should see " PM"
  And I should see " AM"
  And I should not see "to Mission Bay"

Scenario: Show Mission Bay Hospital stop and shuttles
  Given I am on the home page
  And I click "Shuttle"
  And I click "Shuttles By Location"
  Then I should see "Mission Bay Hospital"
  And I click "Mission Bay Hospital"
  Then I should see "Blue"
  And I should see "Gold"
  And I should see "Grey"
