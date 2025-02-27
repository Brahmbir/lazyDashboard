export function getNameFromEmail(email: string) {
  return email.split("@")[0].split("+")[0].replaceAll(".", "");
}

export const processedEmails = (email: string) => {
  return email.replace(
    /(^[^@+]+)(?:\.[^@+]+)*(\+[^@]*)?(@.+)/,
    (match: string, localPart: string, _: string, domain: string) => {
      const cleanedLocal = localPart.replace(/\./g, "");
      return `${cleanedLocal}${domain}`;
    }
  );
};
