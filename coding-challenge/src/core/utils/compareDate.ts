export const compareDateEn = (currentHour: number) => currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternon' : 'Good evening'

export const compareDateFr = (currentHour: number) => currentHour < 18 ? 'Bonjour' : 'Bonsoir'
