require 'uri'
require 'net/http'

class CourseController < ApplicationController
  def index
    render json: public_courses
  end

  def public_courses
    @public_courses ||= get_public_courses
  end

  def get_public_courses
    #   curl 'https://www.mysports.com/nox/public/v1/bookableitems/course?startDate=2022-01-19&endDate=2022-01-22&employeeIds=&organizationUnitIds=2' \
    headers = {
      'authority': 'www.mysports.com',
      'x-ms-web-context': '/studio/jiu-jitsu-schule-rahn',
      'x-nox-client-type': 'WEB',
      'content-type': 'application/json',
      'x-tenant': 'sportschule-rahn',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      'x-nox-web-context': '',
      'accept': '*/*',
      'sec-gpc': '1',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://www.mysports.com/studio/jiu-jitsu-schule-rahn/course',
      'accept-language': 'en-US,en;q=0.9',
    }

    start_date = Date.today.strftime '%F'
    # TODO: parameterize end date
    end_date = (Date.today + 6).strftime '%F'
    uri = URI(MY_SPORTS_GYM_BASE_URL + MY_SPORTS_COURSE_PATH)
    params = {
      :startDate => start_date,
      :endDate => end_date
    }
    uri.query = URI.encode_www_form(params)

    res = Net::HTTP.get_response(uri, headers)
    puts res.body if res.is_a?(Net::HTTPSuccess)
    res.body
  end
end
