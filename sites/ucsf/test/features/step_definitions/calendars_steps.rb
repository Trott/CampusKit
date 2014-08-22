Then(/I should see the "(.*)" calendar/) do | calendar |
  expect(find('h2', :text => calendar)).to be_visible
end