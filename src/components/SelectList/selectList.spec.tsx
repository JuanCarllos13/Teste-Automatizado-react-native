import { render, screen, fireEvent } from "@testing-library/react-native";
import { SelectList } from ".";

describe("Component: SelectList", () => {
  it("should be return city details selected", () => {
    const data = [
      { id: "1", name: "Manaus", longitude: 123, latitude: 123 },
      { id: "2", name: "Campinas", longitude: 1234, latitude: 1234 },
    ];

    const onPress = jest.fn();

    render(<SelectList data={data} onChange={() => {}} onPress={onPress} />);
    // Procurar com esse palavra, ignorando letra Maiúscula  e minusculá
    const selectedCity = screen.getByText(/Cam/i);

    fireEvent.press(selectedCity);

    expect(onPress).toBeCalledWith(data[1]);
  });

  it("Not should be show options when data props is empty", () => {
    render(<SelectList data={[]} onChange={() => {}} onPress={() => {}} />);

    const options = screen.getByTestId("options");

    expect(options.children).toHaveLength(0);
  });
});
