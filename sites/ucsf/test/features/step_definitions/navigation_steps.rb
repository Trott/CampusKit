Then(/^I should not see the "(.*?)" button$/) do |arg1|
  have_no_selector("button", :text => "Back")
end

Then(/^I should see the "(.*?)" button$/) do |arg1|
  expect(find("button", :text => "Back")).to be_visible
end
