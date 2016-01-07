require 'sinatra'
require 'nokogiri'
require 'json'

get '/room/:id' do
  # return web page
end

get '/schedule/:id' do
  data = IO.read("schedule_#{params[:id]}.json")
  data
end

get '/status/:id' do
  data = IO.read("status_#{params[:id]}.json")
  data
end

get '/' do
	send_file 'public/index.html'
end

# shortcut for POST on /customers
post '/customers' do
  status, headers, body = call env.merge("PATH_INFO" => '/customers/')
  [status, headers, body.map(&:upcase)]
end
