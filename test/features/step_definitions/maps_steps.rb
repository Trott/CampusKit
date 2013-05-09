Then(/^"(.*?)" should not be empty$/) do |selector|
  should have_selector(selector + ' div')
end