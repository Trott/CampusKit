Then /I should see the (.*) calendar/ do | calendar |
  should have_content(calendar)
end