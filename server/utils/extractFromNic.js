function extractAgeAndGenderFromNIC(nic) {
  const dates = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let year, month, day, gender, threeDigitsForDays;

  const nicLength = nic.length;

  // Determine if NIC is old or new format
  const isOld = nicLength === 10;
  const hasV = /[vV]$/.test(nic);
  const isValidOldNIC = isOld && hasV;
  const isValidNewNIC = nicLength === 12 && (nic.startsWith('1') || nic.startsWith('2'));

  if (!isValidOldNIC && !isValidNewNIC) {
    throw new Error('Invalid NIC number');
  }

  if (isOld) {
    // Old NIC format: YYMMDDxxxxV
    year = 1900 + parseInt(nic.substring(0, 2), 10);
    threeDigitsForDays = parseInt(nic.substring(2, 5), 10);
  } else {
    // New NIC format: YYYYMMDDxxxx
    year = parseInt(nic.substring(0, 4), 10);
    threeDigitsForDays = parseInt(nic.substring(4, 7), 10);
  }

  // Determine gender and adjust days
  if (threeDigitsForDays > 500) {
    gender = 'Female';
    threeDigitsForDays -= 500;
  } else {
    gender = 'Male';
  }

  // Calculate month and day from threeDigitsForDays
  let totalDays = 0;
  for (let i = 0; i < dates.length; i++) {
    totalDays += dates[i];
    if (threeDigitsForDays <= totalDays) {
      month = i + 1;
      day = threeDigitsForDays - (totalDays - dates[i]);
      break;
    }
  }

  // Calculate age
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return {
    age,
    gender,
    birthDate: birthDate.toISOString().split('T')[0]  // Optional: Include birth date in YYYY-MM-DD format
  };
}

module.exports = extractAgeAndGenderFromNIC;
