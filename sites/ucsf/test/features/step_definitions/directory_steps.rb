Given(/^I enter "(.*?)"$/) do |value|
    first("input").set(value)
end

Given(/^I click the "(.*?)" button$/) do |text|
    click_button(text)
end

Then(/^I should not see "(.*?)"$/) do |text|
    expect(self).to have_no_content(text)
end

Then(/^I go back$/) do
    evaluate_script('window.history.back()')
end

Then(/^I should see a "(.*?)" URL$/) do |url|
    expect(self).to have_xpath("//a[@href='#{url}']");
end

Then(/^I should see a profile photo$/) do
  expect(self).to have_xpath("//img[contains(concat(' ',normalize-space(@class),' '),' profile-photo ')]")
end
