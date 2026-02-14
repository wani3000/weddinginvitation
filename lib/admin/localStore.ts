import { ManagedInvitation } from "./types";

export const STORAGE_KEY = "wedding-personal-invitation-v1";

const now = () => new Date().toISOString();

export const DEFAULT_INVITATIONS: ManagedInvitation[] = [
  {
    id: "chulwan-nara",
    ownerName: "박철완",
    ownerEmail: "owner@invite-chulwan-nara.com",
    title: "철완 ♥ 나라 결혼식",
    heroType: "image",
    heroMobileSrc: "",
    heroDesktopSrc: "",
    heroImageUrl: "",
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
        (item.heroType === "image" || item.heroType === "video" || typeof item.heroType === "undefined") &&
        (typeof item.heroMobileSrc === "string" || typeof item.heroMobileSrc === "undefined") &&
        (typeof item.heroDesktopSrc === "string" || typeof item.heroDesktopSrc === "undefined") &&
        (typeof item.heroImageUrl === "string" || typeof item.heroImageUrl === "undefined") &&
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
