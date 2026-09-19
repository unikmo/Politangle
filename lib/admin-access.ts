type DecodedAdminIdentity = {
  uid: string;
  email?: string | null;
  email_verified?: boolean;
  admin?: boolean;
};

function csvSet(value: string | undefined, normalize: (item: string) => string) {
  return new Set((value ?? '').split(',').map((item) => normalize(item.trim())).filter(Boolean));
}

export function isConfiguredAdmin(identity: DecodedAdminIdentity) {
  if (identity.admin === true) return true;

  const adminUids = csvSet(process.env.POLITANGLE_ADMIN_UIDS, (value) => value);
  if (adminUids.has(identity.uid)) return true;

  const email = identity.email?.trim().toLowerCase();
  if (!email || identity.email_verified !== true) return false;
  const adminEmails = csvSet(process.env.POLITANGLE_ADMIN_EMAILS, (value) => value.toLowerCase());
  return adminEmails.has(email);
}
