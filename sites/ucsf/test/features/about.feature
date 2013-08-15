Feature: About

Scenario: Basic About screen content
  Given I am on the home page
  And I click "About"
  And I should see "CampusKit"
  And I should see "UCSF Library"