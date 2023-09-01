import { render, screen } from "@testing-library/react-native";
import { Day } from "./index";
import clearDay from "@assets/clear_day.svg";

describe("Component: Day", () => {
  it("should be render day", () => {
    const { debug } = render(
      <Day
        data={{
          day: "18/07",
          min: "30",
          max: "34",
          icon: clearDay,
          weather: "Ceu limpo",
        }}
      />
    );

    expect(screen.getByText("18/07")).toBeTruthy();
  });
});
