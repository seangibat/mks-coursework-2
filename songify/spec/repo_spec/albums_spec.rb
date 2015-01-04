require_relative '../../spec_helper.rb'

describe Songify::Repos::Albums do
  before(:each) do
    subject.drop_table
    subject.create_table
  end

  describe "#create" do
    it "creates a new album" do
      subject.create("Something","1985","Jazz","image url")
      result = subject.get_by_id(1)
      allResults = subject.list_all

      expect(result.title).to eq("Something")
      expect(result.year).to eq("1985")
      expect(result.genre).to eq("Jazz")
      expect(result.image_url).to eq("image url")
      expect(allResults.length).to eq(1)
    end
  end

  describe "#get_by_id" do
    it "returns nil if the album does not exist" do
      result = subject.get_by_id(2)
      expect(result).to eq(nil)
    end
  end

  describe "#list_all" do
    it "returns a blank array if there are no albums" do
      result = subject.list_all
      expect(result).to eq([])
    end
  end
end