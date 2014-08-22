Given(/I visit a news page/) do
  visit '#/news'
end

Then(/I should see news items/) do
  expect(find('h2', :text => 'UCSF News')).to be_visible
end

And(/I click "([^"]*)"/) do |link_text|
  click_link(link_text)
end