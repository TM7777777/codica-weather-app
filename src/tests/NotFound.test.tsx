import { render, screen } from "@testing-library/react";
import { NotFound } from "../components/NotFound/NotFound";

test("NotFound page test", () => {
  render(<NotFound />);
  const linkElement = screen.getByText("That page doesn't exist!");
  expect(linkElement).toBeInTheDocument();
});
