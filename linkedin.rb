require 'rubygems'
require 'selenium-webdriver'
require 'io/console'
require_relative 'config'

driver = Selenium::WebDriver.for :chrome

driver.get "https://www.linkedin.com/"
wait = Selenium::WebDriver::Wait.new(timeout: 3)

email_input = nil
wait.until do
  email_input = driver.find_element(:id, "login-email")
end
password_input = nil
wait.until do
  password_input = driver.find_element(:id, "login-password")
end

email_input.send_keys(ENV['email'])
password_input.send_keys(ENV['password'])
driver.find_element(:id, "login-submit").click


driver.quit
