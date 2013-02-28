Then /^the appcache manifest should be set to "(.+)"$/ do |manifest|
  should have_xpath("//html[@manifest=\"#{manifest}\"]")
end
