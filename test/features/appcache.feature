Feature: Appcache

Scenario: Home Screen has Appcache
    Given I am on the home page
    Then the appcache manifest should be set to "/appcache/manifest.appcache"	