Feature: News feed
  In order to read news
  The users
  Should be able to visit a news page

Scenario: News page
  Given my localStorage is empty
  And I visit a news page
  Then I should see news items

Scenario: News page via Lightning Touch hash
  Given my localStorage is empty
  And I visit the news hash
  Then I should see news items

Scenario: News page via home screen navigation
  Given my localStorage is empty
  And I am on the home page
  And I click "News"
  Then I should see news items

Scenario: Pharmacy News via News page
  Given my localStorage is empty
  And I visit a news page
  And I click "Pharmacy News"
  Then I should see School of Pharmacy News

Scenario: Pharmacy News via Lightning Touch hash
  Given my localStorage is empty
  And I visit the news hash
  And I click "Pharmacy News"
  Then I should see School of Pharmacy News

Scenario: Pharmacy News via Native iOS page's Lightning Touch hash
  Given my localStorage is empty
  And I am on the Native iOS home page
  And I click "News"
  And I click "Pharmacy News"
  Then I should see School of Pharmacy News
