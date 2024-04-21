import axios from "axios";
import { DatabaseSession, DatabaseUser, UserId } from "lucia";
import { format } from "../utils";

interface Adapter {
  deleteExpiredSessions(): Promise<void>;
  deleteSession(sessionId: string): Promise<void>;
  deleteUserSessions(userId: UserId): Promise<void>;
  getSessionAndUser(
    sessionId: string
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]>;
  getUserSessions(userId: UserId): Promise<DatabaseSession[]>;
  setSession(session: DatabaseSession): Promise<void>;
  updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void>;
}

export default class HttpAdapter implements Adapter {
  private client;
  constructor() {
    this.client = axios.create({
      // adapter: "http",
      baseURL: `${process.env.BACKEND_BASE_URL}/adapter`,
      // headers: {
      // "Content-Type": "application/json",
      // "x-auth-secret": process.env.NEXTAUTH_SECRET || "",
      // },
    });
  }
  async deleteExpiredSessions(): Promise<void> {
    await this.client.delete("/session");
  }
  async deleteSession(sessionId: string): Promise<void> {
    await this.client.delete(`/session/${sessionId}`);
  }
  async deleteUserSessions(userId: UserId): Promise<void> {
    await this.client.delete(`/user/${userId}`);
  }
  async getSessionAndUser(
    sessionId: string
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    const response = await this.client.get(`/session/${sessionId}`);

    const session = format<DatabaseSession | null>(response.data[0]);
    const user = format<DatabaseUser | null>(response.data[1]);

    return [session, user];
  }

  async getUserSessions(userId: UserId): Promise<DatabaseSession[]> {
    const response = await this.client.get(`/user/${userId}`);

    let UserSessions: DatabaseSession[] = [];

    (response.data as Array<any>).forEach((value) => {
      let session = format<DatabaseSession>(value);

      if (session) {
        UserSessions.push(session);
      }
    });
    return UserSessions;
  }
  async setSession(session: DatabaseSession): Promise<void> {
    await this.client.post("/session", session);
  }
  async updateSessionExpiration(
    sessionId: string,
    expiresAt: Date
  ): Promise<void> {
    await this.client.patch(`/session/${sessionId}`, {
      expiresAt,
    });
  }
}
