//@ts-ignore
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import WellBeing from "./index";
import "@testing-library/jest-dom/vitest";

describe("WellBeing Component", () => {
  const mockCloseModal = vi.fn(); // Mocking the closeModal function

  it("renders without crashing and displays initial text", () => {
    const { unmount } = render(<WellBeing closeModal={mockCloseModal} />); // Render the component

    // Check if the main heading is present
    const heading = screen.getByText(/wellbeing check-in/i);
    expect(heading).toBeInTheDocument();

    // Check if the initial prompt text is present
    const promptText = screen.getByText(/hello! how are you feeling today\?/i);
    expect(promptText).toBeInTheDocument();
    unmount();
  });

  it("disables the continue button when no mood is selected", () => {
    const { unmount } = render(<WellBeing closeModal={mockCloseModal} />);
    const continueButton = screen.getByTestId("continue-button");
    expect(continueButton).toBeDisabled();
    unmount();
  });

  it("enables the continue button when a mood is selected", () => {
    const { unmount } = render(<WellBeing closeModal={mockCloseModal} />);
    const moodCard = screen.getByText(/fantastic/i); // Assuming "Fantastic" is one of the moods
    fireEvent.click(moodCard); // Simulate selecting a mood
    const continueButton = screen.getByTestId("continue-button");
    expect(continueButton).toBeEnabled();
    unmount();
  });

  it("displays the selected mood and changes the prompt text after clicking continue", () => {
    const { unmount } = render(<WellBeing closeModal={mockCloseModal} />);

    const moodCard = screen.getByText(/alright/i); // Select a mood
    fireEvent.click(moodCard);

    const continueButton = screen.getByTestId("continue-button");
    fireEvent.click(continueButton); // Simulate clicking continue

    const thanksText = screen.getByText(/thanks for the answer!/i);
    expect(thanksText).toBeInTheDocument();
    expect(screen.getByText(/alright/i)).toBeInTheDocument(); // Check if selected mood is displayed
    unmount();
  });

  it("closes the modal when the close button is clicked", () => {
    const { unmount } = render(<WellBeing closeModal={mockCloseModal} />);
    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);
    expect(mockCloseModal).toHaveBeenCalled(); // Ensure closeModal is called
    unmount();
  });

  it("closes the modal when the back button is clicked", () => {
    const { unmount } = render(<WellBeing closeModal={mockCloseModal} />);
    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);
    expect(mockCloseModal).toHaveBeenCalled(); // Ensure closeModal is called
    unmount();
  });
});
