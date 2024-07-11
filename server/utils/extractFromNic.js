// extractFromNic.js
function extractAgeAndGenderFromNIC(nic) {
    let year, month, day, gender;
  
    // Check if NIC is in new or old format
    if (nic.length === 10) {
      // Old format: YYMMDDxxxxV
      year = parseInt(nic.substring(0, 2));
      month = parseInt(nic.substring(2, 5));
      day = parseInt(nic.substring(5, 7));
      
      // Adjust year for the century
      year = year > 50 ? 1900 + year : 2000 + year;
    } else if (nic.length === 12) {
      // New format: YYYYMMDDxxxx
      year = parseInt(nic.substring(0, 4));
      month = parseInt(nic.substring(4, 7));
      day = parseInt(nic.substring(7, 9));
    } else {
      throw new Error('Invalid NIC number');
    }
  
    // Determine gender
    if (month > 500) {
      gender = 'Female';
      month -= 500;
    } else {
      gender = 'Male';
    }
  
    // Calculate age
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    // Adjust age if the birth date hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  

    console.log(age,gender);
    return {
      age,
      gender
    };
  }
  
  module.exports = extractAgeAndGenderFromNIC;
  