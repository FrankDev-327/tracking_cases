import { faker } from '@faker-js/faker';

export function generateAtuhData(override = {}) {
  return {
    identificationId: faker.string.alphanumeric(10),
    password: faker.internet.password(),
    ...override,
  };
}

export function generateTokenData() {
  return {
    access_token:
      'eyJzdWIiOiAiMTIzNDU2Nzg5MCIsICJuYW1lIjogIkpvaG4gRG9lIiwgImlhdCI6IDE1MTYyMzkwMjJ9',
  };
}
