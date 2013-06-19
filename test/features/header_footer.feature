Feature: UCSF Header and Footer

Scenario: UCSF Header and Footer on About screen
  Given I am on the home page
  And I click "About"
  Then I should see "Mobile"
  And I should see the image "/img/ucsf-header-separator.png"
  And I should see "About"
  And I should see "University of California © 2010-13 UC Regents"
  And I should see "Feedback"
