require_relative '../../spec_helper.rb'

describe Songify::Repos::Songs do
  before(:each) do
    subject.drop_table
    subject.create_table
  end

  before(:all) do
    Songify.albums_repo.create("An Album","1985","Jazz","image url")
  end

  describe "#add" do
    it "adds a new song and assigns it to an album" do
      subject.add("Something","2","link","1")
      result = subject.list_all_for_album("1")[0]

      expect(result.name).to eq("Something")
      expect(result.number).to eq("2")
      expect(result.youtube_link).to eq("link")
    end
  end

  describe "#list_all_for_album" do
    it "returns [] if there are no songs for the album" do
      subject.add("Something","2","link","1")
      result = subject.list_all_for_album("2")

      expect(result).to eq([])
    end
  end

  describe "#list_all" do
    it "lists all songs, regardless of album" do
      Songify.albums_repo.create("An Album","1985","Jazz","image url")
      subject.add("Something","2","link","1")
      subject.add("Something","2","link","2")
      result = subject.list_all

      expect(result.length).to eq(2)
    end

    it "returns [] for no songs" do
      result = subject.list_all
      expect(result).to eq([])
    end
  end
end