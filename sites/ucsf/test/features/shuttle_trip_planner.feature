Feature: Shuttle Trip Planner
  In order to delight the users
  The users
  Should be able to have their last shuttle trip saved

Scenario: Remember Last Trip
  Given my localStorage is empty
  And I visit the Shuttle Trip Planner page
  Then I should see "From Parnassus Campus" selected
  And I should see "To Mission Bay Campus" selected
  And I select a route "From Mt. Zion"
  And I select a route "To 654 Minnesota"
  And I route the trip
  Then I should see "Suggested Routes"
  And I visit the Shuttle Trip Planner page
  Then I should see "From Mt. Zion" selected
  And I should see "To 654 Minnesota" selected

Scenario: Remember Reversed Trip
  Given my localStorage is empty
  And I visit the Shuttle Trip Planner page
  Then I should see "From Parnassus Campus" selected
  And I should see "To Mission Bay Campus" selected
  And I select a route "From Mt. Zion"
  And I select a route "To 654 Minnesota"
  And I route the trip
  Then I should see "Suggested Routes"
  And I reverse the trip
  And I route the trip
  Then I should see "Suggested Routes"
  And I visit the Shuttle Trip Planner page
  Then I should see "From 654 Minnesota" selected
  And I should see "To Mt. Zion" selected

Scenario: Show Multiple Shuttles
  Given I visit the Shuttle Trip Planner page
  And I select a route "From 16th St. BART"
  And I select a route "To Mission Center Building"
  And I select "Depart at" for "when"
  And I select "6:15 AM" for "time"
  And I route the trip
  Then I should see "Red"
  And I should see "Yellow"

Scenario: Optimal Route From Mission Bay To Buchanan Dental Center
  Given I am on the home page
  And I click "Shuttle"
  And I click "Trip Planner"
  And I select a route "From Mission Bay Campus"
  And I select a route "To Buchanan Dental Center"
  And I select "Depart at" for "when"
  And I select "9:00 AM" for "time"
  And I route the trip
  Then I should see "Red"

Scenario: Optimal Route From Buchanan Dental Center To Mission Bay
  Given I am on the home page
  And I click "Shuttle"
  And I click "Trip Planner"
  And I select a route "From Buchanan Dental Center"
  And I select a route "To Mission Bay Campus"
  And I select "Depart at" for "when"
  And I select "9:00 AM" for "time"
  And I route the trip
  Then I should see "Red"

Scenario: Plans don't break back button
  Given I am on the home page
  And I click "Shuttle"
  And I click "Trip Planner"
  And I select "Depart at" for "when"
  And I select "9:00 PM" for "time"
  And I select a route "From Parnassus Campus"
  And I select a route "To Mission Bay Campus"
  And I route the trip
  Then I should see "Suggested Routes"
  And I should not see "Red"
  And I should see "Grey"
  And I select "9:00 AM" for "time"
  And I select a route "From Mission Center Building"
  And I select a route "To 16th St. BART"
  And I route the trip
  Then I should see "Suggested Routes"
  And I should see "Red"
  And I should not see "Grey"
  And I go back
  Then I should see "Grey"
  And I should not see "Red"

Scenario: Time and Date buttons enabled on routes that aren't "Leave Now"
  Given I am on the home page
  And I click "Shuttle"
  And I click "Trip Planner"
  And I select "Arrive by" for "when"
  And I route the trip
  Then I should see "Suggested Routes"
  And "datetime" should not be disabled

Scenario: Route impossible trip, then route possible trip
  Given I am on the home page
  And I click "Shuttle"
  And I click "Trip Planner"
  And I select a route "From Mission Center Building"
  And I select a route "To Mission Center Building"
  And I select "Depart at" for "when"
  And I select "9:00 AM" for "time"
  And I route the trip
  Then I should see "No options found"
  And I select a route "To Mission Bay Campus"
  And I route the trip
  Then I should see "Red"
  And I should not see "No options found"

Scenario: Do not show the same shuttle in multiple guises due to directional hack in the planner
  Given I am on the home page
  And I click "Shuttle"
  And I click "Trip Planner"
  And I select a route "From 16th St. BART"
  And I select a route "To Mission Center Building"
  And I select "Depart at" for "when"
  And I select "10:15 AM" for "time"
  And I route the trip
  Then I should see "10:25 AM - 10:30 AM"
  And I should not see "10:25 AM - 10:50 AM"