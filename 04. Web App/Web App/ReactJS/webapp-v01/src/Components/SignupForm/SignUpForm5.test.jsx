import { getBirthDateFromNIC, validateNICAndBirthday } from './SignUpForm5';


// Unit tests for getBirthDateFromNIC function
describe('getBirthDateFromNIC', () => {
  test('getBirthDateFromNIC - old NIC format1 (male)', () => {
    expect(getBirthDateFromNIC('681070249V')).toBe('1968-04-16');
  });

  test('getBirthDateFromNIC - old NIC format2 (male)', () => {
    expect(getBirthDateFromNIC('681070249v')).toBe('1968-04-16');
  });

  test('getBirthDateFromNIC - old NIC format1 (female)', () => {
    expect(getBirthDateFromNIC('926234567V')).toBe('1992-05-02');
  });

  test('getBirthDateFromNIC - old NIC format2 (female)', () => {
    expect(getBirthDateFromNIC('926234567v')).toBe('1992-05-02');
  });

  test('getBirthDateFromNIC - new NIC format (male)', () => {
    expect(getBirthDateFromNIC('196810700249')).toBe('1968-04-16');
  });

  test('getBirthDateFromNIC - new NIC format (female)', () => {
    expect(getBirthDateFromNIC('199262300123')).toBe('1992-05-02');
  });

  test('getBirthDateFromNIC - invalid NIC format1', () => {
    expect(getBirthDateFromNIC('123')).toBe(null);
  });

  test('getBirthDateFromNIC - invalid NIC format2', () => {
    expect(getBirthDateFromNIC('DFDSF')).toBe(null);
  });

  test('getBirthDateFromNIC - invalid NIC format3', () => {
    expect(getBirthDateFromNIC(',/]$#@$@%')).toBe(null);
  });

  test('getBirthDateFromNIC - invalid NIC format4', () => {
    expect(getBirthDateFromNIC('1234568794562')).toBe(null);
  });

  test('getBirthDateFromNIC - old NIC format (male) without V', () => {
    expect(getBirthDateFromNIC('681070249')).toBe(null);
  });

  test('getBirthDateFromNIC - old NIC format (female)  without V', () => {
    expect(getBirthDateFromNIC('926234567')).toBe(null);
  });

  test('getBirthDateFromNIC - new NIC format (male) with invalid character', () => {
    expect(getBirthDateFromNIC('1968107$00249')).toBe(null);
  });

  test('getBirthDateFromNIC - new NIC format (female) with invalid character', () => {
    expect(getBirthDateFromNIC('199262&300123')).toBe(null);
  });

  test('getBirthDateFromNIC - old NIC format2 (male) with invalid character', () => {
    expect(getBirthDateFromNIC('681070%249v')).toBe(null);
  });

  test('getBirthDateFromNIC - old NIC format1 (female) with invalid character', () => {
    expect(getBirthDateFromNIC('92623*4567V')).toBe(null);
  });
});

// Unit tests for getBirthDateFromNIC function
describe('validateNICAndBirthday', () => {
  test('validateNICAndBirthday - old NIC format1 (male)', () => {
    expect(validateNICAndBirthday('681070249V', '1968-04-16')).toBe(true);
  });

  test('validateNICAndBirthday - old NIC format2 (male)', () => {
    expect(validateNICAndBirthday('681070249v', '1968-04-16')).toBe(true);
  });

  test('validateNICAndBirthday - old NIC format1 (female)', () => {
    expect(validateNICAndBirthday('926234567V', '1992-05-02')).toBe(true);
  });

  test('validateNICAndBirthday - old NIC format2 (female)', () => {
    expect(validateNICAndBirthday('926234567v', '1992-05-02')).toBe(true);
  });

  test('validateNICAndBirthday - new NIC format (male)', () => {
    expect(validateNICAndBirthday('196810700249', '1968-04-16')).toBe(true);
  });

  test('validateNICAndBirthday - new NIC format (female)', () => {
    expect(validateNICAndBirthday('199262300123', '1992-05-02')).toBe(true);
  });

  test('validateNICAndBirthday - invalid NIC format1', () => {
    expect(validateNICAndBirthday('926234567V', '1992-06-02')).toBe(false);
  });

  test('validateNICAndBirthday - invalid NIC format2', () => {
    expect(validateNICAndBirthday('681070249v', '1968-04-15')).toBe(false);
  });

  test('validateNICAndBirthday - invalid NIC format3', () => {
    expect(validateNICAndBirthday('19681045700249', '1968-04-16')).toBe(false);
  });

  test('validateNICAndBirthday - invalid NIC format4', () => {
    expect(validateNICAndBirthday('19920123', '1992-05-02')).toBe(false);
  });

  test('validateNICAndBirthday - invalid NIC format5', () => {
    expect(validateNICAndBirthday('DFDSF', '1992-05-02')).toBe(false);
  });

  test('validateNICAndBirthday - invalid NIC format6', () => {
    expect(validateNICAndBirthday(',/]$#@$@%', '1992-05-02')).toBe(false);
  });

  test('validateNICAndBirthday - new NIC format (male) with invalid character', () => {
    expect(validateNICAndBirthday('1968107$00249', '1968-04-16')).toBe(false);
  });

  test('validateNICAndBirthday - new NIC format (female) with invalid character', () => {
    expect(validateNICAndBirthday('199262&300123', '1992-05-02')).toBe(false);
  });

  test('validateNICAndBirthday - old NIC format (male) with invalid character', () => {
    expect(validateNICAndBirthday('681070%249v', '1968-04-16')).toBe(false);
  });

  test('validateNICAndBirthday - old NIC format (female) with invalid character', () => {
    expect(validateNICAndBirthday('92623*4567V', '1992-05-02')).toBe(false);
  });
});

