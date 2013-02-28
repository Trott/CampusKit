Feature: Fitness

Scenario: Fitness page
  Given my localStorage is empty
  And I visit the Fitness page
  Then I should see the Fitness menu

Scenario: Fitness page via Lightning Touch hash
  Given my localStorage is empty
  And I visit the Fitness hash
  Then I should see the Fitness menu

Scenario: Fitness page via home screen navigation
  Given my localStorage is empty
  And I am on the home page
  And I click "Fitness"
  Then I should see the Fitness menu