require_relative '../../spec_helper.rb'

describe Songify::Repos::Playlists do
  before(:each) do
    subject.drop_table
    subject.create_table
  end

  before(:all) do
    Songify.albums_repo.create("An Album","1985","Jazz","image url")
    Songify.songs_repo.add("First","1","link1","1")
    Songify.songs_repo.add("Second","2","link2","1")
    Songify.songs_repo.add("Third","3","link3","1")
  end

  describe "#list_all" do
    it "returns [] if there are no playlists" do
      result = subject.list_all
      expect(result).to eq([])
    end
  end

  describe "#create" do
    it "creates a new playlist" do
      subject.create("Playlist 1")
      all = subject.list_all
      playlist = subject.get_by_id("1")

      expect(all.length).to eq(1)
      expect(playlist.name).to eq("Playlist 1")
    end
  end

  describe "#get_by_id" do
    it "returns nil if the playlist does not exist" do
      result = subject.get_by_id(4)
      expect(result).to eq(nil)
    end
  end

  describe "#add_song_to" do
    it "adds songs to the playlist" do
      subject.create("Playlist 1")
      subject.add_song_to(1,1)
      result = Songify.songs_repo.list_all_for_playlist(1)

      expect(result.length).to eq(1)

      subject.add_song_to(1,2)
      result = Songify.songs_repo.list_all_for_playlist(1)

      expect(result.length).to eq(2)
    end
  end

end