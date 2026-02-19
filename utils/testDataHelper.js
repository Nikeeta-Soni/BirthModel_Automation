// @ts-check

/**
 * Generates a unique email address using a timestamp suffix.
 * Ensures no two test runs collide on the same email.
 * @param {string} prefix - The local-part prefix before the timestamp
 * @returns {string} A unique email, e.g. mathew_1708123456789@yopmail.com
 */
export function generateUniqueEmail(prefix = 'testuser') {
  const timestamp = Date.now();
  return `${prefix}_${timestamp}@yopmail.com`;
}

/**
 * Central test data object used by all test specs.
 * Email is generated fresh on each test run to avoid
 * "Email Address already exist!" errors.
 */
/**
 * Generates a fresh set of contact form data for each test run.
 * @returns {{ name: string, email: string, subject: string, message: string }}
 */
export function generateContactData() {
  const timestamp = Date.now();
  return {
    name: `Test User ${timestamp}`,
    email: `contact_${timestamp}@yopmail.com`,
    subject: `Test Inquiry ${timestamp}`,
    message: `This is an automated test message generated at ${new Date(timestamp).toISOString()}. Please disregard.`,
  };
}

export const TEST_USER = {
  name: 'Mathew Smith',
  email: generateUniqueEmail('mathew'),
  password: 'mathew@123',
  dob: {
    day: '17',
    month: 'March',
    year: '2001',
  },
  address: {
    firstName: 'Mathew',
    lastName: 'Smith',
    company: 'Mathew Inc Pvt Ltd',
    address: 'Address',
    address2: 'home',
    country: 'India',
    state: 'Maharashtra',
    city: 'Mumbai',
    zipcode: '556494',
    mobile: '9876452599',
  },
};
