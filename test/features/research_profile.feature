Feature: Research Profile
  In order to ????
  The users
  Should be able to visit an individual's research profile

Scenario: Research Profile
  Given I am on a Research Profile page for "Richard.Schneider"
  Then I should see the Research Profile page

Scenario: Research Profile With No Narrative
  Given I am on a Research Profile page for "Judy.Yee"
  Then I should see "Publications"