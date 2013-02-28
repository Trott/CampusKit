Given /^I visit the Library news page$/ do
  visit "/library/news/"
end

Then /^I should see the (.*) header$/ do | news_header |
  should have_content(news_header)
end