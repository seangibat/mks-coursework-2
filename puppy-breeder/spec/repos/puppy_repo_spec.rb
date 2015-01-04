require_relative '../spec_helper.rb'

describe PuppyBreeder::Repos::Puppies do
  before(:each) do
    subject.drop_table
    subject.create_table
  end

  describe "#add" do
    it "adds a puppy and returns it" do
      result = subject.add("Mala", "Sharon")

      result.name.should == "Sharon"
      result.type.should == "Mala"
    end
  end

  describe "#count" do
    it "tells you the number of puppies of a type" do
      subject.add("Egg","Jack")
      subject.add("Egg","Jack")
      subject.add("Marma","Jack")
      result1 = subject.count("Egg")
      result2 = subject.count("Marma")
      result3 = subject.count("Mayhem")

      result1.should == 2
      result2.should == 1
      result3.should == 0
    end
  end

  describe "#remove" do
    it "removes a puppy and returns it" do
      subject.add("Golden", "Sammy")
      result = subject.remove("Golden") 

      result.type.should == "Golden"
      result.name.should == "Sammy"
    end

    it "does not remove more than one puppy" do
      subject.add("Golden", "Sammy")
      subject.add("Golden", "Sab")
      subject.remove("Golden")
      result = subject.count("Golden")

      result.should == 1
    end

  end
end