export const getCleanErrorMessage = (errorCode: string, lang: string = 'en'): string => {
  const errors: Record<string, Record<string, string>> = {
    en: {
      'auth/invalid-email': 'The email address is not valid.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/email-already-in-use': 'An account already exists with this email.',
      'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
      'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/requires-recent-login': 'Please log in again to perform this sensitive action.',
      'auth/internal-error': 'An internal error occurred. Please try again.',
      'passwords-dont-match': 'Passwords do not match.',
      'password-too-short': 'Password must be at least 6 characters long.',
      'name-required': 'Please enter your full name.',
    },
    ny: {
      'auth/invalid-email': 'Imelo yomwe mwalembayo siili bwino.',
      'auth/user-disabled': 'Akaunti iyi yatsekedwa.',
      'auth/user-not-found': 'Sitinathe kupeza akaunti ndi imelo iyi.',
      'auth/wrong-password': 'Chinsinsi (password) siili bwino. Yesani kachiwiri.',
      'auth/email-already-in-use': 'Akaunti ina ilipo kale ndi imelo iyi.',
      'auth/weak-password': 'Chinsinsi chanu ndi chofooka. Gwiritsani ntchito zilembo zosachepera 6.',
      'auth/operation-not-allowed': 'Maakaunti a imelo/chinsinsi sali ololedwa.',
      'auth/too-many-requests': 'Mwayesa nthawi zambiri. Chonde yesani kachiwiri pakapita nthawi.',
      'auth/network-request-failed': 'Vuto la netiweki. Chonde onetsetsani intaneti yanu.',
      'auth/requires-recent-login': 'Chonde lowaninso kuti muchite izi.',
      'auth/internal-error': 'Vuto lachitika. Chonde yesani kachiwiri.',
      'passwords-dont-match': 'Zinsinsi zanu sizikufanana.',
      'password-too-short': 'Chinsinsi chiyenera kukhala ndi zilembo zosachepera 6.',
      'name-required': 'Chonde lembani dzina lanu lonse.',
    }
  };

  const langErrors = errors[lang] || errors['en'];
  return langErrors[errorCode] || 'An unexpected error occurred. Please try again.';
};
