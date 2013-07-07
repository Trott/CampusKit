Feature: Fitness

Scenario: Fitness page
  Given my localStorage is empty
  And I visit the Fitness page
  Then I should see the Fitness menu

Scenario: Fitness page via home screen navigation
  Given my localStorage is empty
  And I am on the home page
  And I click "Fitness"
  Then I should see the Fitness menu
  And I should see "Sign up for a Class"

Scenario: Fitness schedule options
  Given my localStorage is empty
  And I am on the home page
  And I click "Fitness"
  Then I should see the Fitness menu
  And I click "Group Fitness and Pools"
  Then I should see "Parnassus"
  And I should see "Mission Bay"
  And I should see "Indoor Pool"
  And I should see the Fitness search box

Scenario: Fitness schedule search box
  Given my localStorage is empty
  And I am on the home page
  And I click "Fitness"
  And I click "Group Fitness and Pools"
  And I search for "Parnassus"
  Then I should not see "Mission Bay"

Scenario: Fitness schedule radio button filters
  Given my localStorage is empty
  And I am on the home page
  And I click "Fitness"
  And I click "Group Fitness and Pools"
  And I choose "mission-bay"
  Then I should not see "Parnassus"
