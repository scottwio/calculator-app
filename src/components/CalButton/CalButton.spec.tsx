import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { CalButton, Container, CalButtonProps } from "./CalButton";
import { FontMedium } from "../../styles/fonts";

describe("<CalButton />", () => {
  let props: CalButtonProps;
  let wrapper: ShallowWrapper<CalButtonProps>;

  beforeEach(() => {
    props = {
      text: "",
      value: 3,
      onClick: jest.fn()
    };
    wrapper = shallow(<CalButton {...props} />);
    jest.clearAllMocks();
  });

  it("should display the text from props", () => {
    wrapper.setProps({ text: "Hello" });
    expect(wrapper.find(FontMedium).text()).toBe("Hello");
  });

  it("should call the onClick function", () => {
    wrapper.setProps({ value: 10 });
    wrapper.find(Container).simulate("click");
    expect(props.onClick).toHaveBeenCalledWith(10);
  });
});
