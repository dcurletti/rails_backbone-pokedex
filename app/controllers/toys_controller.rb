class ToysController < ApplicationController

  def update
    @toy = Toy.find(params[:id])
    if @toy.update_attributes(toy_params)
      render "show"
    else
      render json: @toy.errors.full_messages, status: 422
    end
  end

  def show
    @toy = Toy.find(params[:id])
    render "show"
  end

  private
  def toy_params
    params.require(:toy).permit(:pokemon_id, :name, :price, :happiness, :image_url)
  end

end
