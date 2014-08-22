# encoding: utf-8

Given(/^my localStorage is empty$/) do
    visit "/"
    execute_script('localStorage.clear()')
    visit "http://google.com/"
end

Given(/I visit the Shuttle Trip Planner page/) do
    visit "#/shuttle/planner"
end

Then(/^I should see "(.*?)" selected$/) do |value|
    expect(find(:xpath, "//option[text() = '#{value}']")).to be_selected
end

Given(/^I select a route "(.*?)"$/) do |value|
    find(:xpath, "//option[text() = '#{value}']").click
end

Then(/^I route the trip$/) do
    click_button('Route Trip')
end

And(/^I reverse the trip$/) do
    click_button('↑↓')
end

Then(/^I should see "(.*?)"$/) do |text|
    expect(self).to have_text(text)
end

Then(/^"(.*?)" should not be disabled$/) do |arg1|
    expect(find(:xpath, "//fieldset[@name='datetime']")[:disabled]).not_to eq "true"
end

Given(/^I select "(.*?)" for "(.*?)"$/) do |value, name|
    select(value, :from => name)
end
