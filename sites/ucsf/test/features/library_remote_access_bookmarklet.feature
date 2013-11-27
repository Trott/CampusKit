Feature: Remote Access
  In order to access remote resources
  The users
  Should be able to install a JavaScript-based bookmarklet

Scenario: Remote access bookmarklet
  Given I am on the home page
  And I click "Library"
  And I click "Get Help"
  And I click "Get Full Text"
  Then I should see "EZProxy Bookmarklet"
  And I should see an input with "javascript:void"