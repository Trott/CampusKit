Feature: Maps
    In order to view maps
    The users
    Should be able to visit a maps page

Scenario: Map is not empty
    Given I am on the home page
    And I click "Maps"
    And I click "Parnassus"
    Then "#map_canvas" should not be empty

Scenario: Map Locations List
    Given I am on the home page
    And I click "Maps"
    And I click "Location List"
    Then I should see "Laurel Heights"