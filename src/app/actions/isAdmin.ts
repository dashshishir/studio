
'use server';

import { headers } from 'next/headers';

export async function checkIsAdmin(uid: string): Promise<boolean> {
  const adminUids = (process.env.ADMIN_UIDS || '').split(',');
  return adminUids.includes(uid);
}
