export const UpdateOfferMessage = {
  title: {
    minLength: 'minimum title length is 10',
    maxLength: 'maximum title length is 100'
  },
  description: {
    minLength: 'minimum description length is 20',
    maxLength: 'maximum description length is 1024',
  },
  preview: {
    invalidFormat: 'preview is required',
    maxLength: 'too long for field image. Maximum length is 256'
  },
  placeType: {
    invalidFormat: 'PlaceType must be "Buy" or "Sell"',
  },
  price: {
    invalidFormat: 'price must be an integer',
    minValue: 'minimum price is 100',
    maxValue: 'maximum price is 20000'
  }
} as const;

