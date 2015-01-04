class AddVideoReferenceToComments < ActiveRecord::Migration
  def change
    add_reference :comments, :video, index: true
  end
end
