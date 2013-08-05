Feature: About

Scenario: Basic About screen content
  Given I am on the home page
  And I click "About"
  Then I should see "About UCSF Mobile"
  And I should see "Feedback"
  And I should see "CampusKit"
