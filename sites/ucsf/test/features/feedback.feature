Feature: Feedback Forms
  In order to provide a high quality experience for users
  Users should be able to give us feedback

Scenario: UCSF Feedback Form
  Given I am on the home page
  And I click "Feedback"
  And I click "This App (UCSF)"
  Then I should see "Comments/Suggestions"

Scenario: Shuttle Feedback Form
  Given I am on the home page
  And I click "Feedback"
  And I click "Shuttle Service"
  Then I should see "Campus Life Services"