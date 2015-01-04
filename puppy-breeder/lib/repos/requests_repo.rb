class PuppyBreeder::Repos::Requests < PuppyBreeder::Repos::Repo
  def initialize
    super
    create_table
  end

  def create_table
    command = %{
      CREATE TABLE IF NOT EXISTS requests (
        id SERIAL PRIMARY KEY,
        type TEXT,
        customer TEXT,
        complete BOOLEAN,
        price INTEGER
      );
    }

    @db.exec(command)
  end

  def drop_table
    command = <<-SQL
      DROP TABLE requests
    SQL

    @db.exec(command)
  end

  def add(params) #type, customer
    breed = PuppyBreeder.breeds_repo.get(params[:type])
    return nil if not breed

    command = <<-SQL
      INSERT INTO requests(type,customer,complete,price)
      VALUES ($1,$2,$3,$4)
      RETURNING id;
    SQL

    id = @db.exec(command, [params[:type],params[:customer],params[:complete] || false,breed.price]).first
    id["id"]
  end

  def complete(id)
    command = <<-SQL
      UPDATE requests
      SET complete = true
      WHERE id = $1
      RETURNING *;
    SQL
    result = @db.exec(command,[id]).first
    return nil unless result
    requestify(result)
  end

  def get_completed
    command = <<-SQL
      SELECT * FROM requests
      WHERE complete = true;
    SQL
    result = @db.exec(command);
    result.map {|v| requestify(v) }
  end

  def get_pending
    command = <<-SQL
      SELECT * FROM requests
      WHERE complete = false;
    SQL
    result = @db.exec(command);
    result.map {|v| requestify(v) }  
  end

  def get_by_id(id)
    command = <<-SQL
      SELECT * FROM requests
      WHERE id = $1
      LIMIT 1;
    SQL
    result = @db.exec(command,[id]).first
    return nil unless result
    requestify(result)
  end

  def requestify(params)
    if params['complete'] == "f"
      params['complete'] = false
    else
      params['complete'] = true
    end
      
    PuppyBreeder::PurchaseRequest.new(params)
  end

end