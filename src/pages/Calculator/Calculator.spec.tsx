import React from "react";
import { shallow, mount, ShallowWrapper } from "enzyme";
import { Calculator } from "./Calculator";
import { calculatorManager } from "../../services/calculatorManager";
import { CalScreen } from "../../components/CalScreen/CalScreen";

describe("<Calculator />", () => {
  let wrapper: ShallowWrapper<{}>;

  beforeEach(() => {
    wrapper = shallow(<Calculator />);
    jest.clearAllMocks();
  });

  it("should pass the pressed value to the calculator manager", () => {
    jest.spyOn(calculatorManager, "update");
    wrapper
      .find({ text: "6" })
      .first()
      .dive()
      .simulate("click");
    expect(calculatorManager.update).toHaveBeenCalledWith(6);
  });

  it("should update what is shown on the cal screen on button press", () => {
    const component = mount(<Calculator />);
    component
      .find({ text: "6" })
      .first()
      .simulate("click");
    expect(component.find(CalScreen).props().text).toBe("6");
  });

  it("should be able to do headless calculations", () => {
    const component = mount(<Calculator />);
    component
      .find({ text: "6" })
      .first()
      .simulate("click");

    component
      .find({ text: "+" })
      .first()
      .simulate("click");

    component
      .find({ text: "2" })
      .first()
      .simulate("click");

    component
      .find({ text: "=" })
      .first()
      .simulate("click");

    expect(component.find(CalScreen).props().text).toBe("8");
  });
});
