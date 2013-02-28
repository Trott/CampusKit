require 'rspec/expectations'
require 'capybara'
require 'test/unit/assertions'
require 'selenium/webdriver'

World(Test::Unit::Assertions)

Capybara.ignore_hidden_elements = true

Capybara.app_host = ENV['BASE_URL'] ? ENV['BASE_URL'].sub(/\/+$/,'') : "http://localhost"

Capybara.default_wait_time = 5;

Capybara.register_driver :iphone do |app|
    Capybara::Selenium::Driver.new(app, :browser => :iphone)
end

if ENV['BROWSER'] == 'firefox' then
    page = Capybara::Session.new(:selenium)
else
    page = Capybara::Session.new(:iphone)
end

World do
    page
end