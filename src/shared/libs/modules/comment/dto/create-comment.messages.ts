export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 2024'
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  }
} as const;
