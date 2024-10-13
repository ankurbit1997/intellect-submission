import { render, screen } from "@testing-library/react";
import Scheduler from "./index";
import "@testing-library/jest-dom/vitest";

describe("Scheduler Component", () => {
  beforeEach(() => {
    render(<Scheduler />);
  });
  it("renders without crashing and displays initial text", () => {
    // Check if the main heading is present
    const heading = screen.getByText(/pick a date/i);
    expect(heading).toBeInTheDocument();

    // Check if the sub heading text is present
    const subTitle = screen.getByText(/available time slots/i);
    expect(subTitle).toBeInTheDocument();

    const infoText = screen.getByText(/each session lasts for 30 minutes/i);
    expect(infoText).toBeInTheDocument();
  });

  it("renders without crashing and displays initial text", () => {
    // const { unmount } = render(<Scheduler />); // Render the component

    // Check if the main heading is present
    const heading = screen.getByText(/pick a date/i);
    expect(heading).toBeInTheDocument();

    // Check if the sub heading text is present
    const subTitle = screen.getByText(/available time slots/i);
    expect(subTitle).toBeInTheDocument();

    const infoText = screen.getByText(/each session lasts for 30 minutes/i);
    expect(infoText).toBeInTheDocument();
    // unmount();
  });

  //   it("moveRight is called when", () => {
  //     const { unmount } = render(<Scheduler />); // Render the component

  //     // Check if the main heading is present
  //     const heading = screen.getByText(/pick a date/i);
  //     expect(heading).toBeInTheDocument();

  //     // Check if the sub heading text is present
  //     const subTitle = screen.getByText(/available time slots/i);
  //     expect(subTitle).toBeInTheDocument();

  //     const infoText = screen.getByText(/each session lasts for 30 minutes/i);
  //     expect(infoText).toBeInTheDocument();
  //     unmount();
  //   });
});
