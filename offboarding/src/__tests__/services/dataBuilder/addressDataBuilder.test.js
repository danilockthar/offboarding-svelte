import AddressDataBuilder from "../../../services/dataBuilder/addressDataBuilder";

describe('addressDataBuilder', () => {
  describe('initialValues method', () => {
    it('should give an object with all required keys empty', () => {
      const addressBuilder = new AddressDataBuilder();

      expect(addressBuilder.initialValues()).toEqual({
        province: '',
        city: '',
        street: '',
        streetNumber: '',
        postalCode: '',
        floor: '',
        apartment: '',
        neighborhood: '',
      });
    });

    it('should accept properties with default key names', () => {
      const addressBuilder = new AddressDataBuilder({
        province: 5,
        city: 3,
        street: 'Roca',
        streetNumber: 1400,
        postalCode: 1870,
        floor: 1,
        apartment: 'B',
        neighborhood: 4,
      });

      expect(addressBuilder.initialValues()).toEqual({
        province: 5,
        city: 3,
        street: 'Roca',
        streetNumber: 1400,
        postalCode: 1870,
        floor: 1,
        apartment: 'B',
        neighborhood: 4,
      });
    });

    it('should accept properties with alternative key names', () => {
      const addressBuilder = new AddressDataBuilder({
        provinceId: 5,
        cityId: 3,
        street: 'Roca',
        number: 1400,
        postalCode: 1870,
        floor: 1,
        apartment: 'B',
        neighborhoodId: 5,
      });

      expect(addressBuilder.initialValues()).toEqual({
        province: 5,
        city: 3,
        street: 'Roca',
        streetNumber: 1400,
        postalCode: 1870,
        floor: 1,
        apartment: 'B',
        neighborhood: 5,
      });
    });

    it('should accept defaultValues', () => {
      const addressBuilder = new AddressDataBuilder({}, {
        province: 9,
      });

      expect(addressBuilder.initialValues()).toEqual({
        province: 9,
        city: '',
        street: '',
        streetNumber: '',
        postalCode: '',
        floor: '',
        apartment: '',
        neighborhood: '',
      });
    });

    it('should not override actual values with defaultValues', () => {
      const addressBuilder = new AddressDataBuilder({
        province: 5,
      }, {
        province: 9
      });

      expect(addressBuilder.initialValues()).toEqual({
        province: 5,
        city: '',
        street: '',
        streetNumber: '',
        postalCode: '',
        floor: '',
        apartment: '',
        neighborhood: '',
      });
    });

    it('should give priority to key names with "Id" in it', () => {
      const addressBuilder = new AddressDataBuilder({}, {
        provinceId: 5,
        province: "Buenos Aires",
        city: 'Avellaneda',
        cityId: 8,
        neighborhood: 'Crucesita',
        neighborhoodId: 10,
      });

      expect(addressBuilder.initialValues()).toEqual({
        province: 5,
        city: 8,
        street: '',
        streetNumber: '',
        postalCode: '',
        floor: '',
        apartment: '',
        neighborhood: 10,
      });
    });
  });

  describe('payload method', () => {
    it('should accept properties with default key names', () => {
      const addressBuilder = new AddressDataBuilder({
        province: 5,
        city: 3,
        street: 'Roca',
        streetNumber: 1400,
        postalCode: 1870,
        floor: 1,
        apartment: 'B',
      });

      expect(addressBuilder.payload()).toEqual({
        provinceId: 5,
        cityId: 3,
        street: 'Roca',
        streetNumber: 1400,
        postalCode: 1870,
        floor: 1,
        interiorNumber: 'B',
      });
    });

    it('should accept properties with alternative key names', () => {
      const addressBuilder = new AddressDataBuilder({
        provinceId: 5,
        cityId: 3,
        street: 'Roca',
        number: 1400,
        postalCode: 1870,
        floor: 1,
        apartment: 'B',
      });

      expect(addressBuilder.payload()).toEqual({
        provinceId: 5,
        cityId: 3,
        street: 'Roca',
        streetNumber: 1400,
        postalCode: 1870,
        floor: 1,
        interiorNumber: 'B',
      });
    });

    it('should give priority to key names with "Id" if present', () => {
      const addressBuilder = new AddressDataBuilder({}, {
        provinceId: 5,
        province: "Buenos Aires",
        city: 'Avellaneda',
        cityId: 8,
        street: 'Roca',
        streetNumber: 1400,
        postalCode: 1870,
        floor: 1,
        apartment: 'B',
      });

      expect(addressBuilder.payload()).toEqual({
        provinceId: 5,
        cityId: 8,
        street: 'Roca',
        streetNumber: 1400,
        postalCode: 1870,
        floor: 1,
        interiorNumber: 'B',
      });
    });
  });
});