import prisma from "@/lib/db";

export interface OAuthUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
}
export interface OAuthTokens {
  accessToken: string;
  refreshToken: string | null;
  accessTokenExpiresAt: Date | null;
  idToken: string | null;
}

export async function addAccount(
  provider: "Google" | "Github",
  oauthData: OAuthUser,
  oauthToken: OAuthTokens
) {
  try {
    const result: any = await prisma.$transaction(async (trx) => {
      const user = await trx.user.findFirst({
        where: { id: oauthData.id },
      });
      if (!user) {
        const createdUserRes = await trx.user.create({
          data: {
            id: oauthData.id,
            email: oauthData.email,
            isEmailVerified: oauthData.verified_email,
            name: oauthData.name,
            PictureUrl: oauthData.picture,
          },
          select: { id: true },
        });
        if (!createdUserRes.id) {
          //   trx.rollback();
          throw new Error(`Failed to create user`);
        }
        const createdOAuthAccountRes = await trx.oAuthAccount.create({
          data: {
            userId: createdUserRes.id,
            providerUserId: oauthData.id,
            provider: provider,
            accessToken: oauthToken.accessToken,
            refreshToken: oauthToken.refreshToken,
            expiresAt: oauthToken.accessTokenExpiresAt,
          },
        });
        if (!createdOAuthAccountRes) {
          //       trx.rollback();
          throw new Error(`Failed to create OAuthAccountRes`);
        }
      } else {
        const updatedOAuthAccountRes = await trx.oAuthAccount.update({
          data: {
            accessToken: oauthToken.accessToken,
            refreshToken: oauthToken.refreshToken,
            expiresAt: oauthToken.accessTokenExpiresAt,
          },
          where: {
            provider_providerUserId: {
              provider: provider,
              providerUserId: oauthData.id,
            },
          },
        });
        if (!updatedOAuthAccountRes) {
          //       trx.rollback();
          throw new Error(`Failed to update OAuthAccountRes`);
        }
      }
    });
    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    if (error.code) {
      return {
        success: false,
        provider: provider,
      };
    }
    return {
      success: false,
      error: error,
    };
  }
}
