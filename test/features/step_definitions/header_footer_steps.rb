Then /^I should see the image "(.+)"$/ do |imgsrc|
  should have_xpath("//img[@src=\"#{imgsrc}\"]")
end

Then /^I should see "(.*?)" after the separator$/ do |arg1|
  pending # express the regexp above with the code you wish you had
end
