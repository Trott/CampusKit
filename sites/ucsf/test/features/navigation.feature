Feature: Navigation

Scenario: Back button
  Given I am on the home page
  Then I should not see the "Back" button
  And I click "Shuttle"
  Then I should see the "Back" button
  And I click the "Back" button
  Then I should see the home page
  And I should not see the "Back" button