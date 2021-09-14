import WLocalStorage from "../../js/model/LocalStorage.js";

describe("LocalStorage", function () {

  let wLocalStorage;
  beforeAll(function () {
    wLocalStorage = new WLocalStorage();
  });

  it("should add an item to the local storage", function(){
    expect(wLocalStorage.addData("test", "Test Data")).toBeTrue();
  });

  it("should get the correct data from the local storage", function(){
    expect(wLocalStorage.getData("test")).toEqual("Test Data");
  });

  it("should remove the item from the local storage", function(){
    expect(wLocalStorage.removeData("test")).toBeTrue();
  });
})

