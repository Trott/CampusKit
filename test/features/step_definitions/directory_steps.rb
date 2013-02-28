Given /^I enter "(.*?)" for "(.*?)"$/ do |text, field|
  fill_in(field, :with => text)
end

Given /^I click the "(.*?)" button$/ do |text|
  click_button(text)
end

Then /^I should not see "(.*?)"$/ do |text|
  should have_no_content(text)
end