Given(/I visit a news page/) do
  visit '/news'
end

Then(/I should see news items/) do
  find('h2', :text => 'UCSF News').should be_visible
end

Then(/I should see School of Pharmacy News/) do
  find('h2', :text => 'UCSF School of Pharmacy News').should be_visible
end

And(/I click "([^"]*)"/) do |link_text|
  click_link(link_text)
end