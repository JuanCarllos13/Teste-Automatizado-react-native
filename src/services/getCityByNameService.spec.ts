import { mockCityApiResponse } from "@__tests__/mocks/api/mockCityApiResponse";
import { api } from "./api";

import { getCityByNameService } from "./getCityByNameService";

describe("API: getCityByNameService", () => {
  it("should return city details", async () => {
    jest.spyOn(api, "get").mockResolvedValue({
      data: mockCityApiResponse,
    });

    const response = await getCityByNameService("São Paulo");
    console.log(response);

    expect(response.length).toBeGreaterThan(0);
  });
});
