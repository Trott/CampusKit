Given(/^I am on the home page$/) do
  visit "/"
end

Then(/^I should see the home page$/) do
  should have_selector("ol.front")
  should have_selector("div#main")
end

Given(/^I am on the Native iOS home page$/) do
  visit "/nativeios.html"
end