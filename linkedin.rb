require 'rubygems'
require 'selenium-webdriver'
require 'io/console'
require_relative 'config'

class GetProfilePages

  def initialize
    @driver = Selenium::WebDriver.for :chrome
    @wait = Selenium::WebDriver::Wait.new(timeout: 3)
    @names = Hash.new
    @links = []
  end

  def login_to_linkedin
    @driver.get "https://www.linkedin.com/"

    email_input = nil
    @wait.until do
      email_input = @driver.find_element(:id, "login-email")
    end
    password_input = nil
    @wait.until do
      password_input = @driver.find_element(:id, "login-password")
    end

    email_input.send_keys(ENV['email'])
    password_input.send_keys(ENV['password'])
    @driver.find_element(:id, "login-submit").click
  end

  def scrape_profiles
    @driver.get "https://www.linkedin.com/search/results/people/?company=&facetGeoRegion=%5B%22us%3A84%22%5D&firstName=A&lastName=&origin=FACETED_SEARCH&school=&title=CTO"
    find_peeps
  end

  def find_peeps
    (0...5000).step(200) do |i|
      @driver.execute_script("scroll(0,#{i})")
      results = @driver.find_elements(:class, "search-result__info")
      results.each do |res|
        if !@names[res.text]
          @names[res.text] = true
          @links << @driver.find_element(:class, 'search-result__result-link').attribute('href')
        end
      end
    end
    next_button = @driver.find_elements(:class, "next")
    if next_button.length > 0
      next_button[0].click
      sleep(1)
      find_peeps
    end
  end

  # def quit_driver
  #   @driver.quit
  # end

  def run
    login_to_linkedin
    scrape_profiles
    find_peeps
    @links
  end

end

class GetCompanyLinkedinPage
  def initialize
    # @profile_links = GetProfilePages.new.run
    @profile_links = ['https://www.linkedin.com/in/cpgatling/']
    @company_pages = []
    @wait = Selenium::WebDriver::Wait.new(timeout: 3)
    @driver = Selenium::WebDriver.for :chrome
    @company_links = []
    run
  end

  def login_to_linkedin
    @driver.get "https://www.linkedin.com/"

    email_input = nil
    @wait.until do
      email_input = @driver.find_element(:id, "login-email")
    end
    password_input = nil
    @wait.until do
      password_input = @driver.find_element(:id, "login-password")
    end

    email_input.send_keys(ENV['email'])
    password_input.send_keys(ENV['password'])
    @driver.find_element(:id, "login-submit").click
  end


  def loop_thru_links
    @profile_links.each do |link|
      @driver.get link
      sleep(2)
      scrape_user_profile_page
    end
  end

  def scrape_user_profile_page
    first = true
    (0...5000).step(200) do |i|
      @driver.execute_script("scroll(0,#{i})")
        if first
          @company_pages << @driver.find_element(:xpath, "//a[@data-control-name='background_details_company']").attribute('href')
          first = false
        end
    end
  end

  def loop_over_co_pages
    @company_pages.each do |page|
      puts "I ran"
      @driver.get page
      scrape_company_page
    end
  end

  def scrape_company_page
    @company_links << @driver.find_element(:class, 'org-about-us-company-module__website').attribute('href')
  end

  def run
    login_to_linkedin
    loop_thru_links
    loop_over_co_pages
    print @company_links
  end

end

GetCompanyLinkedinPage.new
