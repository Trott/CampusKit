Feature: JS Unit Tests
  In order to insure against defects
  The team
  Should be able to run all JS unit tests successfully

Scenario: JS Unit tests
  Given I am on the JS Unit Tests page
  Then I should see that all tests have passed
  And I should see that no tests have failed

Scenario: JS code does not leak variables into global space
  Given I am on the JS Unit Tests page
  Then I should see that all tests have passed
  And I should see that no tests have failed
  And I check the noglobals checkbox
  Then I should see that all tests have passed
  And I should see that no tests have failed

Scenario: JS Unit tests have no side effects
  Given I am on the JS Unit Tests page
  Then I should see that all tests have passed
  And I should see that no tests have failed
  And I reload
  Then I should see that all tests have passed
  And I should see that no tests have failed