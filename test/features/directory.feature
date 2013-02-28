Feature: Directory
  In order to find UCSF faculty and staff
  The users
  Should be able to look up individuals

Scenario: Directory result
  Given I am on the home page
  And I click "Directory"
  And I enter "Bridge" for "Last Name"
  And I click the "Search" button
  Then I should not see "<strong>"
  And I click "Mark Bridge"
  Then I should see "Mark Bridge"
