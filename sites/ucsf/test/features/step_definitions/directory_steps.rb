Given(/^I enter "(.*?)"$/) do |value|
    first("input").set(value)
    sleep
end

Given(/^I click the "(.*?)" button$/) do |text|
    click_button(text)
end

Then(/^I should not see "(.*?)"$/) do |text|
    should have_no_content(text)
end

Then(/^I go back$/) do
    evaluate_script('window.history.back()')
end

Then(/^I should see a "(.*?)" URL$/) do |arg1|
    should have_xpath("//a[@href='tel:+1 415 476-9831']");
end
