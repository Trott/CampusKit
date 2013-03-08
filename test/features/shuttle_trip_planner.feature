Feature: Shuttle Trip Planner
  In order to delight the users
  The users
  Should be able to have their last shuttle trip saved

Scenario: Remember Last Trip
  Given my localStorage is empty
  And I visit the Shuttle Trip Planner page
  Then I should see the route "starting_from" "From Parnassus"
  And I should see the route "ending_at" "To Mission Bay (4th St.)"
  And I select a route "starting_from" "From Mt. Zion"
  And I select a route "ending_at" "To 654 Minnesota"
  And I route the trip
  And I visit the Shuttle Trip Planner page
  Then I should see the route "starting_from" "From Mt. Zion"
  And I should see the route "ending_at" "To 654 Minnesota"

Scenario: Remember Reversed Trip
  Given my localStorage is empty
  And I visit the Shuttle Trip Planner page
  Then I should see the route "starting_from" "From Parnassus"
  And I should see the route "ending_at" "To Mission Bay (4th St.)"
  And I select a route "starting_from" "From Mt. Zion"
  And I select a route "ending_at" "To 654 Minnesota"
  And I route the trip
  And I reverse the trip
  And I visit the Shuttle Trip Planner page
  Then I should see the route "starting_from" "From 654 Minnesota"
  And I should see the route "ending_at" "To Mt. Zion"

Scenario: Show Multiple Shuttles
  Given I visit the Shuttle Trip Planner page
  And I select a route "starting_from" "From 16th St. BART"
  And I select a route "ending_at" "To MCB"
  And I route the trip
  Then I should see "Red"
  And I should see "Yellow"

Scenario: Optimal Route From Mission Bay To 55 Laguna and Back
  Given I am on the home page
  And I click "Shuttle"
  And I click "Trip Planner"
  And I select a route "starting_from" "From Mission Bay (4th St.)"
  And I select a route "ending_at" "To 55 Laguna"
  And I route the trip
  Then I should see "Red"
  And I should not see "Grey"
  And I reverse the trip
  Then I should see "Red"
  And I should not see "Grey"