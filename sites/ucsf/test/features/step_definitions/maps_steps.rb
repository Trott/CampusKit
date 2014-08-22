Then(/^"(.*?)" should not be empty$/) do |selector|
  expect(self).to have_selector(selector + ' div')
end