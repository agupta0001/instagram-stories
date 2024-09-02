import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";

describe("Header", () => {
  const mockAvatar = "https://avatars.githubusercontent.com/u/27469926";
  const mockName = "John Doe";
  const mockCloseStory = jest.fn();

  it("should render avatar and name", () => {
    render(
      <Header avatar={mockAvatar} name={mockName} closeStory={mockCloseStory} />
    );

    const avatarImage = screen.getByAltText(`${mockName}'s avatar`);
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute(
      "src",
      expect.stringContaining(
        "/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F27469926&w=96&q=75"
      )
    );

    const nameText = screen.getByText(mockName);
    expect(nameText).toBeInTheDocument();
    expect(nameText).toHaveClass("text-white opacity-90 text-sm");
  });

  it("should trigger closeStory callback when close button is clicked", () => {
    render(
      <Header avatar={mockAvatar} name={mockName} closeStory={mockCloseStory} />
    );

    const closeButton = screen.getByAltText("Close Story");
    fireEvent.click(closeButton);

    expect(mockCloseStory).toHaveBeenCalledTimes(1);
  });
});
