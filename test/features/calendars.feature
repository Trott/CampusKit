Feature: Calendars
  In order to stay abreast of events around campus
  The users
  Should be able to visit calendars

Scenario: Events Calendar
  Given my localStorage is empty
  And I am on the home page
  And I click "Events"
  Then I should see the Events calendar