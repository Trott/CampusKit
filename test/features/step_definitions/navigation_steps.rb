Then(/^I should not see the "(.*?)" button$/) do |arg1|
  have_no_selector("button", :text => "Back")
end

Then(/^I should see the "(.*?)" button$/) do |arg1|
  find("button", :text => "Back").should be_visible
end
