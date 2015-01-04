class PuppyBreeder::Repos::Puppies < PuppyBreeder::Repos::Repo

  def initialize
    super
    create_table
  end

  def create_table
    command = %{
      CREATE TABLE IF NOT EXISTS puppies (
        id SERIAL PRIMARY KEY,
        type TEXT,
        name TEXT
      );
    }
    result = @db.exec(command)
  end

  def drop_table
    command = <<-SQL
      DROP TABLE puppies;
    SQL
    result = @db.exec(command)
  end

  def add(type,name)
    command = <<-SQL
      INSERT INTO puppies (type, name)
      VALUES ($1,$2)
      returning *;
    SQL
    result = @db.exec(command, [type,name]).first
    puppify(result)
  end

  def remove(type)
    command = <<-SQL
      DELETE FROM puppies WHERE type = $1
      AND id IN (SELECT id FROM puppies WHERE type = $1 LIMIT 1)
      RETURNING *;
    SQL
    result = @db.exec(command, [type]).first
    return nil if not result
    puppify(result)
  end

  def count(type)
    command = <<-SQL
      SELECT id FROM puppies WHERE puppies.type = $1;
    SQL
    result = @db.exec(command, [type])
    result.values.length
  end

  def puppify(params)
    PuppyBreeder::Puppy.new(params)
  end

end