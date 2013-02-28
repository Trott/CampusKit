Feature: Library News feed
  In order to read Library news
  The users
  Should be able to visit a Library news page

Scenario: News page
  Given my localStorage is empty
  And I visit the Library news page
  Then I should see the UCSF Library News header

Scenario: News page via navigation
  Given my localStorage is empty
  And I am on the home page
  And I click "Library"
  And I click "News"
  Then I should see the UCSF Library News header