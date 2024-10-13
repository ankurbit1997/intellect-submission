import { fireEvent, render, screen } from "@testing-library/react";
import Scheduler from "./index";
import "@testing-library/jest-dom/vitest";
import mockData from "./../../mock.json";
import { groupSlotsByDate } from "../../helpers/utils";

describe("Scheduler Component", () => {
  beforeEach(() => {
    render(<Scheduler />);
    Object.defineProperty(HTMLElement.prototype, "scrollBy", {
      value: vi.fn(),
      writable: true,
    });
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

  it("renders available dates from mock data", () => {
    const formattedData = groupSlotsByDate(mockData);
    const formattedDataKeyArr = Object.keys(formattedData);

    const dateElements = screen.getAllByTestId("date-button");
    expect(dateElements.length).toBe(formattedDataKeyArr.length); // Ensure dates match the mock data length
  });

  it("allows the user to select a date", () => {
    //test for first date
    const dateButton = screen.getAllByTestId("date-button")[0];
    fireEvent.click(dateButton);
    expect(dateButton).toHaveClass("bg-gray-400"); // Ensure the selected date is highlighted
  });

  it("shows available time slots after selecting a date", () => {
    const firstDate = screen.getAllByTestId("date-button")[0];
    fireEvent.click(firstDate); // Select the first date

    const availableSlotsHeader = screen.getByText(/available time slots/i);
    expect(availableSlotsHeader).toBeInTheDocument(); // Check if available time slots are displayed
  });

  it("toggles time slots selection when clicked", () => {
    const firstDate = screen.getAllByTestId("date-button")[0];
    fireEvent.click(firstDate); // Select the first date

    const firstSlot = screen.getAllByTestId("slot-button")[0];
    fireEvent.click(firstSlot); // Select the first time slot

    expect(firstSlot).toHaveClass("bg-slate-500"); // Slot should be selected

    fireEvent.click(firstSlot); // Deselect the same time slot

    expect(firstSlot).not.toHaveClass("bg-slate-500"); // Slot should not be selected anymore
  });

  it("scrolls left and right when buttons are clicked", () => {
    const leftButton = screen.getByTestId("left-button");
    const rightButton = screen.getByTestId("right-button");

    fireEvent.click(leftButton);
    expect(window.HTMLElement.prototype.scrollBy).toHaveBeenCalledWith({
      left: -50,
      behavior: "smooth",
    });

    fireEvent.click(rightButton);
    expect(window.HTMLElement.prototype.scrollBy).toHaveBeenCalledWith({
      left: 50,
      behavior: "smooth",
    });
  });
});
