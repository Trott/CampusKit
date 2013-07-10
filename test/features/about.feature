Feature: About

Scenario: Basic About screen content
  Given I am on the home page
  And I click "About"
  Then I should see "UCSF Mobile"
  And I should see "About"
  And I should see "University of California © 2010-13 UC Regents"
  And I should see "Feedback"
  And I should see "CampusKit"
