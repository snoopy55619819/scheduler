import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  test("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  test("renders with initial student name", () => {
    const { getByTestId } = render(<Form interviewers={interviewers} student="Lydia Miller-Jones"/>)
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  test("validates that the student name is not blank", () => {
    const onSave = jest.fn();
  
    const { getByText} = render(
      <Form interviewers={interviewers} onSave={onSave} />
    )

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  test("calls onSave function when the name is defined", () => {
    const onSave = jest.fn();

    const { queryByText } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" onSave={onSave} />
    )

    fireEvent.click(queryByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

});