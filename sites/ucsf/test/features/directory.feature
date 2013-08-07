Feature: Directory
  In order to find UCSF faculty and staff
  The users
  Should be able to look up individuals

Scenario: Directory result
  Given I am on the home page
  And I click "Directory"
  Then I should see "Person Search"
  And I enter "Bridge"
  And I click the "Search" button
  Then I should not see "<strong>"
  And I click "Mark Bridge"
  Then I should see "+1 415 476"

Scenario: Results don't break back button
  Given I am on the home page
  And I click "Directory"
  Then I should see "Person Search"
  And I enter "Bridge"
  And I click the "Search" button
  Then I should see "Search Results"
  And I click "Mark Bridge"
  Then I should see "+1 415 476"
  And I go back
  Then I should see "Person Search"

Scenario: Results include URL for telephone numbers
  Given I am on the home page
  And I click "Directory"
  Then I should see "Person Search"
  And I enter "Bridge"
  And I click the "Search" button
  Then I should see "Search Results"
  And I click "Mark Bridge"
  Then I should see a "tel:" URL

Scenario: Search by name and department
  Given I am on the home page
  And I click "Directory"
  Then I should see "Person Search"
  And I enter "Richard dept:Library"
  And I click the "Search" button
  Then I should see "Search Results"
  And I should see "Trott"