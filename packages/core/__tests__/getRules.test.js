import getRules from '../getRules';

describe('core/getRules', () => {
  test('Build rules for color inputs', () => {
    expect(getRules('color', {})).toMatchSnapshot();
  });

  test('Build rules for number inputs', () => {
    expect(
      getRules('number', {
        required: true,
        min: '0',
        max: '2',
      }),
    ).toMatchSnapshot();
    expect(
      getRules('range', {
        min: '0',
        max: '2',
      }),
    ).toMatchSnapshot();
  });

  test('Build rules for dates inputs with valid props', () => {
    expect(
      getRules('date', {
        min: '2018-01-03',
        max: '2018-05-03',
      }),
    ).toMatchSnapshot();
    expect(
      getRules('time', {
        min: '14:59',
        max: '23:00',
      }),
    ).toMatchSnapshot();
    expect(
      getRules('datetime-local', {
        max: '2019-02-28T23:59',
      }),
    ).toMatchSnapshot();
    expect(
      getRules('week', {
        min: '2019-W01',
        max: '2019-W53',
      }),
    ).toMatchSnapshot();
    expect(
      getRules('month', {
        min: '2019-01',
      }),
    ).toMatchSnapshot();
  });

  test('Fail to build rules for dates inputs with invalid props', () => {
    expect(() =>
      getRules('date', {
        max: '2018-2-03',
      }),
    ).toThrowErrorMatchingSnapshot();
    expect(() =>
      getRules('time', {
        min: '24:00',
      }),
    ).toThrowErrorMatchingSnapshot();
    expect(() =>
      getRules('datetime-local', {
        max: '2019-02-28T24:00',
      }),
    ).toThrowErrorMatchingSnapshot();
    expect(() =>
      getRules('week', {
        min: '2019-W65',
      }),
    ).toThrowErrorMatchingSnapshot();
    expect(() =>
      getRules('month', {
        max: '2019-15',
      }),
    ).toThrowErrorMatchingSnapshot();
  });

  test('Build rules for email inputs', () => {
    expect(
      getRules('email', {
        multiple: true,
      }),
    ).toMatchSnapshot();
    expect(
      getRules('email', {
        pattern: '.+@gmail.com',
      }),
    ).toMatchSnapshot();
  });

  test('Build rules for text inputs', () => {
    expect(
      getRules('text', {
        pattern: '\\w+',
      }),
    ).toMatchSnapshot();
  });

  test('Build rules for select inputs', () => {
    expect(getRules('select', {})).toMatchSnapshot();
  });
});
