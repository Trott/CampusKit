Given(/^I am on the home page$/) do
  visit "/"
end

Then(/^I should see the home page$/) do
  expect(self).to have_selector("ol.front")
end

Then(/^I should see a link to "(.*?)"$/) do |href|
  expect(self).to have_selector(:xpath, "//a[@href='" + href + "']")
end
