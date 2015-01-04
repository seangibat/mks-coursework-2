class ChangeCommentToPoly < ActiveRecord::Migration
  def change
    change_table :comments do |t|
      t.references :commentable, polymorphic: true
      t.remove :video_id
    end
  end
end
