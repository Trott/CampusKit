Given /^I visit the Fitness page$/ do
  visit "/fitness"
end

Then /^I should see the Fitness menu$/ do
  find("h2", :text => "Fitness").should be_visible
end