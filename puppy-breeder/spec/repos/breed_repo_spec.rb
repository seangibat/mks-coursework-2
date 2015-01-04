require_relative '../spec_helper.rb'

describe PuppyBreeder::Repos::Breeds do
  before (:each) do
    subject.drop_table
    subject.create_table
  end

  describe "#set" do
    it "sets a breed's price in storage and returns it" do
      result = subject.set("Golden", 500)
      result.type.should == "Golden"
      result.price.should == 500
    end
  end

  describe "#get" do
    it "returns nils when the breed does not exist" do
      result = subject.get('Wjwkjwrj')
      result.should == nil
    end

    it "returns a breed that has been stored" do
      subject.set("Terrier", 200)
      result = subject.get("Terrier")
      result.price.should == "200"
      result.type.should == "Terrier"
    end
  end

end