export const mockSettings = {
  currencies: [
    { code: "USD", name: 'US Dollar', symbol: "$", coinValues: [0.01, 0.05, 0.1, 0.25, 0.5, 1] },
    { code: "EUR", name: 'Euro', symbol: "€", coinValues: [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2] }
  ],
  products: [
    {
      description:
        "Jelly Belly Sizzling Cinnamon jelly beans in a 16 oz re-sealable bag. Portable and convenient size for candy.",
      id: 1,
      name: "Cinnamon Jelly Beans",
      price: {
        USD: 0.49,
        EUR: 0.44
      },
      quantity: 5
    },
    {
      description:
        "Jelly Belly Very Cherry jelly beans in a 16 oz re-sealable bag. Portable and convenient size for candy. Made with real cherry juice.",
      id: 2,
      name: "Very Cherry Jelly Beans",
      price: {
        USD: 0.49,
        EUR: 0.44
      },
      quantity: 5
    },
    {
      description:
        "Jelly Belly Juicy Pear jelly beans in a 16 oz re-sealable bag. Portable and convenient size for candy. Made with pear juice from concentrate.",
      id: 3,
      name: "Juicy Pear Jelly Beans",
      price: {
        USD: 0.49,
        EUR: 0.44
      },
      quantity: 5
    },
    {
      description:
        "Jelly Belly Mango Tango jelly beans in a 16 oz re-sealable bag. Portable and convenient size for candy. Made with real mango juice from mango puree concentrate.",
      id: 4,
      name: "Mango Tango Jelly Beans",
      price: {
        USD: 0.49,
        EUR: 0.44
      },
      quantity: 0
    }
  ]
};
