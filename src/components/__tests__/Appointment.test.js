import React from "react";
import { render } from "@testing-library/react";
import Appointment from "components/Appointment";


describe("Appointment", () => {

  test.skip("renders without crashing", () => {
    render(<Appointment />);
  });
  
});