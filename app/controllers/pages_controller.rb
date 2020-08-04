class PagesController < ApplicationController
  before_action :set_page, only: [:show]

  # GET /pages/1
  # GET /pages/1.json
  def show
    if @page.present?
      render :show
    else
      page = Page.create(url: params[:url])
      redirect_to "/#{params[:url]}"
    end
  end

  # POST /pages
  # POST /pages.json
  def create
    @page = Page.new(page_params)

    respond_to do |format|
      if @page.save
        format.html { redirect_to @page, notice: 'Page was successfully created.' }
        format.json { render :show, status: :created, location: @page }
      else
        format.html { render :new }
        format.json { render json: @page.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pages/1
  # PATCH/PUT /pages/1.json
  def update
    respond_to do |format|
      if @page.update(page_params)
        format.html { redirect_to @page, notice: 'Page was successfully updated.' }
        format.json { render :show, status: :ok, location: @page }
      else
        format.html { render :edit }
        format.json { render json: @page.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_page
      @page = Page.find_by_url(params[:url])
    end

    # Only allow a list of trusted parameters through.
    def page_params
      params.require(:page).permit(:url)
    end
end
