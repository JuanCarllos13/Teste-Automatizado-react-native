import { mockWeatherAPIResponse } from "@__tests__/mocks/api/mockWeatherByService";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@__tests__/utils/customRender";
import { api } from "@services/api";
import { Dashboard } from ".";
import { saveStorageCity } from "@libs/asyncStorage/cityStorage";
import { mockCityApiResponse } from "@__tests__/mocks/api/mockCityApiResponse";

describe("Screen: Dashboard", () => {
  beforeAll(async () => {
    const city = {
      name: "Manaus",
      id: "1",
      latitude: 123,
      longitude: 345,
    };

    await saveStorageCity(city);
  });

  it("should be show city weather", async () => {
    jest.spyOn(api, "get").mockResolvedValue({ data: mockWeatherAPIResponse });

    render(<Dashboard />)

    const cityName = await waitFor(() => screen.findByText(/Manaus/i));

    expect(cityName).toBeTruthy();
  });

  it("should be show another selected weather city", async () => {
    jest
      .spyOn(api, "get")
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse })
      .mockResolvedValueOnce({ data: mockCityApiResponse })
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse });

    render(<Dashboard />);

    waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

    const cityName = "São Paulo";
    await waitFor(() =>
      act(() => {
        const search = screen.getByTestId("search-input");

        fireEvent.changeText(search, cityName);
      })
    );

    await waitFor(() =>
      act(() => {
        fireEvent.press(screen.getByText(cityName, { exact: false }));
      })
    );

    expect(screen.getByText(cityName, { exact: false })).toBeTruthy();
  });
});
