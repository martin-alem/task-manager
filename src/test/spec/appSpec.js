import Calculator from "../../js/app.js";

describe("Test Function", function(){

  let calculator = new Calculator(4,5);

  it("Should return the sum of two numbers", function(){
    expect(calculator.add()).toBe(9);
  });

  it("Should return the difference of two numbers", function(){
    expect(calculator.sub()).toBe(-1);
  })
});