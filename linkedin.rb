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

# This is the query for the jobs page
# driver.get "https://www.linkedin.com/jobs/search/?keywords=software%20engineer&location=San%20Francisco%20Bay%20Area&locationId=us%3A84"

driver.get "https://www.linkedin.com/search/results/people/?company=&facetGeoRegion=%5B%22us%3A84%22%5D&firstName=A&lastName=&origin=FACETED_SEARCH&school=&title=CTO"

results = driver.find_element(:xpath, "//a[@href='/in']")
print results


driver.quit
