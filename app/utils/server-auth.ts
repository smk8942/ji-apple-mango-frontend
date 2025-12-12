import { cookies } from 'next/headers'

export interface UserInfo {
  logged_in: boolean;
  email: string;
  name?: string;
  avatarUrl?: string;
}

export async function getCurrentUser(): Promise<UserInfo | null> {
  const cookieStore = await cookies()
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/status`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: 'no-store' // Ensure fresh data
    });

    if (res.ok) {
      const result = await res.json()
      console.log("AAAA ", result)
      return result;
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
  return null;
}
