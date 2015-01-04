class PuppyBreeder::Repos::Breeds < PuppyBreeder::Repos::Repo

  def initialize
    super
    create_table
  end

  def create_table
    command = %{
      CREATE TABLE IF NOT EXISTS breeds (
        id SERIAL PRIMARY KEY,
        type TEXT,
        price INTEGER
      );
    }
    @db.exec(command)
  end

  def drop_table
    command = <<-SQL
      DROP TABLE breeds
    SQL
    @db.exec(command)
  end

  def set(type, price)
    breed = breedify({type:type, price:price})
    if get(type) != nil
      command = <<-SQL
        UPDATE breeds
        SET price = $2
        WHERE type = $1;
      SQL
    else
      command = <<-SQL
        INSERT INTO breeds(type,price)
        VALUES ($1,$2);
      SQL
    end

    @db.exec(command, [type,price])
    breed
  end

  def get(type)
    command = <<-SQL
      SELECT * FROM breeds WHERE type = $1 LIMIT 1;
    SQL
    result = @db.exec(command, [type]).first
    return nil if not result
    breedify(result)
  end

  def breedify(params)
    PuppyBreeder::Breed.new(params)
  end

end