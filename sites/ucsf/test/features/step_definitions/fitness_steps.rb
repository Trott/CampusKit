Given(/^I visit the Fitness page$/) do
 	visit "#/fitness"
end

Then(/^I should see the Fitness menu$/) do
 	expect(find("h2", :text => "Fitness")).to be_visible
end

Then(/^I should see the Fitness search box$/) do
	expect(find("input#ucsf-fitness-search")).to be_visible
end

Given(/^I search for "(.*?)"$/) do |search_terms|
	fill_in "ucsf-fitness-search", :with => search_terms
end

Given(/^I filter for "(.*?)"$/) do |label|
  	select label
end