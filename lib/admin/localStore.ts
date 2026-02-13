import { ManagedInvitation } from "./types";

export const SUPER_ADMIN_ID = "admin";
export const SUPER_ADMIN_PIN = "123456";

export const STORAGE_KEY = "wedding-super-admin-links-v1";
export const AUTH_KEY = "wedding-super-admin-auth-v1";

const now = () => new Date().toISOString();

export const DEFAULT_INVITATIONS: ManagedInvitation[] = [
  {
    id: "sample-001",
    ownerName: "샘플 사용자",
    ownerEmail: "sample@mariecard.com",
    title: "철완 ♥ 나라 결혼식",
    groomName: "철완",
    brideName: "나라",
    weddingDate: "2026-05-17 12:30",
    venue: "라움아트센터",
    publicPath: "/",
    status: "active",
    createdAt: now(),
    updatedAt: now(),
    expiredAt: null,
  },
  {
    id: "sample-002",
    ownerName: "테스트 유저",
    ownerEmail: "test.user@mariecard.com",
    title: "민수 ♥ 지연 결혼식",
    groomName: "민수",
    brideName: "지연",
    weddingDate: "2026-09-26 14:00",
    venue: "그랜드볼룸",
    publicPath: "/invitation/14934929",
    status: "active",
    createdAt: now(),
    updatedAt: now(),
    expiredAt: null,
  },
];

export function parseInvitations(raw: string | null): ManagedInvitation[] {
  if (!raw) {
    return DEFAULT_INVITATIONS;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return DEFAULT_INVITATIONS;
    }

    return parsed.filter((item): item is ManagedInvitation => {
      return (
        item &&
        typeof item.id === "string" &&
        typeof item.ownerName === "string" &&
        typeof item.ownerEmail === "string" &&
        typeof item.title === "string" &&
        typeof item.groomName === "string" &&
        typeof item.brideName === "string" &&
        typeof item.weddingDate === "string" &&
        typeof item.venue === "string" &&
        typeof item.publicPath === "string" &&
        (item.status === "active" || item.status === "expired") &&
        typeof item.createdAt === "string" &&
        typeof item.updatedAt === "string" &&
        (typeof item.expiredAt === "string" || item.expiredAt === null)
      );
    });
  } catch {
    return DEFAULT_INVITATIONS;
  }
}
