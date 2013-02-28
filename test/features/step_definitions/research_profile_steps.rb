Given /I am on a Research Profile page/ do
  visit "/research/?fno=Richard.Schneider%40ucsf.edu"
end

Then /I should see the Research Profile page/ do
  should have_selector("#ctsi-publications")
  should have_selector("#ctsi-keywords")
  should have_content("Recent Publications")
  should have_content("Research Interests")
end