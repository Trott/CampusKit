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
  Then I should see a "tel:+1 415 476-9831" URL

Scenario: Search by name and department
  Given I am on the home page
  And I click "Directory"
  Then I should see "Person Search"
  And I enter "Richard dept:Library"
  And I click the "Search" button
  Then I should see "Search Results"
  And I should see "Trott"

Scenario: Search by name and multi-word department
  Given I am on the home page
  And I click "Directory"
  Then I should see "Person Search"
  And I enter "Ann dept:"Emergency Department""
  And I click the "Search" button
  Then I should see "Search Results"
  And I should see "MC3-Emergency Department"
  And I should not see "Surgery"

Scenario: Hyphenated and apostrophenated names
  Given I am on the home page
  And I click "Directory"
  Then I should see "Person Search"
  And I enter "O'Brien-Jonsson"
  And I click the "Search" button
  Then I should see "Bonnie O'Brien-Jonsson"

Scenario: Profile images
  Given I am on the home page
  And I click "Directory"
  Then I should see "Person Search"
  And I enter "Rich Schneider"
  And I click the "Search" button
  Then I should see "Search Results"
  And I click "Richard Schneider"
  Then I should see a profile photo

Scenario: Profile link
  Given I am on the home page
  And I click "Directory"
  Then I should see "Person Search"
  And I enter "Anirvan Chatterjee"
  And I click the "Search" button
  Then I should see "Search Results"
  And I click "Anirvan Chatterjee"
  And I click "Research Profile"
  Then I should see "Full Research Profile"
