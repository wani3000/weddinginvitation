export type InvitationStatus = "active" | "expired";

export type ManagedInvitation = {
  id: string;
  ownerName: string;
  ownerEmail: string;
  title: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  venue: string;
  publicPath: string;
  status: InvitationStatus;
  createdAt: string;
  updatedAt: string;
  expiredAt: string | null;
};
