Given(/I am on a Research Profile page for "(.*)"$/) do |id|
  visit "/#/research/" + id
end

Then(/I should see the Research Profile page/) do
  expect(self).to have_content("Publications")
  expect(self).to have_content("Research Interests")
end