module Api
  class EventsController < ApplicationController
    before_action :set_event, only: [:update, :destroy, :complete]

    def index
      render json: Event.order(sort_by + ' ' + order)
    end

    def search
  		query = params[:query]
  		events = Event.where('name LIKE ?',
                       		 "%#{query}%")
  		render json: events
    end

    def create
      event = Event.new(event_params)
      if event.save
        render json: event
      else
      render nothing: true, status: :bad_request
      end
    end

    def destroy
      @event.destroy
      head :no_content
    end

    def update
      if @event.update(event_params)
        render json: @event
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    def complete
      @event.update_attributes(complited: true)
      render json: @event
    end

    private

    def event_params
      params.require(:event).permit(:name, :event_date, :description, :priority, :complited)
    end

    def set_event
      @event = Event.find(params[:id])
    end

    def sort_by
      %w(name
        event_date
        description
        priority).include?(params[:sort_by]) ? params[:sort_by] : 'name'
    end

    def order
      %w(asc desc).include?(params[:order]) ? params[:order] : 'asc'
    end
  end
end