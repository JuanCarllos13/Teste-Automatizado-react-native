import { render, screen } from "@testing-library/react-native";
import { NextDays } from "./index";
import clearDay from "@assets/clear_day.svg";

describe("Component: NextDays", () => {
  it("should be render day", () => {
    render(
      <NextDays
        data={[
          {
            day: "18/07",
            min: "30",
            max: "34",
            icon: clearDay,
            weather: "Ceu limpo",
          },
          {
            day: "10/07",
            min: "30",
            max: "34",
            icon: clearDay,
            weather: "Ceu limpo",
          },
        ]}
      />
    );

    expect(screen.getByText("18/07")).toBeTruthy();
  });
});
