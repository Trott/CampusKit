Given(/I am on a Research Profile page for "(.*)"$/) do |id|
  visit "/#/research/" + id
end

Then(/I should see the Research Profile page/) do
  should have_content("Publications")
  should have_content("Research Interests")
end