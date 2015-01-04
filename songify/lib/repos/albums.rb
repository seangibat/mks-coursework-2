class Songify::Repos::Albums < Songify::Repos::Repo

  def initialize
    super
    drop_table
    create_table
  end

  def create_table
    command = <<-SQL
      CREATE TABLE IF NOT EXISTS albums (
        id SERIAL PRIMARY KEY,
        title TEXT,
        year INTEGER,
        genre TEXT,
        image_url TEXT
      );
    SQL
    @db.exec(command)
  end

  def drop_table
    command = "DROP TABLE albums CASCADE;"
    @db.exec(command)
  end

  def list_all
    command = <<-SQL
      SELECT * FROM albums;
    SQL
    results = @db.exec(command)
    encode_results_list(results)
  end

  def get_by_id(id)
    command = <<-SQL
      SELECT * FROM albums WHERE id = $1;
    SQL
    results = @db.exec(command, [id])
    return nil if !results.first
    encode_album_object(results.first)
  end

  def create(title, year, genre, image_url)
    return nil unless (title && year && genre && image_url)

    command = <<-SQL
      INSERT INTO albums (title, year, genre, image_url)
      VALUES ($1,$2,$3,$4)
      RETURNING id;
    SQL
    @db.exec(command, [title, year, genre, image_url])   
  end

  def delete(album_id)
    command = <<-SQL
      DELETE FROM albums
      WHERE id = $1;
    SQL
    @db.exec(command, [album_id])
  end

  def update(album_id, title, year, genre, image_url)
   command = <<-SQL
     UPDATE albums
     SET title = $2, year = $3, genre = $4, image_url = $5
     WHERE id = $1;
   SQL
   @db.exec(command, [album_id, title, year, genre, image_url]) 
  end

  def encode_results_list(results)
    results.map {|v| encode_album_object(v)}
  end

  def encode_album_object(result)
    Songify::Album.new(result)
  end
end