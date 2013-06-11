# encoding: utf-8

Given(/^my localStorage is empty$/) do
	visit "/"
	execute_script('localStorage.clear()')
	visit "http://google.com/"
end

Given(/I visit the Shuttle Trip Planner page/) do
	visit "/shuttle/planner"
end

Then(/^I should see the route "([^"]*)"$/) do |value|
	find(:xpath, "//select[@id = '#{id}']/option[text() = '#{value}']").should be_selected
end

Given(/^I select a route "(.*?)"$/) do |value|
    find(:xpath, "//option[text() = '#{value}']").click
end

Then(/^I select "([^"]*)"$/) do |value|
    select(value)
end

Then(/^I route the trip$/) do
	click_button('Route Trip')
end

And(/^I reverse the trip$/) do
	click_button('↑↓')
end

Then(/^I should see "(.*?)"$/) do |text|
    should have_text(text)
end

Then(/^"(.*?)" should not be disabled$/) do |arg1|
  find(:xpath, "//fieldset[@name='datetime']")[:disabled].should_not eq "true"
end

Given(/^I select "(.*?)" for "(.*?)"$/) do |value, name|
  select(value, :from => name)
end