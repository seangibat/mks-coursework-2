require_relative '../spec_helper.rb'

describe PuppyBreeder::Repos::Requests do
  before(:each) do
    subject.drop_table
    subject.create_table
    PuppyBreeder.breeds_repo.set("Golden", 500)
  end

  describe "#add" do
    it "should add a purchase request and return an id" do
      id = subject.add({type:"Golden", customer:"Jack"})

      id.should_not == nil
    end

    it "should not add a purchase request if the breed price isn't set" do
      id = subject.add({type:"Lab", customer:"John"})

      id.should == nil
    end

    it "should set the price to the breed price and complete as false" do
      id = subject.add({type:"Golden", customer:"Andy"})
      request = subject.get_by_id(id)

      request.price.should == 500
      request.complete.should == false
      request.customer.should == "Andy"
      request.type.should == "Golden"
    end
  end

  describe "#get_by_id" do
    it "should return nil if the request does not exist" do
      result = subject.get_by_id(24)

      result.should == nil
    end
  end

  describe "#complete" do
    it "should change a request to complete" do
      id = subject.add({type:"Golden",customer:"Sam"})
      result = subject.complete(id)
      request = subject.get_by_id(id)

      result.should_not == nil
      request.complete.should == true
    end

    it "should return nil if the request doesn't exist" do
      result = subject.complete("2")

      result.should == nil
    end
  end

  describe "#get_completed" do
    it "should return a list of completed requests" do
      subject.add({type:"Golden",customer:"Sam", complete:true})
      subject.add({type:"Golden",customer:"Sam2", complete:true})
      subject.add({type:"Golden",customer:"Sam3", complete:false})
      result = subject.get_completed

      result.length.should == 2
    end

    it "should return an empty array if there are no complete requests" do
      result = subject.get_completed

      result.length.should == 0
    end
  end

  describe "#get_pending" do
    it "should return a list of pending requests" do
      subject.add({type:"Golden",customer:"Sam", complete:true})
      subject.add({type:"Golden",customer:"Sam2", complete:true})
      subject.add({type:"Golden",customer:"Sam3", complete:false})
      result = subject.get_pending

      result.length.should == 1
    end

    it "should return an empty array if there are no pending" do
      result = subject.get_pending

      result.length.should == 0
    end
  end


end