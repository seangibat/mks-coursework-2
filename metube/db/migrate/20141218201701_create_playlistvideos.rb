class CreatePlaylistvideos < ActiveRecord::Migration
  def change
    create_table :playlistvideos do |t|
      t.references :video, index: true
      t.references :playlist, index: true

      t.timestamps
    end
  end
end
