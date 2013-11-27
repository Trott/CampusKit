Then(/^I should see an input with "(.*?)"$/) do |text|
    should have_selector('input[value^="' + text + '"]')
end