Given /^I am on the JS Unit Tests page$/ do 
    visit "/assets/test/js_unit/"
end

Then /I should see that all tests have passed/ do
    results = find_by_id('qunit-testresult')
    total = results.find('.total').text
    passed = results.find('.passed').text
    assert total==passed
end

Then /I should see that no tests have failed/ do
    results = find_by_id('qunit-testresult')
    failed = results.find('.failed').text
    assert failed=="0"
end

And /^I check the (.*) checkbox$/ do |checkbox|
    check(checkbox)
end

And /^I reload$/ do
    evaluate_script('window.location.reload()')
end
