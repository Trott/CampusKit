Given(/^I visit the Fitness page$/) do
 	visit "/fitness"
end

Then(/^I should see the Fitness menu$/) do
 	find("h2", :text => "Fitness").should be_visible
end

Then(/^I should see the Fitness search box$/) do
	find("input#ucsf-fitness-search").should be_visible
end

Given(/^I search for "(.*?)"$/) do |search_terms|
	fill_in "ucsf-fitness-search", :with => search_terms
end

Given(/^I choose "(.*?)"$/) do |label|
  	choose label
end