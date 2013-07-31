Then(/I should see the "(.*)" calendar/) do | calendar |
  find('h2', :text => calendar).should be_visible
end