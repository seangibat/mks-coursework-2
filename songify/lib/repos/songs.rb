class Songify::Repos::Songs < Songify::Repos::Repo

  def initialize
    super
    drop_table
    create_table
  end

  def create_table
    command = <<-SQL
      CREATE TABLE IF NOT EXISTS songs (
        id SERIAL PRIMARY KEY,
        name TEXT,
        number INTEGER,
        youtube_link TEXT,
        album_id INTEGER REFERENCES albums (id) ON DELETE CASCADE
      );
    SQL
    result = @db.exec(command)
  end

  def drop_table
    command = "DROP TABLE songs CASCADE;"
    result = @db.exec(command)
  end

  def add(name, number, youtube_link, album_id)
    return nil unless (name && number && youtube_link && album_id)

    command = <<-SQL
      INSERT INTO songs (name,number,youtube_link,album_id)
      VALUES($1,$2,$3,$4)
      RETURNING id;
    SQL
    @db.exec(command, [name, number, youtube_link, album_id])
  end

  def list_all_for_album(album_id)
    command = <<-SQL
      SELECT * FROM songs WHERE album_id = $1;
    SQL
    results = @db.exec(command, [album_id])
    encode_results_list(results)
  end

  def list_all_for_playlist(playlist_id)
    command = <<-SQL
      SELECT * FROM songs 
      INNER JOIN playlist_songs ON songs.id = playlist_songs.id
      WHERE playlist_id = $1;
    SQL
    results = @db.exec(command, [playlist_id])
    encode_results_list(results)
  end

  def list_all
    command = <<-SQL
      SELECT * FROM songs;
    SQL
    results = @db.exec(command)
    encode_results_list(results)
  end

  def delete(song_id)
    command = <<-SQL 
      DELETE FROM songs
      WHERE id = $1;
    SQL
    @db.exec(command, [song_id])
  end

  def update(song_id, name, number, youtube_link)
    command = <<-SQL
      UPDATE songs
      SET name = $2, number = $3, youtube_link = $4
      WHERE id = $1;
    SQL
    @db.exec(command, [playlist_id, name, number, youtube_link])
  end

  def encode_results_list(results)
    results.map {|v| encode_song_object(v)}
  end

  def encode_song_object(result)
    Songify::Song.new(result)
  end
end