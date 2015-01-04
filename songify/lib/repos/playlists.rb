class Songify::Repos::Playlists < Songify::Repos::Repo

  def initialize
    super
    drop_table
    create_table
  end

  def create_table
    command = <<-SQL
      CREATE TABLE IF NOT EXISTS playlists (
        id SERIAL PRIMARY KEY,
        name TEXT
      );
      CREATE TABLE IF NOT EXISTS playlist_songs (
        id SERIAL PRIMARY KEY,
        playlist_id INTEGER REFERENCES playlists (id) ON DELETE CASCADE,
        song_id INTEGER REFERENCES songs (id) ON DELETE CASCADE
      );
    SQL
    result = @db.exec(command)
  end

  def drop_table
    command = "DROP TABLE playlists CASCADE; DROP TABLE playlist_songs CASCADE;"
    result = @db.exec(command)
  end

  def create(name)
    return nil unless (name)

    command = <<-SQL
      INSERT INTO playlists (name)
      VALUES($1)
      RETURNING id;
    SQL
    @db.exec(command, [name])
  end

  def list_all
    command = <<-SQL
      SELECT * FROM playlists;
    SQL
    results = @db.exec(command)
    encode_results_list(results)
  end

  def get_by_id(id)
    command = <<-SQL
      SELECT * FROM playlists WHERE id=$1;
    SQL
    result = @db.exec(command,[id])
    return nil if !result.first
    encode_playlist_object(result.first)
  end

  def add_song_to(playlist_id, song_id)
    return nil unless (song_id && playlist_id)

    command = <<-SQL
      INSERT INTO playlist_songs (playlist_id,song_id)
      VALUES($1,$2)
      RETURNING id;
    SQL
    @db.exec(command, [playlist_id, song_id])
  end

  def delete_song_from(playlist_id, song_id)
    command = <<-SQL
      DELETE FROM playlist_songs
      WHERE playlist_id = $1 AND
      song_id = $2;
    SQL
    @db.exec(command, [playlist_id, song_id])
  end

  def delete_playlist(playlist_id)
    command = <<-SQL
      DELETE FROM playlists
      WHERE id = $1;
    SQL
    @db.exec(command, [playlist_id])
  end

  def edit_playlist(playlist_id, new_name)
    command = <<-SQL
      UPDATE playlists
      SET name = $2
      WHERE id = $1;
    SQL
    @db.exec(command, [playlist_id, new_name])
  end

  def encode_results_list(results)
    results.map {|v| encode_playlist_object(v)}
  end

  def encode_playlist_object(result)
    Songify::Playlist.new(result)
  end

end